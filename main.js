var app = require('choo')()
var html = require('choo/html')
var rcom = require('regl-component')(require('regl'), {
  extensions: [ 'oes_element_index_uint', 'oes_standard_derivatives' ]
})
var viz = {
  cables: require('./demo/cables.js')
}
var demo = {}
Object.keys(viz).forEach(function (key) {
  var rc = rcom.create()
  viz[key](rc.regl)
  demo[key] = rc
})

app.use(function (state, emitter) {
  state.width = window.innerWidth
  state.height = window.innerHeight
  window.addEventListener('resize', function () {
    state.width = window.innerWidth
    state.height = window.innerHeight
    emitter.emit('render')
  })
})

app.route('/', function (state, emit) {
  return html`<body>
    ${rcom.render()}
    <style>
      body {
        margin: 0px;
        font-family: monospace;
      }
      #header {
        position: relative;
      }
      #header h1 {
        color: #e0d0f0;
        font-size: 48px;
        position: absolute;
        top: 50px;
        right: 30px;
        text-align: center;
        z-index: 1000;
        text-shadow: 0px 0px 4px #402080;
      }
      @media screen and (min-width: 700px) {
        #header h1 {
          left: 50%;
          right: auto;
        }
      }
    </style>
    <div id="header">
      ${demo.cables.render({
        width: state.width,
        height: 300
      })}
      <h1>bits.coop</h1>
    </div>
  </body>`
})

app.mount('body')
