const rows = ['一', '二', '三', '四', '五', '六', '七', '八', '九']
const columns = ['１', '２', '３', '４', '５', '６', '７', '８', '９']

export function rowString(r: number): string {
  return rows[r]
}

export function columnString(c: number): string {
  return columns[c]
}
