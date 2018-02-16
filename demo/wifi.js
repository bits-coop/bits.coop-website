var mat4 = require('gl-mat4')
var sphere = require('icosphere')(1)
var glsl = require('glslify')

module.exports = function (regl) {
  //var camera = require('regl-camera')(regl,
  //  { distance: 15, theta: -0.4, phi: 0.4 })
  var projection = new Float32Array(16)
  var view = new Float32Array(16)
  var eye = Float32Array.from([-12.0,+6.0,-5.0])
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
        var r = 15.0, t = -context.time*0.02
        eye[0] = Math.cos(t)*r
        eye[2] = Math.sin(t)*r
        return mat4.lookAt(view, eye, center, up)
      }
    }
  })

  var draw = {
    box: box(regl),
    radio: radio(regl)
  }
  draw.bg = regl({
    frag: glsl`
      precision highp float;
      #pragma glslify: snoise = require('glsl-noise/simplex/3d')
      #pragma glslify: hsl2rgb = require('glsl-hsl2rgb')
      uniform float time, aspect;
      varying vec2 vpos;
      void main () {
        vec3 lo = vec3(0.32,0.2,0.4)*0.3;
        vec3 hi = lo*1.5;
        vec2 uv = (vpos*0.5+0.5)*vec2(aspect,1);
        float s0 = snoise(vec3(uv*25.0,time*0.1))*0.5+0.5;
        float s1 = snoise(vec3(uv*50.0,time*0.2))*0.5+0.5;
        float l = pow(s0,32.0) + pow(s1,24.0);
        float s = 0.5 - (s1*0.5+s0*0.3)*0.3;
        vec3 star = hsl2rgb(1.0-(s1+s0)*0.2,s,l);
        gl_FragColor = vec4(star+mix(lo,hi,vpos.y*0.5+0.5),1);
      }
    `,
    vert: `
      precision highp float;
      attribute vec2 position;
      varying vec2 vpos;
      void main () {
        vpos = position;
        gl_Position = vec4(position,0,1);
      }
    `,
    uniforms: {
      time: regl.context('time'),
      aspect: function (context) {
        return context.viewportWidth / context.viewportHeight
      }
    },
    attributes: {
      position: [-4,-4,-4,+4,+4,+0]
    },
    elements: [[0,1,2]],
    depth: { mask: false }
  })

  var boxProps = []
  var radioProps = []

  for (var i = 0; i < 3; i++) {
    var theta = Math.PI*2/3*i
    var r = 3
    createWifi({
      id: i,
      offset: [Math.sin(theta)*r,+0.0,Math.cos(theta)*r],
      rotate: [0,1,0,theta],
      scale: [1,1,1]
    })
  }

  function createWifi (opts) {
    var location = opts.offset
    var rotate = opts.rotate
    var scale = opts.scale
    var id = opts.id
    var model = new Float32Array(16)
    function m (context) {
      mat4.identity(model)
      mat4.rotate(model,model,rotate[3],rotate)
      return model
    }
    radioProps.push(
      { offset: [-0.85,+1.1,-0.87], blink: 21.0,
        matrix: m, location: location, mscale: scale, id: id },
      { offset: [+0.85,+1.1,-0.87], blink: 17.0,
        matrix: m, location: location, mscale: scale, id: id }
    )
    boxProps.push(
      { offset: [+0.0,+0.0,+0.0], scale: [+1.0,+0.2,+0.7], color: [0,0.5,1],
        rotate: [+0.0,+0.0,+1.0,+0.0], blink: 0.0,
        matrix: m, location: location, mscale: scale },
      { offset: [+1.0,-0.2,+0.4], scale: [+0.1,+0.2,+0.2], color: [0,0.5,1],
        rotate: [+0.0,+0.0,+1.0,+0.0], blink: 0.0,
        matrix: m, location: location, mscale: scale },
      { offset: [+1.0,-0.2,-0.4], scale: [+0.1,+0.2,+0.2], color: [0,0.5,1],
        rotate: [+0.0,+0.0,+1.0,+0.0], blink: 0.0,
        matrix: m, location: location, mscale: scale },
      { offset: [-1.0,-0.2,+0.4], scale: [+0.1,+0.2,+0.2], color: [0,0.5,1],
        rotate: [+0.0,+0.0,+1.0,+0.0], blink: 0.0,
        matrix: m, location: location, mscale: scale },
      { offset: [-1.0,-0.2,-0.4], scale: [+0.1,+0.2,+0.2], color: [0,0.5,1],
        rotate: [+0.0,+0.0,+1.0,+0.0], blink: 0.0,
        matrix: m, location: location, mscale: scale },

      { offset: [-0.30,+0.0,+0.7], scale: [+0.65,+0.15,+0.01], color: [0.5,0.5,0.5],
        rotate: [+0.0,+0.0,+1.0,+0.0], blink: 0.0,
        matrix: m, location: location, mscale: scale },
      { offset: [-0.8,+0.0,+0.72], scale: [+0.07,+0.07,+0.01], color: [0.5,1.0,0.5],
        rotate: [+0.0,+0.0,+1.0,+0.0], blink: 0.0,
        matrix: m, location: location, mscale: scale },
      { offset: [-0.55,+0.0,+0.72], scale: [+0.07,+0.07,+0.01], color: [0.5,1.0,0.5],
        rotate: [+0.0,+0.0,+1.0,+0.0], blink: 0.0,
        matrix: m, location: location, mscale: scale },
      { offset: [-0.30,+0.0,+0.72], scale: [+0.07,+0.07,+0.01], color: [0.5,1.0,0.5],
        rotate: [+0.0,+0.0,+1.0,+0.0], blink: 21.0,
        matrix: m, location: location, mscale: scale },
      { offset: [-0.05,+0.0,+0.72], scale: [+0.07,+0.07,+0.01], color: [0.5,1.0,0.5],
        rotate: [+0.0,+0.0,+1.0,+0.0], blink: 17.0,
        matrix: m, location: location, mscale: scale },
      { offset: [+0.20,+0.0,+0.72], scale: [+0.07,+0.07,+0.01], color: [0.5,1.0,0.5],
        rotate: [+0.0,+0.0,+1.0,+0.0], blink: 0.0,
        matrix: m, location: location, mscale: scale },

      { offset: [+0.6,+0.7,-1.0], scale: [+0.1,+0.4,+0.1], color: [0.5,0.5,0.5],
        rotate: [+0.0,+0.0,+1.0,-0.3], blink: 0.0,
        matrix: m, location: location, mscale: scale },
      { offset: [+0.6,+1.1,-1.0], scale: [+0.07,+0.4,+0.07], color: [0.5,0.5,0.5],
        rotate: [+0.0,+0.0,+1.0,-0.3], blink: 0.0,
        matrix: m, location: location, mscale: scale },
      { offset: [+0.6,+0.2,-0.9], scale: [+0.1,+0.1,+0.2], color: [0.5,0.5,0.5],
        rotate: [+0.0,+0.0,+1.0,-0.3], blink: 0.0,
        matrix: m, location: location, mscale: scale },
      { offset: [-0.6,+0.7,-1.0], scale: [+0.1,+0.4,+0.1], color: [0.5,0.5,0.5],
        rotate: [+0.0,+0.0,+1.0,+0.3], blink: 0.0,
        matrix: m, location: location, mscale: scale },
      { offset: [-0.6,+1.1,-1.0], scale: [+0.07,+0.4,+0.07], color: [0.5,0.5,0.5],
        rotate: [+0.0,+0.0,+1.0,+0.3], blink: 0.0,
        matrix: m, location: location, mscale: scale },
      { offset: [-0.6,+0.2,-0.9], scale: [+0.1,+0.1,+0.2], color: [0.5,0.5,0.5],
        rotate: [+0.0,+0.0,+1.0,+0.3], blink: 0.0,
        matrix: m, location: location, mscale: scale }
    )
  }

  regl.frame(function () {
    regl.clear({ color: [0.13,0.08,0.16,1], depth: true })
    draw.bg()
    camera(function () {
      draw.box(boxProps)
      draw.radio(radioProps)
    })
  })

  function radio (regl) {
    var mesh = sphere
    return regl({
      frag: `
        precision highp float;
        uniform vec3 eye;
        uniform float time, blink, id;
        uniform vec3 location, mscale;
        varying vec3 vpos;
        void main () {
          float d = length(normalize(eye-location)-vpos);
          float a = smoothstep(-0.5,0.0,sin(d*50.0-time*10.0))
            * pow(clamp(0.0,1.0,1.0-d*0.7),8.0)
            * (sin(d-(time*0.5+id*13.0)*blink*0.25+1.57)*0.5+0.5)
          ;
          gl_FragColor = vec4(vec3(0.2,0.1,0.3)*8.0*a,a*0.4);
        }
      `,
      vert: `
        precision highp float;
        uniform mat4 projection, view, model;
        attribute vec3 position;
        uniform vec3 offset, location, mscale;
        varying vec3 vpos;
        varying vec2 vpt;
        void main () {
          vpos = (model * vec4(position,1)).xyz;
          vec3 p = position*2.0 + offset;
          gl_Position = projection * view
            * ((model * vec4(p,1)) * vec4(mscale,1) + vec4(location,0));
        }
      `,
      uniforms: {
        time: regl.context('time'),
        id: regl.prop('id'),
        offset: regl.prop('offset'),
        location: regl.prop('location'),
        mscale: regl.prop('mscale'),
        blink: regl.prop('blink'),
        model: function (context, props) {
          return props.matrix(context,props)
        }
      },
      attributes: {
        position: mesh.positions
      },
      elements: mesh.cells,
      depth: { mask: false },
      cull: { enable: true, face: 'back' },
      blend: {
        enable: true,
        func: { src: 'src alpha', dst: 'one minus src alpha' }
      }
    })
  }

  function box (regl) {
    var mesh = require('./lib/box.json')
    var model = new Float32Array(16)
    var view = new Float32Array(16)
    return regl({
      frag: `
        precision highp float;
        #extension GL_OES_standard_derivatives: enable
        uniform vec3 color;
        uniform float time, blink;
        varying vec3 vpos, vbcoord;
        void main () {
          vec3 L0 = normalize(vec3(-0.2,0.8,+0.1));
          vec3 L1 = normalize(vec3(+0.2,0.3,+0.4));
          vec3 L2 = normalize(vec3(-0.2,-0.1,-0.3));
          vec3 N = normalize(cross(dFdx(vpos),dFdy(vpos)));
          float d = max(0.0,max(max(dot(L0,N),dot(L1,N)),dot(L2,N)))
            * pow(sin(time*blink+1.57)*sin(time*blink*1.7+blink+1.57)*0.5+0.5,2.0);

          vec3 vb = smoothstep(vec3(0.0), fwidth(vbcoord)*1.0, vbcoord);
          float border = 1.0 - min(min(vb.x,vb.y),vb.z);

          gl_FragColor = vec4(mix(
            color*(d*0.5+0.5),
            color*0.6*(d*0.5+0.5),
          border), 1.0);
        }
      `,
      vert: `
        precision highp float;
        uniform mat4 projection, view, model;
        uniform vec3 offset, scale, location, mscale;
        attribute vec3 position, bcoord;
        varying vec3 vpos, vbcoord;
        void main () {
          vbcoord = bcoord;
          vpos = position*2.0-1.0;
          vec3 p = vpos*scale + offset;
          gl_Position = projection * view
            * (model * vec4(p*mscale,1) + vec4(location,0));
        }
      `,
      uniforms: {
        offset: regl.prop('offset'),
        location: regl.prop('location'),
        scale: regl.prop('scale'),
        mscale: regl.prop('mscale'),
        color: regl.prop('color'),
        blink: regl.prop('blink'),
        time: regl.context('time'),
        model: function (context, props) {
          mat4.identity(model)
          mat4.multiply(model, model, props.matrix(context,props))
          mat4.rotate(model, model, props.rotate[3], props.rotate)
          return model
        }
      },
      attributes: {
        position: mesh.positions,
        bcoord: mesh.bcoords
      },
      elements: mesh.cells,
      blend: {
        enable: true,
        func: { src: 'src alpha', dst: 'one minus src alpha' }
      }
    })
  }
}
