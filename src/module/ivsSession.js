var IvsSession = function() {
  function a() {
      this.firstTime = 0,
      this.lastMSW = 0
  }
  function b(a) {
      for (var b = [].slice.call(a), c = "", d = 0; d < b.length; d++)
          c += String.fromCharCode(b[d]);
      return decodeURIComponent(escape(c))
  }
  function c(a) {
      var c = {
          result: !0,
          type: 0
      };
      return c.params = JSON.parse(b(a)),
      c
  }
  function d(a) {
      var b = {
          result: !1
      }
        , c = 0
        , d = (a[c + 1] << 8) + a[c];
      if (1 !== d && 2 !== d)
          return b;
      b.result = !0,
      b.type = 5,
      b.params = null,
      c += 2;
      var e = a[c];
      if (0 === e)
          return b;
      c += 1;
      var f = a[c];
      c += 1,
      b.params = {},
      b.params.coordinate = 128 & f ? 8192 : 1024,
      b.params.isTrack = 127 & f ? !0 : !1,
      b.params.object = [];
      for (var g = 0; e > g; g++) {
          var h = {};
          h.objectId = (a[c + 3] << 24) + (a[c + 2] << 16) + (a[c + 1] << 8) + a[c],
          c += 4,
          h.operateType = a[c],
          c += 1;
          var i = a[c];
          c += 1,
          h.objectType = a[c],
          c += 1;
          var j = a[c];
          c += 1,
          c += 1,
          c += 1,
          h.classID = H[a[c]],
          c += 1,
          h.subType = a[c],
          c += 1,
          j > 0 && (h.fatherId = []);
          for (var k = 0; j > k; k++)
              h.fatherId.push((a[c + 3] << 24) + (a[c + 2] << 16) + (a[c + 1] << 8) + a[c]),
              c += 4;
          i > 0 && (h.track = []);
          for (var l = 0; i > l; l++) {
              var m = (a[c + 1] << 8) + a[c];
              c += 2;
              var n = (a[c + 1] << 8) + a[c];
              c += 2;
              var o = (a[c + 1] << 8) + a[c];
              c += 2;
              var p = (a[c + 1] << 8) + a[c];
              c += 2,
              h.track.push([m - o, n - p, m + o, n + p])
          }
          b.params.object.push(h)
      }
      return b
  }
  function e(a) {
      var b = {
          type: 25,
          params: []
      }
        , c = a[1];
      if (0 === c)
          return b;
      for (var d = a.slice(8), e = d.length, f = 0, g = function() {
          var a = {};
          a.objectId = (d[f + 3] << 24) + (d[f + 2] << 16) + (d[f + 1] << 8) + (d[f + 0] << 0),
          f += 4;
          var b = (d[f + 1] << 8) + (d[f + 0] << 0);
          f += 2;
          var c = (d[f + 1] << 8) + (d[f + 0] << 0);
          f += 2;
          var e = (d[f + 1] << 8) + (d[f + 0] << 0);
          f += 2;
          var g = (d[f + 1] << 8) + (d[f + 0] << 0);
          return f += 2,
          a.pos = [b, c, e, g],
          a.objectType = d[f],
          f += 1,
          f += 7,
          a
      }; e > f; )
          b.params.push(g());
      return b
  }
  function f(a) {
      for (var c = {
          result: !1,
          type: 20,
          params: []
      }, d = (a[0],
      a.length), e = 0, f = a.slice(4), k = function() {
          var a = {};
          a.objectId = (f[e + 3] << 24) + (f[e + 2] << 16) + (f[e + 1] << 8) + (f[e + 0] << 0),
          e += 4,
          a.result = !0,
          a.params = {},
          a.custom = (f[e + 1] << 8) + f[e],
          e += 2,
          a.objectStatus = f[e],
          e += 1;
          var c = f[e];
          e += 1,
          a.params.object = [];
          for (var d = null, k = 0; c > k; k++) {
              switch (f[e]) {
              case 1:
                  d = i(f.slice(e));
                  break;
              case 2:
                  d = h(f.slice(e));
                  break;
              case 3:
                  d = g(f.slice(e));
                  break;
              case 4:
                  d = j(f.slice(e))
              }
              a.params.object.push(d.info),
              e += d.offset
          }
          (1 == a.objectStatus || 3 == a.objectStatus) && (a.params = null),
          0 == c && (a.params = null);
          var l = (f[e + 1] << 8) + f[e];
          e += 2;
          var m = b(f.slice(e, e + l));
          return a.appendInfo = String.fromCharCode.apply(null, f.slice(e, e + l)),
          e += l,
          a.appendInfo = m,
          a
      }; d - 4 > e; )
          c.params.push(k());
      return c
  }
  function g(a) {
      var b = 0
        , c = {
          type: a[0]
      };
      b += 1,
      c.pointCount = a[b],
      b += 1,
      c.lineWidth = a[b],
      b += 1,
      c.strokeStyle = a[b],
      b += 1,
      c.borderColor = [a[b + 1], a[b + 2], a[b + 3], a[b]],
      c.borderColorType = "RGBA",
      b += 4,
      c.fillColor = [a[b + 1], a[b + 2], a[b + 3], a[b]],
      c.fillColorType = "RGBA",
      b += 4,
      c.coordinate = [];
      for (var d = 0; d < c.pointCount; d++) {
          var e = (a[b + 1] << 8) + a[b];
          b += 2;
          var f = (a[b + 1] << 8) + a[b];
          b += 2,
          c.coordinate.push([e, f])
      }
      return {
          info: c,
          offset: b
      }
  }
  function h(a) {
      var b = 0
        , c = {
          type: a[0]
      };
      b += 1,
      c.pointCount = a[b],
      b += 1,
      c.lineWidth = a[b],
      b += 1,
      c.strokeStyle = a[b],
      b += 1,
      c.lineColor = [a[b + 1], a[b + 2], a[b + 3], a[b]],
      c.lineColorType = "RGBA",
      b += 4,
      c.coordinate = [];
      for (var d = 0; d < c.pointCount; d++) {
          var e = (a[b + 1] << 8) + a[b];
          b += 2;
          var f = (a[b + 1] << 8) + a[b];
          b += 2,
          c.coordinate.push([e, f])
      }
      return {
          info: c,
          offset: b
      }
  }
  function i(a) {
      var b = 0
        , c = {
          type: a[0]
      };
      b += 1,
      c.lineWidth = a[b],
      b += 1,
      c.strokeStyle = a[b],
      b += 1,
      b += 1,
      c.radius = (a[b + 1] << 8) + a[b],
      b += 2,
      b += 2;
      var d = (a[b + 1] << 8) + a[b];
      b += 2;
      var e = (a[b + 1] << 8) + a[b];
      return b += 2,
      c.coordinate = [d, e],
      c.borderColor = [a[b + 1], a[b + 2], a[b + 3], a[b]],
      c.borderColorType = "RGBA",
      b += 4,
      c.fillColor = [a[b + 1], a[b + 2], a[b + 3], a[b]],
      c.fillColorType = "RGBA",
      b += 4,
      {
          info: c,
          offset: b
      }
  }
  function j(a) {
      var c = 0
        , d = {
          type: a[0]
      };
      c += 1,
      d.encodeType = a[c],
      c += 1,
      c += 2;
      var e = (a[c + 1] << 8) + a[c];
      c += 2;
      var f = (a[c + 1] << 8) + a[c];
      c += 2,
      d.coordinate = [e, f],
      d.fontColor = [a[c + 1], a[c + 2], a[c + 3], a[c]],
      c += 4,
      d.colorType = "RGBA",
      d.fontSize = a[c],
      c += 1,
      d.textAlign = a[c],
      c += 1,
      d.textBaseline = "top",
      d.textLength = (a[c + 1] << 8) + a[c],
      c += 2;
      for (var g = a.slice(c, c + d.textLength), h = 0; h < d.textLength; h++)
          if (0 === g[h]) {
              g = g.slice(0, h);
              break
          }
      try {
          d.content = b(g)
      } catch (i) {
          d.content = ""
      }
      return c += d.textLength,
      {
          info: d,
          offset: c
      }
  }
  function k(a, b) {
      b.hasOwnProperty("attribute80") || (b.attribute80 = []);
      var c = 1
        , d = a[c];
      c += 1;
      var e = {};
      e.color = {},
      e.color.valid = a[c],
      c += 1,
      e.carModel = a[c],
      c += 1,
      e.color.red = a[c],
      c += 1,
      e.color.green = a[c],
      c += 1,
      e.color.blue = a[c],
      c += 1,
      e.color.alpha = a[c],
      c += 1,
      e.brand = (a[c + 1] << 8) + a[c],
      c += 2,
      e.subBrand = (a[c + 1] << 8) + a[c],
      c += 2,
      e.year = (a[c + 1] << 8) + a[c],
      c += 2,
      e.reliability = a[c],
      c += 1,
      c += 1;
      var f = (a[c + 1] << 8) + a[c];
      c += 2;
      var g = (a[c + 1] << 8) + a[c];
      c += 2;
      var h = (a[c + 1] << 8) + a[c];
      c += 2;
      var i = (a[c + 1] << 8) + a[c];
      return c += 2,
      e.windowPosition = [f - h, g - i, f + h, g + i],
      b.attribute80.push(e),
      d
  }
  function l(a, b) {
      b.hasOwnProperty("attribute81") || (b.attribute81 = []);
      var c = {}
        , d = 1
        , e = a[d];
      d += 1;
      var f = (a[d + 1] << 8) + a[d];
      d += 2;
      var g = (a[d + 1] << 8) + a[d];
      d += 2;
      var h = (a[d + 1] << 8) + a[d];
      d += 2;
      var i = (a[d + 1] << 8) + a[d];
      return d += 2,
      c.mainPosition = [f - h, g - i, f + h, g + i],
      f = (a[d + 1] << 8) + a[d],
      d += 2,
      g = (a[d + 1] << 8) + a[d],
      d += 2,
      h = (a[d + 1] << 8) + a[d],
      d += 2,
      i = (a[d + 1] << 8) + a[d],
      d += 2,
      c.coPosition = [f - h, g - i, f + h, g + i],
      c.mainSafetyBelt = a[d] >> 2 & 3,
      c.coSafetyBelt = 3 & a[d],
      d += 1,
      c.mainSunvisor = a[d] >> 2 & 3,
      c.coSunvisor = 3 & a[d],
      d += 1,
      b.attribute81.push(c),
      e
  }
  function m(a, b) {
      b.hasOwnProperty("attribute82") || (b.attribute82 = []);
      var c = {}
        , d = 1
        , e = a[d];
      return d += 1,
      c.plateEncode = a[d],
      d += 1,
      c.plateInfoLen = a[d],
      d += 1,
      c.plateInfo = a.subarray(d, d + c.plateInfoLen),
      b.attribute82.push(c),
      e
  }
  function n(a, b) {
      b.hasOwnProperty("attribute83") || (b.attribute83 = []);
      var c = {}
        , d = 1
        , e = a[d];
      return d += 1,
      c.color = {},
      c.color.valid = a[d],
      d += 1,
      c.color.red = a[d],
      d += 1,
      c.color.green = a[d],
      d += 1,
      c.color.blue = a[d],
      d += 1,
      c.color.alpha = a[d],
      d += 1,
      c.country = String.fromCharCode.apply(null, a.subarray(d, d + 4)),
      d += 4,
      c.plateType = (a[d + 1] << 8) + a[d],
      d += 2,
      d += 1,
      c.plateWidth = (a[d + 1] << 8) + a[d],
      b.attribute83.push(c),
      e
  }
  function o(a, b) {
      b.hasOwnProperty("attribute84") || (b.attribute84 = []);
      var c = {}
        , d = 1
        , e = a[d];
      d += 1,
      c.fatherCount = a[d],
      d += 1,
      c.trackCount = a[d],
      d += 1,
      c.trackType = a[d],
      d += 1,
      d += 3,
      c.fatherCount > 0 && (c.fatherID = []);
      for (var f = 0; f < c.fatherCount; f++)
          c.fatherID.push((a[d + 3] << 24) + (a[d + 2] << 16) + (a[d + 1] << 8) + a[d]),
          d += 4;
      c.trackCount > 0 && (c.track = []);
      for (var g = 0; g < c.trackCount; g++) {
          var h = (a[d + 1] << 8) + a[d];
          d += 2;
          var i = (a[d + 1] << 8) + a[d];
          d += 2;
          var j = (a[d + 1] << 8) + a[d];
          d += 2;
          var k = (a[d + 1] << 8) + a[d];
          d += 2,
          c.track.push([h - j, i - k, h + j, i + k])
      }
      return b.attribute84.push(c),
      e
  }
  function p(a, b) {
      b.hasOwnProperty("attribute85") || (b.attribute85 = []);
      var c = {}
        , d = 1
        , e = a[d];
      d += 1,
      c.colorSpace = a[d],
      d += 1,
      c.mainColorCount = a[d],
      d += 1,
      c.mainColorCount > 0 && (c.mainColorInfo = []);
      for (var f = 0; f < c.mainColorCount; f++) {
          var g = {}
            , h = (a[d + 1] << 8) + a[d];
          d += 2;
          var i = (a[d + 1] << 8) + a[d];
          d += 2;
          var j = (a[d + 1] << 8) + a[d];
          d += 2;
          var k = (a[d + 1] << 8) + a[d];
          d += 2,
          g.rect = [h - j, i - k, h + j, i + k],
          g.color = (a[d + 3] << 24) + (a[d + 2] << 16) + (a[d + 1] << 8) + a[d],
          d += 4,
          c.mainColorInfo.push(g)
      }
      return b.attribute85.push(c),
      e
  }
  function q(a, b) {
      b.hasOwnProperty("attribute86") || (b.attribute86 = []);
      var c = {}
        , d = 1
        , e = a[d];
      return d += 1,
      d += 1,
      c.speedType = a[d],
      d += 1,
      c.speed = a[d + 1] << 8 + a[d],
      d += 2,
      c.speedX = a[d + 1] << 8 + a[d],
      d += 2,
      c.speedY = (a[d + 1] << 8) + a[d],
      b.attribute86.push(c),
      e
  }
  function r(a, b) {
      b.hasOwnProperty("attribute87") || (b.attribute87 = []);
      var c = {}
        , d = 1
        , e = a[d];
      d += 1,
      d += 2;
      var f = (a[d + 1] << 8) + a[d];
      d += 2;
      var g = (a[d + 1] << 8) + a[d];
      d += 2;
      var h = (a[d + 1] << 8) + a[d];
      d += 2;
      var i = (a[d + 1] << 8) + a[d];
      return c.track = [[f - h, g - i, f + h, g + i]],
      b.attribute87.push(c),
      e
  }
  function s(a, b) {
      b.hasOwnProperty("attribute88") || (b.attribute88 = []);
      var c = {}
        , d = 1
        , e = a[d];
      return d += 1,
      c.age = a[d],
      d += 1,
      c.sex = a[d],
      d += 1,
      c.face = a[d],
      d += 1,
      c.glass = a[d],
      d += 1,
      c.hat = a[d],
      d += 1,
      c.call = a[d],
      d += 1,
      c.backpack = a[d],
      d += 1,
      c.umbrella = a[d],
      d += 1,
      c.height = a[d],
      d += 1,
      c.mask = a[d] >> 2 & 3,
      c.beard = 3 & a[d],
      b.attribute88.push(c),
      e
  }
  function t(a, b) {
      b.hasOwnProperty("attribute89") || (b.attribute89 = []);
      var c = {}
        , d = 1
        , e = a[d];
      d += 1,
      c.yawAngle = parseInt((a[d + 1] << 8) + a[d]),
      d += 2,
      c.rollAngle = parseInt((a[d + 1] << 8) + a[d]),
      d += 2,
      c.pitchAngle = parseInt((a[d + 1] << 8) + a[d]),
      d += 2;
      var f = (a[d + 1] << 8) + a[d];
      d += 2;
      var g = (a[d + 1] << 8) + a[d];
      d += 2,
      c.lEyePos = [f, g],
      f = (a[d + 1] << 8) + a[d],
      d += 2,
      g = (a[d + 1] << 8) + a[d],
      d += 2,
      c.rEyePos = [f, g],
      f = (a[d + 1] << 8) + a[d],
      d += 2,
      g = (a[d + 1] << 8) + a[d],
      d += 2,
      c.nosePos = [f, g],
      f = (a[d + 1] << 8) + a[d],
      d += 2,
      g = (a[d + 1] << 8) + a[d],
      d += 2,
      c.lMouthPos = [f, g],
      f = (a[d + 1] << 8) + a[d],
      d += 2,
      g = (a[d + 1] << 8) + a[d],
      d += 2,
      c.rMouthPos = [f, g];
      var h = a[d];
      d += 3,
      h > 0 && (c.featurePos = []);
      for (var i = 0; h > i; i++)
          f = (a[d + 1] << 8) + a[d],
          d += 2,
          g = (a[d + 1] << 8) + a[d],
          d += 2,
          c.featurePos.push([f, g]);
      return b.attribute89.push(c),
      e
  }
  function u(a, b) {
      b.hasOwnProperty("attribute8C") || (b.attribute8C = []);
      var c = {}
        , d = 1
        , e = a[d];
      d += 1,
      c.hangingCount = a[d],
      d += 1,
      c.tissueCount = a[d],
      d += 1,
      c.sunVisorCount = a[d],
      d += 1,
      c.annualInspectionCount = a[d],
      d += 1,
      d += 6,
      c.hangingCount > 0 && (c.hangingCount = []);
      for (var f = 0; f < c.hangingCount; f++) {
          var g = (a[d + 1] << 8) + a[d];
          d += 2;
          var h = (a[d + 1] << 8) + a[d];
          d += 2;
          var i = (a[d + 1] << 8) + a[d];
          d += 2;
          var j = (a[d + 1] << 8) + a[d];
          d += 2,
          c.hangingPos.push([g - i, h - j, g + i, h + j])
      }
      c.tissueCount > 0 && (c.tissueCount = []);
      for (var f = 0; f < c.tissueCount; f++) {
          var g = (a[d + 1] << 8) + a[d];
          d += 2;
          var h = (a[d + 1] << 8) + a[d];
          d += 2;
          var i = (a[d + 1] << 8) + a[d];
          d += 2;
          var j = (a[d + 1] << 8) + a[d];
          d += 2,
          c.tissueCount.push([g - i, h - j, g + i, h + j])
      }
      c.sunVisorCount > 0 && (c.sunVisorCount = []);
      for (var f = 0; f < c.tissueCount; f++) {
          var g = (a[d + 1] << 8) + a[d];
          d += 2;
          var h = (a[d + 1] << 8) + a[d];
          d += 2;
          var i = (a[d + 1] << 8) + a[d];
          d += 2;
          var j = (a[d + 1] << 8) + a[d];
          d += 2,
          c.sunVisorCount.push([g - i, h - j, g + i, h + j])
      }
      c.annualInspectionCount > 0 && (c.annualInspectionCount = []);
      for (var f = 0; f < c.tissueCount; f++) {
          var g = (a[d + 1] << 8) + a[d];
          d += 2;
          var h = (a[d + 1] << 8) + a[d];
          d += 2;
          var i = (a[d + 1] << 8) + a[d];
          d += 2;
          var j = (a[d + 1] << 8) + a[d];
          d += 2,
          c.annualInspectionCount.push([g - i, h - j, g + i, h + j])
      }
      return b.attribute8C.push(c),
      e
  }
  function v(a, b) {
      b.hasOwnProperty("attribute8E") || (b.attribute8E = []);
      var c = {}
        , d = 1
        , e = a[d];
      d += 1,
      c.nameCodecFormat = a[d],
      d += 1;
      var f = a[d];
      return d += 1,
      c.name = String.fromCharCode.apply(null, a.subarray(d, f)),
      b.attribute8E.push(c),
      e
  }
  function w(a, b) {
      for (var c = {
          128: k,
          129: l,
          130: m,
          131: n,
          132: o,
          133: p,
          134: q,
          135: r,
          136: s,
          137: t,
          140: u,
          142: v
      }, d = 0, e = a[d]; d < a.length; ) {
          var f = a.subarray(d, a.length);
          if (void 0 === c[e])
              return;
          var g = c[e].call(null, f, b);
          d += g
      }
  }
  function x(a, b) {
      b.hasOwnProperty("vehicleObject") || (b.vehicleObject = []);
      var c = {}
        , d = 0;
      c.type = a[d],
      d += 1,
      d += 1;
      var e = (a[d + 1] << 8) + a[d];
      d += 2,
      c.objectId = (a[d + 3] << 24) + (a[d + 2] << 16) + (a[d + 1] << 8) + a[d],
      d += 4;
      var f = (a[d + 1] << 8) + a[d];
      d += 2;
      var g = (a[d + 1] << 8) + a[d];
      d += 2;
      var h = (a[d + 1] << 8) + a[d];
      d += 2;
      var i = (a[d + 1] << 8) + a[d];
      d += 2,
      c.track = [[f - h, g - i, f + h, g + i]],
      c.valid = a[d],
      d += 1,
      c.operateType = a[d],
      d += 1,
      d += 2;
      var j = a.subarray(d, e);
      return w(j, c),
      b.vehicleObject.push(c),
      e
  }
  function y(a, b) {
      b.hasOwnProperty("faceObject") || (b.faceObject = []);
      var c = {}
        , d = 0;
      c.type = a[d],
      d += 1,
      d += 1;
      var e = (a[d + 1] << 8) + a[d];
      return 12 > e ? 0 : (d += 2,
      c.objectId = (a[d + 3] << 24) + (a[d + 2] << 16) + (a[d + 1] << 8) + a[d],
      d += 4,
      c.version = a[d],
      d += 1,
      d += 3,
      c.faceData = a.subarray(d, e),
      b.faceObject.push(c),
      e)
  }
  function z(a, b) {
      b.hasOwnProperty("commonObject") || (b.commonObject = []);
      var c = {}
        , d = 0;
      c.type = a[d],
      d += 1,
      d += 1;
      var e = (a[d + 1] << 8) + a[d];
      d += 2,
      c.objectId = (a[d + 3] << 24) + (a[d + 2] << 16) + (a[d + 1] << 8) + a[d],
      d += 4,
      c.operateType = a[d],
      d += 1,
      d += 3;
      var f = a.subarray(d, e);
      return w(f, c),
      b.commonObject.push(c),
      e
  }
  function A(a, b, c) {
      var d = 0
        , e = (a[d + 3] << 24) + (a[d + 2] << 16) + (a[d + 1] << 8) + a[d];
      d += 4;
      var f = a[d];
      if (d += 1,
      d += 3,
      0 == f)
          return d;
      b.groupId = e,
      b.object = {};
      for (var g = 0; f > g; g++) {
          var h = a[d]
            , i = a.subarray(d, a.length)
            , j = 0;
          switch (h) {
          case 2:
          case 5:
              j = x(i, b.object);
              break;
          case 15:
              j = y(i, b.object);
              break;
          default:
              j = z(i, b.object)
          }
          if (0 == j)
              return 0;
          d += j
      }
      return c(b),
      d
  }
  function B(a, b, c) {
      var d = {
          coordinate: 8192
      };
      if (b.length < 32)
          return !1;
      var e = 4;
      d.classID = a;
      var f = b[e];
      if (0 == f)
          return !0;
      d.groupCount = f,
      e += 1,
      e += 7,
      d.cameral = [];
      for (var g = 0; 20 > g; g++)
          d.cameral.push(b[e + g]);
      e += 20;
      for (var h = 0; h < d.groupCount; h++) {
          var i = b.subarray(e, b.length)
            , j = A(i, JSON.parse(JSON.stringify(d)), c);
          if (0 >= j)
              break;
          e += j
      }
  }
  function C(a, b) {
      for (var c = a.length, d = 0; c > d + 4; ) {
          var e = a[d]
            , f = (a[d + 1],
          (a[d + 3] << 8) + a[d + 2])
            , g = a.subarray(d, f);
          if (d += f,
          161 !== e && !B(H[e - 64], g, b))
              break
      }
  }
  function D(a, b, g, h) {
      var i = b[22]
        , j = b.subarray(24 + i, b.length - 8);
      switch (a) {
      case 0:
          g({
              ivsDraw: c(j),
              timeStamp: F,
              channel: h
          });
          break;
      case 5:
          g({
              ivsDraw: d(j),
              timeStamp: F,
              channel: h
          });
          break;
      case 6:
          break;
      case 14:
          var k = []
            , l = function(a) {
              k.push(a)
          };
          if (C(j, l),
          k.length) {
              var m = {
                  result: !1,
                  type: 14,
                  params: k
              };
              g({
                  ivsDraw: m,
                  timeStamp: F,
                  channel: h
              })
          }
          break;
      case 20:
          g({
              ivsDraw: f(j),
              timeStamp: F,
              channel: h
          });
          break;
      case 25:
          g({
              ivsDraw: e(j),
              timeStamp: F,
              channel: h
          })
      }
  }
  var E, F, G = null, H = {
      1: "VideoSynopsis",
      2: "TrafficGate",
      3: "ElectronicPolice",
      4: "SinglePtzParking",
      5: "PtzParking",
      6: "Traffic",
      7: "Normal",
      8: "Prison",
      9: "ATM",
      10: "MetroIVS",
      11: "FaceDetection",
      12: "FaceRecognition",
      13: "NumberStat",
      14: "HeatMap",
      15: "VideoDiagnosis",
      16: "VideoEnhance",
      17: "SmokeFireDetect",
      18: "VehicleAnalyse",
      19: "PersonFeature",
      20: "SDFaceDetect",
      21: "HeatMapPlan",
      22: "ATMFD",
      23: "SCR",
      24: "NumberStatPlan",
      25: "CourseRecord",
      26: "Highway",
      27: "City",
      28: "LeTrack",
      29: "ObjectStruct",
      30: "Stereo",
      31: "StereoPc",
      32: "HumanDetect",
      33: "SDPedestrain",
      34: "FaceAnalysis",
      35: "FaceAttribute",
      36: "FacePicAnalyse",
      37: "SDEP",
      38: "XRayDetect",
      39: "ObjectDetect",
      40: "CrowdDistriMap",
      41: "StereoBehavior",
      100: "PortraitDetect"
  };
  return a.prototype = {
      init: function() {
          debug.log("init")
      },
      parseRTPData: function(a, b, c, d, e, f) {
          var g = (b[19] << 24) + (b[18] << 16) + (b[17] << 8) + b[16] >>> 0
            , h = Date.UTC("20" + (g >> 26), (g >> 22 & 15) - 1, g >> 17 & 31, g >> 12 & 31, g >> 6 & 63, 63 & g) / 1e3;
          if (h -= 28800,
          0 == this.firstTime)
              this.firstTime = h,
              this.lastMSW = 0,
              G = (b[21] << 8) + b[20],
              F = {
                  timestamp: this.firstTime,
                  timestamp_usec: 0
              };
          else {
              var i, j = (b[21] << 8) + b[20];
              i = j >= G ? j - G : j + 65535 - G,
              this.lastMSW += i,
              h > this.firstTime && (this.lastMSW -= 1e3),
              this.firstTime = h,
              F = {
                  timestamp: h,
                  timestamp_usec: this.lastMSW
              },
              G = j
          }
          E = b[5],
          D(E, b, this.rtpReturnCallback, f)
      },
      setBufferfullCallback: function() {},
      setReturnCallback: function(a) {
          this.rtpReturnCallback = a
      }
  },
  new a
};
