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
    #header .top-links {
      left: auto;
      right: 20%;
    }
  }
</style>`
