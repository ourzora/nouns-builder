export const useHTMLStripper = () => {
  function stripHTML(str: string) {
    if (typeof document === 'undefined') {
      return ''
    }
    const el = document.createElement('div')
    el.innerHTML = str
    return el.textContent ?? el.innerText ?? ''
  }

  return stripHTML
}
