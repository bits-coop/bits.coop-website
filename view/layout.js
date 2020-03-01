var html = require('choo/html')
var css = require('./css.js')
var footer = require('./footer.js')

var sections = [
  { href: '/#about', title: '/about' },
  { href: '/articles/', title: '/articles', external: true }
]

module.exports = function (state, emit, tree) {
  return html`<body>
    ${css}
    <div class="header-bar">
      <div class="link title" onclick=${go('/#')}>
        <a href="/#">bits.coop</a>
      </div>${sections.map(function (s) {
        var c = location.pathname + location.hash === s.href ? 'active' : ''
        var link = s.external
          ? html`<a href="${s.href}" class=${c} target="_blank"
            rel="noopener noreferrer">${s.title}</a>`
          : html`<a href="${s.href}" class=${c}>${s.title}</a>`
        return html`<div class="link" onclick=${go(s.href,s.external)}>
          ${link}
        </div>`
      })}
    </div>
    ${tree}
    ${footer}
  </body>`
  function go (href, external) {
    return function (ev) {
      ev.preventDefault()
      if (external) {
        location.href = href
      } else emit('pushState', href)
    }
  }
}
