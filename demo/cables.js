var rotateY = require('gl-mat4/rotateY')
var identity = require('gl-mat4/identity')
var perspective = require('gl-mat4/perspective')
var lookAt = require('gl-mat4/lookAt')
var glsl = require('glslify')

var parseBGA = require('parse-bga-mesh')
var xhr = require('xhr')

module.exports = function (regl) {
  //var camera = require('regl-camera')(regl,
  //  { distance: 5, minDistance: 1.2, theta: -0.9, phi: 0.3 })
  var projection = new Float32Array(16)
  var view = new Float32Array(16)
  var eye = Float32Array.from([+3.5,+1,-2.5])
  var center = Float32Array.from([0,-0.1,0])
  var up = Float32Array.from([0,1,0])
  var camera = regl({
    uniforms: {
      eye: eye,
      projection: function (context) {
        var aspect = context.viewportWidth / context.viewportHeight
        return perspective(projection, Math.PI/8, aspect, 0.1, 1000.0)
      },
      view: function (context) {
        center[0] = -window.innerWidth / 300
        center[1] = -window.innerWidth / 350 * 0.1
        return lookAt(view, eye, center, up)
      }
    }
  })

  var draw = {}
  draw.bg = regl({
    frag: glsl`
      precision highp float;
      #pragma glslify: snoise = require('glsl-noise/simplex/3d')
      #pragma glslify: hsl2rgb = require('glsl-hsl2rgb')
      uniform float time, aspect;
      varying vec2 vpos;
      void main () {
        vec3 lo = vec3(0.32,0.2,0.4)*0.4;
        vec3 hi = lo*2.5;
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

  xhr({ url: 'demo/cables.bga', responseType: 'arraybuffer' }, onxhr)
  function onxhr (err, res, arrayBuffer) {
    var data = parseBGA(arrayBuffer).data
    var buffer = regl.buffer({ data: new Float32Array(arrayBuffer) })
    draw.cables = cables(regl, buffer, arrayBuffer, data.cable)
    draw.land = land(regl, buffer, arrayBuffer, data.land, data.land_elements)
    draw.sea = sea(regl, buffer, arrayBuffer, data.sphere, data.sphere_elements)
    draw.outline = outline(regl, buffer, arrayBuffer, data.sphere, data.sphere_elements)
  }

  var rmat = new Float32Array(16)
  var uniforms = regl({
    uniforms: {
      model: function (context) {
        identity(rmat)
        rotateY(rmat,rmat,-context.time*0.02)
        return rmat
      }
    }
  })

  regl.frame(function () {
    regl.clear({ color: [0.40,0.35,0.45,1], depth: true })
    draw.bg()
    camera(function () {
      uniforms(function () {
        if (draw.outline) draw.outline()
        if (draw.land) draw.land()
        if (draw.sea) draw.sea()
        if (draw.cables) draw.cables()
      })
    })
  })

  function sea (regl, buffer, arrayBuffer, sphere, sphereElements) {
    return regl({
      frag: `
        precision highp float;
        varying vec3 vpos;
        uniform vec3 eye;
        void main () {
          vec3 N = normalize(vpos);
          vec3 L = vpos-eye;
          float g = pow(max(0.0,dot(L,N)),0.2);
          gl_FragColor = vec4(vec3(0.4,0.5,0.6)*g,1);
        }
      `,
      vert: `
        precision highp float;
        uniform mat4 projection, view;
        attribute vec3 position;
        varying vec3 vpos;
        void main () {
          vpos = position;
          gl_Position = projection * view * vec4(vpos,1);
        }
      `,
      cull: { enable: true, face: 'front' },
      blend: {
        enable: true,
        func: { src: 'src alpha', dst: 'one minus src alpha' }
      },
      attributes: {
        position: {
          buffer: buffer,
          offset: sphere.position.offset,
          stride: sphere.position.stride
        }
      },
      elements: regl.elements({
        data: new Uint32Array(arrayBuffer, sphereElements.cell.offset,
          sphereElements.cell.count * sphereElements.cell.quantity),
        count: sphereElements.cell.count * 3
      })
    })
  }

  function outline (regl, buffer, arrayBuffer, sphere, sphereElements) {
    return regl({
      frag: `
        precision highp float;
        varying vec3 vpos;
        uniform vec3 eye;
        void main () {
          vec3 N = normalize(vpos);
          vec3 L = vpos-eye;
          float g = pow(max(0.0,dot(L,N)),6.0);
          gl_FragColor = vec4(vec3(1.2,0.5,0.6)*g*2.0,min(1.0,g)*0.3);
        }
      `,
      vert: `
        precision highp float;
        uniform mat4 projection, view;
        attribute vec3 position;
        varying vec3 vpos;
        void main () {
          vpos = position;
          gl_Position = projection * view * vec4(vpos*1.035,1);
        }
      `,
      cull: { enable: true, face: 'front' },
      depth: { mask: false },
      blend: {
        enable: true,
        func: { src: 'src alpha', dst: 'one minus src alpha' }
      },
      attributes: {
        position: {
          buffer: buffer,
          offset: sphere.position.offset,
          stride: sphere.position.stride
        }
      },
      elements: regl.elements({
        data: new Uint32Array(arrayBuffer, sphereElements.cell.offset,
          sphereElements.cell.count * sphereElements.cell.quantity),
        count: sphereElements.cell.count * 3
      })
    })
  }

  function land (regl, buffer, arrayBuffer, land, landElements) {
    return regl({
      frag: `
        precision highp float;
        uniform vec3 eye;
        varying vec3 vpos;
        void main () {
          vec3 N = normalize(vpos);
          float g = (vpos.y*0.5+0.5)*2.0;
          vec3 L = eye-vpos;
          float d = pow(max(0.0,dot(L,N)),0.2);
          gl_FragColor = vec4(vec3(0.2,0.2,0.3)*max(g,d),1);
        }
      `,
      vert: `
        precision highp float;
        uniform mat4 projection, view, model;
        attribute vec2 position;
        varying vec3 vpos;
        float PI = ${Math.PI};
        void main () {
          float theta = position.x/180.0*PI;
          float phi = position.y/180.0*PI;
          vpos = vec3(
            -cos(theta)*cos(phi),
            sin(phi),
            sin(theta)*cos(phi)
          )*1.002;
          gl_Position = projection * view * model * vec4(vpos,1);
        }
      `,
      cull: { enable: true, face: 'back' },
      attributes: {
        position: {
          buffer: buffer,
          offset: land.position.offset,
          stride: land.position.stride
        }
      },
      elements: regl.elements({
        data: new Uint32Array(arrayBuffer, landElements.cell.offset,
          landElements.cell.count * landElements.cell.quantity),
        count: landElements.cell.count * 3
      })
    })
  }

  function cables (regl, buffer, arrayBuffer, data) {
    return regl({
      frag: `
        precision highp float;
        uniform float time;
        varying vec2 vnorm, vpos;
        varying float vid, vkm;
        void main () {
          float t = time*0.7 + 10.0;
          float burst0 = pow(sin(t*0.2+vid+vkm/100000.0)*0.5+0.5,vkm*3.5);
          float burst1 = pow(sin(t*0.41+vid+vkm/99000.0+12.1)*0.5+0.5,vkm*4.0);
          float burst2 = pow(sin(t*0.36+vid+vkm/79000.0-15.7)*0.5+0.5,vkm*5.0);
          float burst3 = pow(sin(t*2.0+vid+vkm/50000.0+5.2)*0.5+0.5,vkm*0.05);
          float burst = max(max(burst0,burst1),max(burst2,burst3));
          vec4 e = vec4(0.5,0.3,0.8,1);
          gl_FragColor = mix(vec4(0.1,0.15,0.3,0.2),e,burst);
        }
      `,
      vert: `
        precision highp float;
        uniform mat4 projection, view, model;
        varying vec2 vnorm, vpos;
        attribute vec2 position, normal;
        attribute float id, km;
        varying float vid, vkm;
        uniform vec3 eye;
        float PI = ${Math.PI};
        vec3 shape (vec2 p) {
          float theta = p.x*PI/180.0;
          float phi = p.y/180.0*PI;
          return vec3(
            -cos(theta)*cos(phi),
            sin(phi),
            sin(theta)*cos(phi)
          );
        }
        void main () {
          vec2 N = normalize(normal);
          vnorm = N;
          vpos = position;
          vid = id;
          vkm = km;
          float d = pow(max(0.0,length(eye)-1.0),0.5);
          vec3 p = shape(position + N*0.1*d);
          gl_Position = projection * view * model * vec4(p,1);
        }
      `,
      uniforms: {
        time: regl.context('time')
      },
      blend: {
        enable: true,
        func: { src: 'src alpha', dst: 'one minus src alpha' }
      },
      depth: { mask: false },
      primitive: 'triangle strip',
      cull: { enable: true, face: 'back' },
      attributes: {
        position: {
          buffer: buffer,
          offset: data.position.offset,
          stride: data.position.stride
        },
        normal: {
          buffer: buffer,
          offset: data.normal.offset,
          stride: data.normal.stride
        },
        id: {
          buffer: buffer,
          offset: data.id.offset,
          stride: data.id.stride
        },
        km: {
          buffer: buffer,
          offset: data.km.offset,
          stride: data.km.stride
        }
      },
      count: data.position.count
    })
  }
}
