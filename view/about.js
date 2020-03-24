var html = require('choo/html')
var layout = require('./layout.js')
var members = [
  {
    name: 'karissa mckelvey',
    photo: '/images/karissa.jpeg',
    blurb: html`<div>
    Karissa McKelvey is a <a href="http://github.com/okdistribute">public interest technologist</a> and <a href="https://scholar.google.com/citations?user=RM2tB8EAAAAJ&hl=en&oi=ao">researcher</a> working in solidarity with marginalized communities to defend their rights.
    Her work has been depended upon by at-risk users including environmental
    & human rights defenders, journalists, and civil society activists living
    within repressive environments. Karissa's perspectives and work have been
    featured in high-profile news outlets such as the New York Times, Wall
    Street Journal, and NPR as well as [various conference keynote
    talks](https://okdistribute.xyz/talks). Since 2014, she has focused on
    developing peer-to-peer technology that prioritizes security
    and access. As a founding member of the dat:// protocol, she governs
    the open source project in partnership with various working groups, companies, and
    non-profit organizations.</div>`
  },
  {
    name: 'marina kukso',
    photo: '/images/marina.jpg',
    blurb: html`<div>
      Marina Kukso is a co-founder and member of bits.coop. She's been
      programming since 2014 and primarily writes javascript, GLSL, and bash. In
      addition to her work with bits.coop, she's co-founder and instructor for
      the programming anti-bootcamp
      <a href="https://cyber.wizard.institute">Cyber Wizard Institute</a>
      and co-founder of the Oakland hackerspace
      <a href="https://sudoroom.org">Sudo Room</a>.
      Before working with bits, she was Managing Director
      of the non-profit <a href="https://localwiki.org">LocalWiki</a>
      and Editorial Manager at <a href="https://plos.org">PLOS</a>.
    </div>`
  },
  {
    name: 'scott edmonds',
    photo: '/images/scott.jpg',
    blurb: `
      A Creative Technologist, Scott Edmonds believes that human communication
      is an art and only through creative technology can the world truly
      understand itself. It is a philosophy he recognized before it was popular.
      His broader effort to demystify the depth and breadth of that concept is
      reflected in his early studies, career and deep curiosity. Part of his
      journey includes summer clinical research in infectious diseases and
      architecting innovative features for Ask Jeeves.

      Complementary to his technological expertise, Scott is also an
      accomplished electronic dance music musician and has a great appreciation
      for the way communication vehicles converge.
    `
  },
  {
    name: 'james halliday',
    photo: '/images/substack.jpg',
    blurb: `
      A very full stack developer, James is author of hundreds of npm packages
      including browserify and 1000+ open source projects including the first
      nodeschool workshop.
      James has worked on a wide range of projects, including an offline p2p
      mapping database, industrial robots, underwater submersibles, quad
      copters, and webgl for art, professional tools, and maps.
      James has written popular guides such as the stream handbook and has given
      50+ conference talks. He also does live coding for webgl and webaudio
      performances.
    `
  }
]

module.exports = function (state, emit) {
  members.sort(function (a, b) { return Math.random() > 0.5 ? -1 : +1 })
  return layout(state, emit, html`<div class="about">
    <div class="members">
      ${members.map(function (member) {
        return html`<div class="member">
          <img class="photo" src="${member.photo}">
          <div class="name">${member.name}</div>
          <div class="blurb">${member.blurb}</div>
        </div>`
      })}
    </div>
  </div>`)
}
