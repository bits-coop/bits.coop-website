var html = require('choo/html')

module.exports = html`<style>
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
  #header .top-links {
    text-shadow: 0px 0px 1px #f080ff;
    position: absolute;
    top: 5px;
    right: 30px;
    text-align: center;
    z-index: 1000;
  }
  #header .top-links a:link, #header .top-links a:visited {
    color: #f0b0ff;
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
    #header .top-links {
      left: auto;
      right: 20%;
    }
  }
  .header-bar {
    margin-bottom: 1em;
    background-color: #211429;
    padding: 3px;
  }
  .header-bar .link {
    margin-right: 3px;
    text-align: center;
    cursor: pointer;
    padding: 1ex;
    display: inline-block;
    min-width: 15ex;
    color: white;
    background-color: #803090;
  }
  .header-bar .link:nth-child(odd) {
    background-color: #5090b0;
  }
  .header-bar .link {
    background-color: #b01090;
  }
  .header-bar .link.title {
    background-color: #9030c0;
  }
  .header-bar .link a:link, .header-bar .link a:visited {
    color: white;
    text-decoration: none;
  }
  .about .members {
    text-align: center;
    max-width: 940px;
    margin: auto;
    padding-top: 1em;
  }
  .about .members .member {
    text-align: left;
    display: inline-block;
    width: 400px;
    min-height: 350px;
    vertical-align: top;
    margin-right: 15px;
    margin-left: 15px;
    margin-bottom: 2em;
    background-color: #f5e5ff;
    padding: 15px;
    padding-bottom: 25px;
  }
  .about .members .member:nth-child(odd) {
    background-color: #f5e5ff;
  }
  .about .members .member .photo {
    display: inline-block;
    float: left;
    margin-right: 2ex;
    margin-bottom: 1ex;
    margin-left: -25px;
    margin-top: -25px;
    width: 200px;
    height: 200px;
    background-color: purple;
  }
  .about .members .member .name {
    color: purple;
    padding-bottom: 0.5em;
    padding-top: 0.5em;
    margin-bottom: 0.5em;
    background-color: #b01090;
    color: white;
  }
  .about .members .member:nth-child(even) .name {
    background-color: #5090b0;
    color: white;
  }
  .header-bar .link {
    background-color: #b01090;
  }
  .about .members .member .blurb a {
    padding-left: 1ex;
    text-decoration: none;
  }
</style>`
