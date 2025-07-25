import { Script, Shader, Program, Texture, debug } from "./public1";
import { $V, $M, Matrix, Vector, Line, Plane } from "./Sylvester.js";

function inherit(a, b) {
  for (var c = Object.create(a.prototype), d = Object.keys(b), e = 0; e < d.length; e++)
      c[d[e]] = b[d[e]];
  return c
}
function text(a) {
  return a.join("\n")
}
function makePerspective(a, b, c, d) {
  var e = c * Math.tan(a * Math.PI / 360)
    , f = -e
    , g = f * b
    , h = e * b;
  return makeFrustum(g, h, f, e, c, d)
}
function makeFrustum(a, b, c, d, e, f) {
  var g = 2 * e / (b - a)
    , h = 2 * e / (d - c)
    , i = (b + a) / (b - a)
    , j = (d + c) / (d - c)
    , k = -(f + e) / (f - e)
    , l = -2 * f * e / (f - e);
  return $M([[g, 0, i, 0], [0, h, j, 0], [0, 0, k, l], [0, 0, -1, 0]])
}
var ImageTexture = function() {
  function a(a, b, c) {
      Texture.call(this, a, b, c)
  }
  return a.prototype = inherit(Texture, {
      fill: function(a, b) {
          var c = this.gl;
          c.bindTexture(c.TEXTURE_2D, this.texture),
          b ? c.texSubImage2D(c.TEXTURE_2D, 0, 0, 0, this.size.w, this.size.h, this.format, c.UNSIGNED_BYTE, a) : c.texImage2D(c.TEXTURE_2D, 0, this.format, this.format, c.UNSIGNED_BYTE, a)
      }
  }),
  a
}()
, WebGLCanvas = function() {
  function a(a, d, e) {
      this.canvas = a,
      this.size = d,
      this.canvas.width = d.w,
      this.canvas.height = d.h,
      this.onInitWebGL(),
      this.onInitShaders(),
      c.call(this),
      e && b.call(this),
      this.onInitTextures(),
      h.call(this)
  }
  function b() {
      var a = this.gl;
      this.framebuffer = a.createFramebuffer(),
      a.bindFramebuffer(a.FRAMEBUFFER, this.framebuffer),
      this.framebufferTexture = new Texture(this.gl,this.size,a.RGBA);
      var b = a.createRenderbuffer();
      a.bindRenderbuffer(a.RENDERBUFFER, b),
      a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_COMPONENT16, this.size.w, this.size.h),
      a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, this.framebufferTexture.texture, 0),
      a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, b)
  }
  function c() {
      var a = [1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0]
        , b = this.gl;
      this.quadVPBuffer = b.createBuffer(),
      b.bindBuffer(b.ARRAY_BUFFER, this.quadVPBuffer),
      b.bufferData(b.ARRAY_BUFFER, new Float32Array(a), b.STATIC_DRAW),
      this.quadVPBuffer.itemSize = 3,
      this.quadVPBuffer.numItems = 4;
      var c = 1
        , d = 1;
      this.quadVTCBuffer = b.createBuffer(),
      b.bindBuffer(b.ARRAY_BUFFER, this.quadVTCBuffer),
      a = [c, 0, 0, 0, c, d, 0, d],
      b.bufferData(b.ARRAY_BUFFER, new Float32Array(a), b.STATIC_DRAW)
  }
  function d() {
      this.mvMatrix = Matrix.I(4)
  }
  function e(a) {
      this.mvMatrix = this.mvMatrix.x(a)
  }
  function f(a) {
      e.call(this, Matrix.Translation($V([a[0], a[1], a[2]])).ensure4x4())
  }
  function g() {
      this.program.setMatrixUniform("uPMatrix", new Float32Array(this.perspectiveMatrix.flatten())),
      this.program.setMatrixUniform("uMVMatrix", new Float32Array(this.mvMatrix.flatten()))
  }
  function h() {
      var a = this.gl;
      this.perspectiveMatrix = makePerspective(45, 1, .1, 100),
      d.call(this),
      f.call(this, [0, 0, -2.415]),
      a.bindBuffer(a.ARRAY_BUFFER, this.quadVPBuffer),
      a.vertexAttribPointer(this.vertexPositionAttribute, 3, a.FLOAT, !1, 0, 0),
      a.bindBuffer(a.ARRAY_BUFFER, this.quadVTCBuffer),
      a.vertexAttribPointer(this.textureCoordAttribute, 2, a.FLOAT, !1, 0, 0),
      this.onInitSceneTextures(),
      g.call(this),
      this.framebuffer && a.bindFramebuffer(a.FRAMEBUFFER, this.framebuffer)
  }
  var i = Script.createFromSource("x-shader/x-vertex", text(["attribute vec3 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat4 uMVMatrix;", "uniform mat4 uPMatrix;", "varying highp vec2 vTextureCoord;", "void main(void) {", "  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);", "  vTextureCoord = aTextureCoord;", "}"]))
    , j = Script.createFromSource("x-shader/x-fragment", text(["precision highp float;", "varying highp vec2 vTextureCoord;", "uniform sampler2D texture;", "void main(void) {", "  gl_FragColor = texture2D(texture, vTextureCoord);", "}"]));
  return a.prototype = {
      toString: function() {
          return "WebGLCanvas Size: " + this.size
      },
      checkLastError: function(a) {
          var b = this.gl.getError();
          if (b !== this.gl.NO_ERROR) {
              var c = this.glNames[b];
              c = "undefined" != typeof c ? c + "(" + b + ")" : "Unknown WebGL ENUM (0x" + value.toString(16) + ")",
              a ? debug.log("WebGL Error: %s, %s", a, c) : debug.log("WebGL Error: %s", c),
              debug.trace()
          }
      },
      onInitWebGL: function() {
          try {
              this.gl = this.canvas.getContext("webgl")
          } catch (a) {
              debug.log("inInitWebGL error = " + a)
          }
          if (this.gl || debug.error("Unable to initialize WebGL. Your browser may not support it."),
          !this.glNames) {
              this.glNames = {};
              for (var b in this.gl)
                  "number" == typeof this.gl[b] && (this.glNames[this.gl[b]] = b)
          }
      },
      onInitShaders: function() {
          this.program = new Program(this.gl),
          this.program.attach(new Shader(this.gl,i)),
          this.program.attach(new Shader(this.gl,j)),
          this.program.link(),
          this.program.use(),
          this.vertexPositionAttribute = this.program.getAttributeLocation("aVertexPosition"),
          this.gl.enableVertexAttribArray(this.vertexPositionAttribute),
          this.textureCoordAttribute = this.program.getAttributeLocation("aTextureCoord"),
          this.gl.enableVertexAttribArray(this.textureCoordAttribute)
      },
      onInitTextures: function() {
          var a = this.gl;
          a.viewport(0, 0, this.canvas.width, this.canvas.height),
          this.texture = new Texture(a,this.size,a.RGBA)
      },
      onInitSceneTextures: function() {
          this.texture.bind(0, this.program, "texture")
      },
      drawScene: function() {
          this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
      },
      updateVertexArray: function(a) {
          this.zoomScene(a)
      },
      readPixels: function(a) {
          var b = this.gl;
          b.readPixels(0, 0, this.size.w, this.size.h, b.RGBA, b.UNSIGNED_BYTE, a)
      },
      zoomScene: function(a) {
          d.call(this),
          f.call(this, [a[0], a[1], a[2]]),
          g.call(this),
          this.drawScene()
      },
      setViewport: function(a, b) {
          debug.log("toWidth=" + a + ",toHeight=" + b);
          var c, d;
          this.gl.drawingBufferWidth < a || this.gl.drawingBufferHeight < b ? (c = this.gl.drawingBufferWidth,
          d = this.gl.drawingBufferHeight,
          this.canvas.width = c,
          this.canvas.height = d) : (c = a,
          d = b),
          this.gl.viewport(0, 0, c, d)
      },
      clearCanvas: function() {
          this.gl.clearColor(0, 0, 0, 1),
          this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT)
      }
  },
  a
}()
, ImageWebGLCanvas = function() {
  function a(a, b) {
      WebGLCanvas.call(this, a, b)
  }
  return a.prototype = inherit(WebGLCanvas, {
      drawCanvas: function(a) {
          this.texture.fill(a),
          this.drawScene()
      },
      onInitTextures: function() {
          var a = this.gl;
          this.setViewport(this.canvas.width, this.canvas.height),
          this.texture = new ImageTexture(a,this.size,a.RGBA)
      },
      initCanvas: function() {
          this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT)
      }
  }),
  a
}()
, YUVWebGLCanvas = function() {
  function a(a, b) {
      WebGLCanvas.call(this, a, b)
  }
  var b = Script.createFromSource("x-shader/x-vertex", text(["attribute vec3 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat4 uMVMatrix;", "uniform mat4 uPMatrix;", "varying highp vec2 vTextureCoord;", "void main(void) {", "  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);", "  vTextureCoord = aTextureCoord;", "}"]))
    , c = Script.createFromSource("x-shader/x-fragment", text(["precision highp float;", "varying highp vec2 vTextureCoord;", "uniform sampler2D YTexture;", "uniform sampler2D UTexture;", "uniform sampler2D VTexture;", "const mat4 YUV2RGB = mat4", "(", " 1.16438, 0.00000, 1.59603, -.87079,", " 1.16438, -.39176, -.81297, .52959,", " 1.16438, 2.01723, 0, -1.08139,", " 0, 0, 0, 1", ");", "void main(void) {", " gl_FragColor = vec4( texture2D(YTexture,  vTextureCoord).x, texture2D(UTexture, vTextureCoord).x, texture2D(VTexture, vTextureCoord).x, 1) * YUV2RGB;", "}"]));
  return a.prototype = inherit(WebGLCanvas, {
      onInitShaders: function() {
          this.program = new Program(this.gl),
          this.program.attach(new Shader(this.gl,b)),
          this.program.attach(new Shader(this.gl,c)),
          this.program.link(),
          this.program.use(),
          this.vertexPositionAttribute = this.program.getAttributeLocation("aVertexPosition"),
          this.gl.enableVertexAttribArray(this.vertexPositionAttribute),
          this.textureCoordAttribute = this.program.getAttributeLocation("aTextureCoord"),
          this.gl.enableVertexAttribArray(this.textureCoordAttribute)
      },
      onInitTextures: function() {
          this.setViewport(this.size.w, this.size.h),
          this.YTexture = new Texture(this.gl,this.size),
          this.UTexture = new Texture(this.gl,this.size.getHalfSize()),
          this.VTexture = new Texture(this.gl,this.size.getHalfSize())
      },
      onInitSceneTextures: function() {
          this.YTexture.bind(0, this.program, "YTexture"),
          this.UTexture.bind(1, this.program, "UTexture"),
          this.VTexture.bind(2, this.program, "VTexture")
      },
      fillYUVTextures: function(a, b, c) {
          this.YTexture.fill(a),
          this.UTexture.fill(b),
          this.VTexture.fill(c),
          this.drawScene()
      },
      drawCanvas: function(a, b) {
          var c = new Uint8Array(a.buffer,a.byteOffset,b.ylen * b.height)
            , d = new Uint8Array(a.buffer,a.byteOffset + b.ylen * b.height,b.ylen * b.height / 4)
            , e = new Uint8Array(a.buffer,a.byteOffset + b.ylen * b.height * 1.25,b.ylen * b.height / 4);
          this.YTexture.fill(c),
          this.UTexture.fill(d),
          this.VTexture.fill(e),
          this.drawScene()
      },
      updateVertexArray: function(a) {
          this.zoomScene(a)
      },
      toString: function() {
          return "YUVCanvas Size: " + this.size
      },
      initCanvas: function() {
          this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT)
      }
  }),
  a
}();

export { WebGLCanvas, ImageWebGLCanvas, YUVWebGLCanvas };
