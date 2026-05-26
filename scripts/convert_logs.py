"""Convert Floodgate log to KIF files for shogi-board kifu picker.

Reads:
  - D:/miao3-suisho10/logs/floodgate_20260515_205350.log (42-0 session)
  - D:/miao3-suisho10/logs/floodgate_20260526_222702.log (8-0 session)

Writes:
  - public/kifu/game01.kif ... game50.kif (newest first)
  - public/kifu/index.json (metadata list)
  - public/kifu/raw/<session>.log (original logs)
"""
import json
import os
import re
import shutil
import sys
from datetime import datetime

# Reuse the project's MiniBoard (USI move tracker)
sys.path.insert(0, r"D:\miao3-suisho10")
from miniboard import MiniBoard

LOG_DIR = r"D:\miao3-suisho10\logs"
OUT_DIR = r"D:\shogi-board-miao4\public\kifu"

SESSIONS = [
    # (log_filename, label, approx_start_iso, my_account)  — newest first
    ("floodgate_20260526_222702.log", "2026-05-26 (SOJO CO-20)", "2026-05-26T22:27:02", "miao4"),
    ("floodgate_20260515_205350.log", "2026-05-15 (SOJO 42連勝)", "2026-05-15T20:53:50", "miao4"),
]

COL_FULL = ["", "１", "２", "３", "４", "５", "６", "７", "８", "９"]
ROW_KAN = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
KIF_BASE = {"P": "歩", "L": "香", "N": "桂", "S": "銀", "G": "金", "B": "角", "R": "飛", "K": "玉"}
KIF_PROM = {"P": "と", "L": "杏", "N": "圭", "S": "全", "B": "馬", "R": "龍"}


def usi_to_kif(usi, board):
    """USI move → KIF Japanese notation. Call BEFORE board.apply_usi()."""
    if "*" in usi:
        piece_char = usi[0].upper()
        to_col = int(usi[2])
        to_row = ord(usi[3]) - ord("a") + 1
        return f"{COL_FULL[to_col]}{ROW_KAN[to_row]}{KIF_BASE[piece_char]}打"
    from_col = int(usi[0])
    from_row = ord(usi[1]) - ord("a") + 1
    to_col = int(usi[2])
    to_row = ord(usi[3]) - ord("a") + 1
    promote = len(usi) > 4 and usi[4] == "+"
    src_row_i = from_row - 1
    src_col_i = 9 - from_col
    piece = board.board[src_row_i][src_col_i]
    if piece is None:
        return None
    base = piece.lstrip("+").upper()
    is_promoted = piece.startswith("+")
    if promote:
        kif_piece = KIF_BASE[base] + "成"
    elif is_promoted:
        kif_piece = KIF_PROM[base]
    else:
        kif_piece = KIF_BASE[base]
    return f"{COL_FULL[to_col]}{ROW_KAN[to_row]}{kif_piece}({from_col}{from_row})"


