function getVendorPrefix() {
    const body = document.body || document.documentElement
    const style = body.style
    const vendor = ['webkit', 'khtml', 'moz', 'ms', 'o']
    let i = 0
    while (i < vendor.length) {
      // 此处进行判断是否有对应的内核前缀
      if (typeof style[vendor[i] + 'Transition'] === 'string') {
        return vendor[i]
      }
      i++
    }
  }
  if (getVendorPrefix() !== 'webkit') {
    // window.location.href = '../check.html'
    window.location.href = 'https://support.dmeng.net/upgrade-your-browser.html?referrer'
  }