var html = require('choo/html')
var css = require('./css.js')
var footer = require('./footer.js')

module.exports = function (state, emit) {
  return html`<body>
    ${state.rcom.render()}
    ${css}
    <div>
      <div id="header">
        <div class="header-demo">
          ${state.demo.cables.render({
            width: state.window.width,
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
        <div class="top-links">
          <a href="#about">about us</a>
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
        ${state.demo.wifi.render({ width: state.window.width, height: 200 })}
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
    </div>
    ${footer}
  </body>`
}