def parse_log(path):
    """Yield game dicts in chronological order.

    Note: in the log, `< Name+:...` / `< Name-:...` appear inside
    `BEGIN Game_Summary` ... `END Game_Summary`, which is BEFORE the
    `[Game] I am ...` line. So `cur` must be created at game-summary start.
    """
    games = []
    cur = None
    re_game = re.compile(r"\[Game\] I am (BLACK|WHITE) vs (\S+)")
    re_name_b = re.compile(r"< Name\+:(.+)")
    re_name_w = re.compile(r"< Name-:(.+)")
    re_my_move = re.compile(r"^\[(\d+)\]\s+(\S+)\s+\(([+-]?\d+)\s+d(\d+)")
    re_my_book = re.compile(r"^\[(\d+)\]\s+BOOK:\s+(\S+)")
    re_opp = re.compile(r"^\[Opp\]\s+(\S+)")
    re_csa_time = re.compile(r"< ([+-])(\d{4}\w{2}),T(\d+)")
    re_result = re.compile(r"\[Result\] (#\w+)")

    with open(path, encoding="utf-8", errors="replace") as f:
        for line in f:
            line = line.rstrip()
            if "BEGIN Game_Summary" in line:
                cur = {
                    "my_color": None,
                    "opp_name": None,
                    "name_black": None,
                    "name_white": None,
                    "moves": [],
                    "result": None,
                }
                continue
            if cur is None:
                continue
            m = re_game.search(line)
            if m:
                cur["my_color"] = m.group(1)
                cur["opp_name"] = m.group(2)
                continue
            m = re_name_b.match(line)
            if m:
                cur["name_black"] = m.group(1).strip()
                continue
            m = re_name_w.match(line)
            if m:
                cur["name_white"] = m.group(1).strip()
                continue
            # My move (with eval)
            m = re_my_move.match(line)
            if m:
                idx = int(m.group(1)) - 1  # 0-indexed
                # extend list if necessary (book moves don't have score)
                while len(cur["moves"]) <= idx:
                    cur["moves"].append(None)
                cur["moves"][idx] = {
                    "usi": m.group(2),
                    "score": int(m.group(3)),
                    "depth": int(m.group(4)),
                    "time": None,
                    "side": "my",
                }
                continue
            # My BOOK move (no eval)
            m = re_my_book.match(line)
            if m:
                idx = int(m.group(1)) - 1
                while len(cur["moves"]) <= idx:
                    cur["moves"].append(None)
                if cur["moves"][idx] is None:
                    cur["moves"][idx] = {
                        "usi": m.group(2),
                        "score": None,
                        "depth": None,
                        "time": None,
                        "side": "my",
                        "book": True,
                    }
                continue
            # Opponent move
            m = re_opp.match(line)
            if m:
                # opp moves are interleaved; append at end
                cur["moves"].append({
                    "usi": m.group(1),
                    "score": None,
                    "depth": None,
                    "time": None,
                    "side": "opp",
                })
                continue
            # CSA confirmation (used for time)
            m = re_csa_time.match(line)
            if m:
                # find next move without time
                t = int(m.group(3))
                for mv in cur["moves"]:
                    if mv is not None and mv["time"] is None:
                        mv["time"] = t
                        break
                continue
            m = re_result.search(line)
            if m:
                cur["result"] = m.group(1)
                cur["moves"] = [mv for mv in cur["moves"] if mv is not None]
                # keep games even if 0 moves (immediate resign), as long as a [Game] line was seen
                if cur["my_color"] is not None:
                    games.append(cur)
                cur = None
    return games


