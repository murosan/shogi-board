// ただ scrollIntoView を呼ぶだけ
export function intoView(id: string): void {
  const current: HTMLElement | null = document.getElementById(id)
  if (!current) return
  if (!(current as any).scrollIntoViewIfNeeded) return
  ;(current as any).scrollIntoViewIfNeeded()
}
