var html = require('choo/html')
var css = require('./css.js')
var footer = require('./footer.js')

var sections = [
  { href: '/#about', title: '/about' },
  { href: '/articles/', title: '/articles' }
]

module.exports = function (state, emit, tree) {
  return html`<body>
    ${css}
    <div class="header-bar">
      <div class="link title" onclick=${go('/#')}>
        <a href="/#">bits.coop</a>
      </div>${sections.map(function (s) {
        var c = location.pathname + location.hash === s.href ? 'active' : ''
        return html`<div class="link" onclick=${go(s.href)}>
          <a href="${s.href}" class=${c}>${s.title}</a>
        </div>`
      })}
    </div>
    ${tree}
    ${footer}
  </body>`
  function go (href) {
    return function (ev) {
      ev.preventDefault()
      emit('pushState', href)
    }
  }
}
