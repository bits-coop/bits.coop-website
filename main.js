var app = require('choo')()
var html = require('choo/html')

app.use(function (state, emitter) {
  state.window = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  window.addEventListener('resize', function () {
    state.window.width = window.innerWidth
    state.window.height = window.innerHeight
    emitter.emit('resize', state.window.width, state.window.height)
    emitter.emit('render')
  })
})

var viz = {
  cables: require('./demo/cables.js'),
  wifi: require('./demo/wifi.js')
  //gears: require('./demo/gears.js')
}
app.use(function (state, emitter) {
  state.demo = {}
  state.rcom = require('regl-component')(require('regl'), {
    extensions: [ 'oes_element_index_uint', 'oes_standard_derivatives' ]
  })
  Object.keys(viz).forEach(function (key) {
    var rc = state.rcom.create()
    rc.on('regl', function (regl) {
      viz[key](regl)
    })
    state.demo[key] = rc
  })
})

app.route('/', require('./view/root.js'))
app.route('/about', require('./view/about.js'))

app.mount('body')
