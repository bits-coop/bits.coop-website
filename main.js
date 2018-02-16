var app = require('choo')()
var html = require('choo/html')
var rcom = require('regl-component')(require('regl'), {
  extensions: [ 'oes_element_index_uint', 'oes_standard_derivatives' ]
})
var viz = {
  cables: require('./demo/cables.js'),
  wifi: require('./demo/wifi.js')
  //gears: require('./demo/gears.js')
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
        background-color: #e0d0f0;
      }
      #header {
        position: relative;
        overflow-x: hidden;
        overflow-y: hidden;
        background-color: #211429;
        height: 300px;
      }
      #header .blurb {
        text-shadow: 0px 0px 1px #f080ff;
        position: absolute;
        top: 50px;
        right: 30px;
        text-align: center;
        z-index: 1000;
      }
      #header .hook1 {
        padding: 0.5em;
      }
      #header .hook2 {
        margin-top: 0.5em;
        color: #80a0ff;
      }
      #header .hook3 {
        margin-top: 0.5em;
        color: #f0b0ff;
        text-shadow: 0px 0px 8px #201040;
      }
      #header .hook4 {
        margin-top: 1em;
        color: #c080ff;
        text-shadow: 0px 0px 8px #201040;
      }
      #header .hook4 a:link, #header .hook4 a:visited {
        color: #c080ff;
      }
      #header .hook {
        position: relative;
      }
      #header .hook1 .bg {
        background-color: #f080ff;
      }
      #header .hook2 .bg {
        background-color: #302040;
      }
      #header .hook .bg {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        opacity: 0.5;
        z-index: 1001;
      }
      #header .hook .fg {
        position: relative;
        z-index: 1002;
      }
      #header h1 {
        color: #e0d0f0;
        font-size: 48px;
        text-shadow: 0px 0px 4px #802080;
        margin-bottom: 0.25em;
      }
      .section {
        padding: 1em;
        max-width: 80ex;
        min-width: 20ex;
        margin: auto;
      }
      .demo {
        background-color: #211429;
        overflow-x: hidden;
        margin-top: 1em;
        margin-bottom: 1em;
      }
      .demo-header {
        border: 1px solid red;
        background-color: white;
      }
      .spacer-gif {
        height: 1em;
      }
      #footer {
        margin-top: 4em;
        margin-bottom: 2em;
        text-align: center;
      }
      @media screen and (min-width: 700px) {
        #header .blurb {
          left: 50%;
          right: auto;
        }
      }
    </style>
    <div id="header">
      <div class="header-demo">
        ${demo.cables.render({
          width: state.width,
          height: 300
        })}
      </div>
      <div class="blurb">
        <h1>bits.coop</h1>
        <div class="hook hook1">
          <div class="bg"></div>
          <div class="fg">emerging web technology</div>
        </div>
        <div class="hook hook3">
          <div class="bg"></div>
          <div class="fg">webgl, p2p, maps, offline</div>
        </div>
        <div class="hook hook2">
          <div class="bg"></div>
          <div class="fg">worker-owned agency</div>
        </div>
        <div class="hook hook4">
          <a href="mailto:bitscooperative@gmail.com">email us</a>
        </div>
      </div>
    </div>

    <div class="section">
      We specialize in the emerging potential of the web platform.
    </div>

    <div class="section">
      We use our deep expertise with webgl, maps, p2p, data replication,
      and modular software architecture to deliver cutting-edge experiences.
    </div>

    <div class="demo">
      ${demo.wifi.render({ width: state.width, height: 200 })}
    </div>

    <div class="section">
      We work with clients in manufacturing, architecture, engineering, and
      non-profit sectors to integrate web technology into factories,
      professional tools, and remote field work.
    </div>
    <div class="section">
      We are technologists and artists with decades of experience. We give
      talks, facilitate workshops, publish free and open source software, and
      participate in open collaboration with the greater community. We are
      always sharing what we know.
    </div>
    <div class="section">
      How can we help?
      <div class="spacer-gif"></div>
      <div><a href="mailto:bitscooperative@gmail.com">contact us by email</a></div>
    </div>

    <div id="footer">
      made with <a href="https://choo.io/">choo</a>
      and <a href="http://regl.party/">regl</a>
      in puna district hawai'i
    </div>
  </body>`
})

app.mount('body')
