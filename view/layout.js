var html = require('choo/html')
var css = require('./css.js')

module.exports = function (state, tree) {
  return html`<body>
    ${state.rcom.render()}
    ${css}
    ${tree}
    <div id="footer">
      made with <a href="https://choo.io/">choo</a>
      and <a href="http://regl.party/">regl</a>
      in puna district hawai'i
    </div>
  </body>`
}
