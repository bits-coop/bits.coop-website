//var camera = require('regl-camera')(regl,
//  { distance: 80, phi: 0.3, theta: +1.1 })
var mat4 = require('gl-mat4')

var speed = 1.0
var tmpv = new Float32Array(3)

module.exports = function (regl) {
  var projection = new Float32Array(16)
  var view = new Float32Array(16)
  var eye = Float32Array.from([0,20,-80])
  var center = Float32Array.from([0,0,0])
  var up = Float32Array.from([0,1,0])
  var camera = regl({
    uniforms: {
      eye: function () { return eye },
      projection: function (context) {
        var aspect = context.viewportWidth / context.viewportHeight
        return mat4.perspective(projection, Math.PI/8, aspect, 0.1, 1000.0)
      },
      view: function (context) {
        var r = 80.0, t = -10
        eye[0] = Math.cos(t)*r
        eye[2] = Math.sin(t)*r
        return mat4.lookAt(view, eye, center, up)
      }
    }
  })

  var draw = {
    gear: gear(regl),
    chain: chain(regl)
  }
  var g0 = 0.75, g1 = 0.3, g2 = 1.5

  var gearProps = [
    { offset: [-15,0,0.00], teeth: 9.6, radius: [0.8,3.0], speed: g0 },
    { offset: [-15,0,0.25], teeth: 9.3, radius: [0.8,2.7], speed: g0 },
    { offset: [-15,0,0.50], teeth: 8.8, radius: [0.8,2.4], speed: g0 },
    { offset: [-15,0,0.75], teeth: 10.4, radius: [0.8,2.1], speed: g0 },
    { offset: [-15,0,1.00], teeth: 5.5, radius: [0.8,1.8], speed: g0 },
    { offset: [-15,0,1.25], teeth: 5.2, radius: [0.8,1.5], speed: g0 },
    { offset: [-15,0,1.50], teeth: 4.5, radius: [0.8,1.2], speed: g0 },

    { offset: [8,0,+1.2], teeth: 14.35, radius: [5.3,0.7], speed: g1 },
    { offset: [8,0,+0.8], teeth: 12.0, radius: [4.0,1.0], speed: g1 },
    { offset: [8,0,+0.3], teeth: 9.0, radius: [2.8,1.0], speed: g1 },

    { offset: [-12.0,-4.7,+0.75], teeth: 3.15, radius: [0.2,0.7], speed: -g2 },
    { offset: [-13.0,-7.2,+0.75], teeth: 3.15, radius: [0.2,0.7], speed: g2 },
  ]
  var chainProps = []
  var chainId = 0

  var N = 14
  for (var i = 0; i < N; i++) {
    var inside = chainId/2%2
    var theta = i/(N-1)*Math.PI*0.85 + 0.05 + Math.PI/2
    var r = 6.25
    var x = Math.cos(theta)*r - 30
    var y = Math.sin(theta)*r
    var z = 1.6
    chainProps.push(
      { offset: [x,y,+0.2+inside*0.15+z], rotate: [0,0,1,theta-3*Math.PI/2],
        id: chainId++ },
      { offset: [x,y,-0.2-inside*0.15+z], rotate: [0,0,1,theta-3*Math.PI/2],
        id: chainId++ }
    )
  }

  var N = 6
  for (var i = 0; i < N; i++) {
    var inside = chainId/2%2
    var x = -31 + i*1.0
    var y = -6 - i/N
    var z = 1.6
    chainProps.push(
      { offset: [x,y,+0.2+inside*0.15+z], rotate: [0,0,1,+0.0],
        id: chainId++ },
      { offset: [x,y,-0.2-inside*0.15+z], rotate: [0,0,1,+0.0],
        id: chainId++ }
    )
  }

  var N = 8
  for (var i = 0; i < N; i++) {
    var inside = chainId/2%2
    var theta = Math.PI/2 - i*Math.PI/(N-1) + 0.5
    var r = 2.4
    var x = Math.cos(theta)*r - 23.8
    var y = Math.sin(theta)*r - 9.6
    var z = 1.6
    chainProps.push(
      { offset: [x,y,+0.2+inside*0.15+z], rotate: [0,0,1,theta-Math.PI/2-0.2],
        id: chainId++ },
      { offset: [x,y,-0.2-inside*0.15+z], rotate: [0,0,1,theta-Math.PI/2-0.2],
        id: chainId++ }
    )
  }

  var N = 3
  for (var i = 0; i < N; i++) {
    var inside = chainId/2%2
    var x = -24.5 - i*1.2
    var y = -11.8 - i/3*0.5
    var z = 1.6
    chainProps.push(
      { offset: [x,y,+0.2+inside*0.15+z], rotate: [0,0,1,-Math.PI+0.2-i/3*0.5],
        id: chainId++ },
      { offset: [x,y,-0.2-inside*0.15+z], rotate: [0,0,1,-Math.PI+0.2-i/3*0.5],
        id: chainId++ }
    )
  }

  var N = 6
  for (var i = 0; i < N; i++) {
    var inside = chainId/2%2
    var theta = +Math.PI/2 + i*Math.PI*0.1 + 0.8
    var r = 2.4
    var x = Math.cos(theta)*r - 26.2
    var y = Math.sin(theta)*r - 14.8
    var z = 1.6
    chainProps.push(
      { offset: [x,y,+0.2+inside*0.15+z], rotate: [0,0,1,theta-3*Math.PI/2],
        id: chainId++ },
      { offset: [x,y,-0.2-inside*0.15+z], rotate: [0,0,1,theta-3*Math.PI/2],
        id: chainId++ }
    )
  }

  var N = 39
  for (var i = 0; i < N; i++) {
    var x = i*1.2 - 27
    var y = -16.9 + i/N*2.0 + Math.pow(i/N,2)*5
    var inside = chainId/2%2
    chainProps.push(
      { offset: [x,y,+0.2+inside*0.15+z], rotate: [0,0,1,0.1],
        id: chainId++ },
      { offset: [x,y,-0.2-inside*0.15+z], rotate: [0,0,1,0.1],
        id: chainId++ }
    )
  }

  var N = 32
  for (var i = 0; i < N; i++) {
    var inside = chainId/2%2
    var theta = -Math.PI/2 + i/(N-1)*Math.PI*0.85 + 0.4
    var r = 10.52
    var x = Math.cos(theta)*r + 16
    var y = Math.sin(theta)*r
    var z = 1.6
    chainProps.push(
      { offset: [x,y,+0.2+inside*0.15+z], rotate: [0,0,1,theta+Math.PI/2],
        id: chainId++ },
      { offset: [x,y,-0.2-inside*0.15+z], rotate: [0,0,1,theta+Math.PI/2],
        id: chainId++ }
    )
  }

  var N = 36
  for (var i = 0; i < N; i++) {
    var x = 14.75 - i*1.25
    var y = 10.40 - i/N*4.27
    var inside = chainId/2%2
    chainProps.push(
      { offset: [x,y,+0.2+inside*0.15+z], rotate: [0,0,1,Math.PI+0.1],
        id: chainId++ },
      { offset: [x,y,-0.2-inside*0.15+z], rotate: [0,0,1,Math.PI+0.1],
        id: chainId++ }
    )
  }

  for (var i = 0; i < chainProps.length; i++) {
    var p = chainProps[i]
    p.next = [
      chainProps[(i-4+chainProps.length)%chainProps.length],
      chainProps[(i-8+chainProps.length)%chainProps.length]
    ]
  }

  regl.frame(function () {
    regl.clear({ color: [0.13,0.08,0.16,1], depth: true })
    camera(function () {
      draw.gear(gearProps)
      draw.chain(chainProps)
    })
  })

  function chain (regl) {
    var mesh = require('./lib/box.json')
    var model = new Float32Array(16)
    return regl({
      frag: `
        precision highp float;
        #extension GL_OES_standard_derivatives: enable
        uniform float time;
        varying vec3 vpos;
        uniform float id;
        float PI = ${Math.PI};
        void main () {
          vec3 N = normalize(cross(dFdx(vpos),dFdy(vpos)));
          float x = sin(floor(id*0.5)*PI/2.0)*0.5+0.5;
          gl_FragColor = vec4(vec3(1,0,1)*x*0.5
            + vec3(1,1,0)*(N*0.5+0.5),1);
        }
      `,
      vert: `
        precision highp float;
        uniform mat4 projection, view, model;
        varying vec3 vpos;
        attribute vec3 position;
        void main () {
          vpos = (position*2.0-1.0)*vec3(1,0.3,0.07);
          gl_Position = projection * view
            * (model * vec4(vpos,1) * vec4(vec3(0.5),1));
        }
      `,
      uniforms: {
        speed: speed,
        id: regl.prop('id'),
        model: function (context, props) {
          mat4.identity(model)
          var x = context.time*speed%1.0
          var a = props.rotate[3], b = props.next[1].rotate[3]
          if (Math.abs(a-b) > Math.PI) b -= 2*Math.PI
          var theta = mix(a,b,x)
          mat4.translate(model,model,
            mix3(tmpv,props.offset,props.next[1].offset,x))
          mat4.rotate(model,model,theta,props.rotate)
          return model
        }
      },
      attributes: {
        position: mesh.positions
      },
      elements: mesh.cells
    })
  }

  function gear (regl) {
    var model = new Float32Array(16)
    var mesh = { positions: [], cells: [] }
    var N = 128
    for (var i = 0; i < N; i++) {
      var theta = i/(N-1)*Math.PI*2
      mesh.positions.push([theta,0,0])
      mesh.positions.push([theta,0,1])
      mesh.positions.push([theta,1,0])
      mesh.positions.push([theta,1,1])
      mesh.cells.push(
        [i*4+0,i*4+2,(i+1)%N*4+0],
        [(i+1)%N*4+0,(i+1)%N*4+2,i*4+2],
        [i*4+1,i*4+3,(i+1)%N*4+1],
        [(i+1)%N*4+1,(i+1)%N*4+3,i*4+3],
        [i*4+0,i*4+1,(i+1)%N*4+0],
        [(i+1)%N*4+0,(i+1)%N*4+1,i*4+1],
        [i*4+2,i*4+3,(i+1)%N*4+2],
        [(i+1)%N*4+2,(i+1)%N*4+3,i*4+3]
      )
    }
    return regl({
      frag: `
        precision highp float;
        #extension GL_OES_standard_derivatives: enable
        varying vec3 vpos;
        void main () {
          vec3 N = normalize(cross(dFdx(vpos),dFdy(vpos)));
          gl_FragColor = vec4(N*0.5+0.5,1.0);
        }
      `,
      vert: `
        precision highp float;
        uniform mat4 projection, view, model;
        uniform vec3 offset;
        uniform float teeth;
        uniform vec2 radius;
        varying vec3 vpos;
        attribute vec3 position;
        float PI = ${Math.PI};
        void main () {
          float theta = position.x;
          float r = radius.x + position.y * (radius.y
            + pow(1.0-clamp(0.0,1.0,sin(theta*PI*teeth)*0.5+0.4),4.0)*0.3);
          float z = position.z*0.1;
          vpos = vec3(sin(theta)*r,cos(theta)*r,z);
          gl_Position = projection * view
            * (model * vec4(vpos,1) + vec4(offset,0));
        }
      `,
      uniforms: {
        offset: regl.prop('offset'),
        teeth: regl.prop('teeth'),
        radius: regl.prop('radius'),
        model: function (context, props) {
          mat4.identity(model)
          mat4.rotateZ(model,model,-context.time*props.speed*speed)
          return model
        }
      },
      attributes: {
        position: mesh.positions
      },
      elements: mesh.cells
    })
  }
}

function mix (a, b, x) {
  x = Math.max(0.0,Math.min(1.0,x))
  return a*(1-x) + b*x
}

function mix3 (out, a, b, x) {
  out[0] = mix(a[0],b[0],x)
  out[1] = mix(a[1],b[1],x)
  out[2] = mix(a[2],b[2],x)
  return out
}
