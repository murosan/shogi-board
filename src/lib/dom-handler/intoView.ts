// ただ scrollIntoView を呼ぶだけ
export function intoView(id: string): void {
  const current: HTMLElement | null = document.getElementById(id)
  if (current) (current as any).scrollIntoViewIfNeeded()
}
