var html = require('choo/html')
var layout = require('./layout.js')
var members = [
  {
    name: 'rhodey orbits',
    blurb: `
      Polyglot developer with an information security upbringing and full stack
      experience from discrete transistors to CSS and back, eleven years and
      counting. Rhodey spent three years working at Open Whisper Systems, makers
      of the pioneering end-to-end encrypted messaging app Signal. The majority
      of Rhodey's professional work has been with Android and low-latency Java
      development in cloud environments, however the focus of the last two years
      has been JavaScript peer-to-peer applications (Dat & SSB) and polygot
      software defined radio. Some other words you might be looking for: Docker,
      Protocol Buffers, Choo & React & Angular, S3 & B2, Kafka and Netty.
    `
  },
  {
    name: 'marina kukso',
    blurb: `
      Marina Kukso is a co-founder and member of bits.coop. She's been
      programming since 2014 and primarily writes javascript, GLSL, and bash. In
      addition to her work with bits.coop, she's co-founder and instructor for
      the programming anti-bootcamp Cyber Wizard Institute
      (cyber.wizard.institute) and co-founder of the Oakland hackerspace Sudo
      Room (sudoroom.org). Before working with bits, she was Managing Director
      of the non-profit LocalWiki (localwiki.org) and Editorial Manager at PLOS
      (plos.org).
    `
  },
  {
    name: 'scott edmonds',
    blurb: `
      A Creative Technologist, Scott Edmonds believes that human communication
      is an art and only through creative technology can the world truly
      understand itself. It is a philosophy he recognized before it was popular.
      His broader effort to demystify the depth and breadth of that concept is
      reflected in his early studies, career and insane curiosity. Part of his
      journey includes summer clinical research in infectious diseases.
      Complementary to his technological expertise, Scott is also an
      accomplished electronic dance music musician and has a great appreciation
      for the way communication vehicles converge.
    `
  },
  {
    name: 'james halliday',
    handle: 'substack',
    blurb: `
      ...
    `
  }
]

module.exports = function (state, emit) {
  members.sort(function (a, b) { return Math.random() > 0.5 ? -1 : +1 })
  return layout(state, html`<div>
    ${members.map(function (member) {
      return html`<div>
        <div class="name">${member.name}</div>
        <div class="blurb">${member.blurb}</div>
      </div>`
    })}
  </div>`)
}