def render_kif(game, label, idx_in_session, approx_start, my_account):
    """Render a game as KIF text.

    my_account: 'miao4' or 'miao3-suisho10' — used as fallback if Name+/Name- not parsed.
    """
    board = MiniBoard()
    name_b = game["name_black"] or (my_account if game["my_color"] == "BLACK" else game["opp_name"])
    name_w = game["name_white"] or (my_account if game["my_color"] == "WHITE" else game["opp_name"])

    lines = []
    lines.append(f"# {label} #{idx_in_session+1}")
    lines.append(f"# my_color={game['my_color']}  result={game['result']}  moves={len(game['moves'])}")
    lines.append(f"開始日時：{approx_start}")
    lines.append(f"先手：{name_b}")
    lines.append(f"後手：{name_w}")
    lines.append("手合割：平手")
    lines.append("持ち時間：5分+10秒")
    lines.append("手数----指手---------消費時間--")

    cum_b = 0
    cum_w = 0
    last_move_num = 0
    for i, mv in enumerate(game["moves"]):
        usi = mv["usi"]
        side_csa = "+" if (i % 2 == 0) else "-"  # sente starts (i=0 is move 1 = sente)
        is_sente_move = (side_csa == "+")
        kif = usi_to_kif(usi, board)
        if kif is None:
            # apply anyway and skip line
            try:
                board.apply_usi(usi)
            except Exception:
                pass
            continue
        # Apply to board for next iteration
        try:
            board.apply_usi(usi)
        except Exception as e:
            pass
        t = mv["time"] or 0
        if is_sente_move:
            cum_b += t
            cum_total = cum_b
        else:
            cum_w += t
            cum_total = cum_w
        mm = t // 60
        ss = t % 60
        chh = cum_total // 3600
        cmm = (cum_total % 3600) // 60
        css = cum_total % 60
        move_num = i + 1
        last_move_num = move_num
        # Pad move number to 4 chars
        lines.append(f"{move_num:>4} {kif}   ( {mm:>2}:{ss:02d}/{chh:02d}:{cmm:02d}:{css:02d})")
        # Comments
        comments = []
        if mv.get("book"):
            comments.append("BOOK")
        if mv["score"] is not None:
            comments.append(f"評価値 {mv['score']:+d}")
        if mv["depth"] is not None:
            comments.append(f"depth {mv['depth']}")
        for c in comments:
            lines.append(f"*{c}")
    # Append result
    if game["result"] in ("#WIN", "#LOSE"):
        lines.append(f"{last_move_num+1:>4} 投了         ( 0:00/{cum_w//3600:02d}:{(cum_w%3600)//60:02d}:{cum_w%60:02d})")
    return "\n".join(lines) + "\n"


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    raw_dir = os.path.join(OUT_DIR, "raw")
    os.makedirs(raw_dir, exist_ok=True)

    # Collect all games newest-first
    all_games = []  # list of (game_dict, session_label, idx_in_session, approx_start, log_name, my_account)
    for log_name, label, start, my_account in SESSIONS:
        path = os.path.join(LOG_DIR, log_name)
        shutil.copy(path, os.path.join(raw_dir, log_name))
        games = parse_log(path)
        for i, g in enumerate(games):
            all_games.append((g, label, i, start, log_name, my_account))

    # all_games is currently: session1-newest-first first, then session2 ...
    # Within session, the LATER games are newer. We want overall newest first.
    # SESSIONS list is already newest-session-first. Within a session, last game is newest.
    # Reverse within-session ordering:
    sorted_games = []
    cur_session_games = []
    cur_session_label = None
    for tup in all_games:
        _, label, _, _, _, _ = tup
        if label != cur_session_label:
            sorted_games.extend(reversed(cur_session_games))
            cur_session_games = []
            cur_session_label = label
        cur_session_games.append(tup)
    sorted_games.extend(reversed(cur_session_games))

    # Write KIF files numbered game01..gameNN newest first
    index_entries = []
    for n, tup in enumerate(sorted_games, start=1):
        game, session_label, idx_in_session, approx_start, log_name, my_account = tup
        kif_filename = f"game{n:02d}.kif"
        kif_text = render_kif(game, session_label, idx_in_session, approx_start, my_account)
        with open(os.path.join(OUT_DIR, kif_filename), "w", encoding="utf-8") as f:
            f.write(kif_text)
        my_color = game["my_color"]
        opp = game["opp_name"]
        result = {"#WIN": "勝ち", "#LOSE": "負け", "#DRAW": "引分", "#CHUDAN": "中断"}.get(game["result"], game["result"])
        index_entries.append({
            "file": kif_filename,
            "session": session_label,
            "session_log": f"raw/{log_name}",
            "game_index_in_session": idx_in_session + 1,
            "account": my_account,
            "my_color": my_color,
            "opp_name": opp,
            "result": result,
            "moves": len(game["moves"]),
        })

    with open(os.path.join(OUT_DIR, "index.json"), "w", encoding="utf-8") as f:
        json.dump(index_entries, f, ensure_ascii=False, indent=2)

    print(f"Generated {len(sorted_games)} KIF files in {OUT_DIR}")
    print("First 3 entries:")
    for e in index_entries[:3]:
        print(f"  {e['file']}: {e['session']} #{e['game_index_in_session']} | {e['my_color']} vs {e['opp_name']} | {e['result']}")


if __name__ == "__main__":
    main()
