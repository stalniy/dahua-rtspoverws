import { utils, deepCopy } from '../util.js';

export function PolyShape() {
  var b = this;
  this.init = function(a, c, d, e, f) {
      b.type = "poly",
      b.regionNum = 999999,
      b.$canvas = a,
      b.ctx = c,
      b.drawFunc = d,
      b.eventFunc = e,
      b.coordinate = f,
      b.data = []
  }
  ,
  this.add = function(c, e) {
      if (b.data.length < b.regionNum) {
          var f = {};
          return f.data = deepCopy(c, []),
          f.shapeId = utils.shapeId++,
          f.option = deepCopy(e, {}),
          b.data.push(f),
          f
      }
  }
  ,
  this.drawStart = function(c) {
      var e = null
        , f = 0;
      b.$canvas.off("mousedown.draw").on("mousedown.draw", function(g) {
          if (g.preventDefault(),
          !(utils.moveFlag || utils.resizeFlag || b.data.length >= b.regionNum) && (e = [Math.round((g.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((g.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)],
          2 == utils.drawState || 0 == utils.drawState)) {
              utils.drawState = 1,
              f = 0;
              var h = {};
              h.data = [],
              h.option = deepCopy(c, {}),
              h.shapeId = utils.shapeId++,
              h.option.zindex = utils.zindex++,
              h.option.type = b.type,
              h.option.selected = !0,
              h.option.maxPointNum = h.option.maxPointNum || 20,
              b.data.push(h)
          }
      }),
      b.$canvas.off("mousemove.draw").on("mousemove.draw", function(a) {
          var c = b.data.length - 1;
          if (1 == utils.drawState) {
              var e = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
              b.data[c].data[f] = e,
              b.drawFunc()
          }
      });
      var g = function(a) {
          if (1 == utils.drawState) {
              {
                  var c = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
                  b.data[b.data.length - 1].data
              }
              if (2 !== a.button && b.data[b.data.length - 1].data.length >= b.data[b.data.length - 1].option.maxPointNum)
                  utils.drawState = 2,
                  e = null,
                  f = 0,
                  b.drawFunc(),
                  b.data[b.data.length - 1].event = {},
                  b.data[b.data.length - 1].event.type = utils.eventName.drawFinish,
                  utils.eventEnabled && b.eventFunc && b.eventFunc(b.data[b.data.length - 1]);
              else if (2 == a.button && b.data[b.data.length - 1].data.length > 2)
                  b.drawFunc(),
                  utils.drawState = 2,
                  e = null,
                  f = 0,
                  b.data[b.data.length - 1].data.length = b.data[b.data.length - 1].data.length - 1,
                  b.drawFunc(),
                  b.data[b.data.length - 1].event = {},
                  b.data[b.data.length - 1].event.type = utils.eventName.drawFinish,
                  utils.eventEnabled && b.eventFunc && b.eventFunc(b.data[b.data.length - 1]);
              else {
                  var g = utils.lineCrossPoly(b.data[b.data.length - 1].data, f);
                  if (g !== !1)
                      return;
                  b.data[b.data.length - 1].data.push(c),
                  f++,
                  b.drawFunc()
              }
          }
      };
      b.$canvas.off("mouseup.draw").on("mouseup.draw", g)
  }
  ,
  this.draw = function(c) {
      if (1 != c.option.hide) {
          var e = null;
          c.option.selected ? (b.ctx.strokeStyle = c.option.selectedColor,
          e = c.option.selectedColor,
          c.data.forEach(c => {
              utils.drawSelectRect(b.ctx, c[0] * b.coordinate.widthDraw, c[1] * b.coordinate.heightDraw)
          }),
          b.ctx.closePath()) : (b.ctx.strokeStyle = c.option.strokeColor,
          e = c.option.strokeTextColor || c.option.strokeColor),
          c.option.dashed && b.ctx.setLineDash(c.option.dashed),
          b.ctx.beginPath();
          for (var f = 0; c.data && c.data.length > 1 && f < c.data.length; f++)
              0 === f ? b.ctx.moveTo(c.data[f][0] * b.coordinate.widthDraw, c.data[f][1] * b.coordinate.heightDraw) : b.ctx.lineTo(c.data[f][0] * b.coordinate.widthDraw, c.data[f][1] * b.coordinate.heightDraw);
          if (c.option.closeEnable && b.ctx.lineTo(c.data[0][0] * b.coordinate.widthDraw, c.data[0][1] * b.coordinate.heightDraw),
          b.ctx.stroke(),
          b.ctx.closePath(),
          b.ctx.setLineDash([0, 0]),
          c.option.fillStyle && (b.ctx.fillStyle = c.option.fillStyle,
          b.ctx.fill()),
          (0 === c.option.direction || 1 === c.option.direction || 2 === c.option.direction) && c.data.length >= 2) {
              var g = utils.getArrayLines([c.data[0][0] * this.coordinate.widthDraw, c.data[0][1] * this.coordinate.heightDraw], [c.data[1][0] * this.coordinate.widthDraw, c.data[1][1] * this.coordinate.heightDraw], c.option.direction);
              g && g.length >= 3 && (g.forEach(c => {
                  utils.drawAppendLine(b.ctx, c)
              }),
              utils.strokeText(b.ctx, "A", g[0][0][0] + 10, g[0][0][1] + 10, null, e),
              utils.strokeText(b.ctx, "B", g[0][1][0] + 10, g[0][1][1] + 10, null, e))
          } else if (("Enter" === c.option.direction || "Leave" === c.option.direction || "Both" === c.option.direction) && c.data.length >= 3) {
              for (var h = [], i = 0; i < c.data.length; i++)
                  h[i] = [],
                  h[i][0] = c.data[i][0] * this.coordinate.widthDraw,
                  h[i][1] = c.data[i][1] * this.coordinate.heightDraw;
              var g = utils.getArrayLines([c.data[0][0] * this.coordinate.widthDraw, c.data[0][1] * this.coordinate.heightDraw], [c.data[1][0] * this.coordinate.widthDraw, c.data[1][1] * this.coordinate.heightDraw], c.option.direction, h);
              g && g.length >= 3 && g.forEach(c => {
                  utils.drawAppendLine(b.ctx, c)
              })
          }
          c.option.ruleName && c.option.ruleName.length > 0 && utils.strokeText(b.ctx, c.option.ruleName, c.data[0][0] * b.coordinate.widthDraw + 10, c.data[0][1] * b.coordinate.heightDraw + 10, null, e)
      }
  }
  ,
  this.checkOnPoint = function(a, c) {
      var e = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
      if (1 == c.option.hide || !c.option.resizeEnable == !0 && 1 == !c.option.moveEnable)
          return !1;
      var f = utils.onPoint(e, c.data, !1);
      return f !== !1 ? (c.option.selected = !0,
      {
          data: c,
          point: f
      }) : !1
  }
  ,
  this.checkSelected = function(a, c) {
      var e = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
      if (1 == c.option.hide || !c.option.resizeEnable == !0 && 1 == !c.option.moveEnable)
          return !1;
      var f = null
        , g = null;
      if (null == c.option.selectType || "inSide" == c.option.selectType) {
          var f = utils.pointInPoly(e, c.data);
          if (f)
              return c.option.selected = !0,
              {
                  data: c
              }
      }
      if (null == c.option.selectType || "onLine" == c.option.selectType) {
          for (var h = 0; h < c.data.length - 1; h++) {
              var i = [c.data[h], c.data[h + 1]];
              if (g = utils.onLine(e, i))
                  break
          }
          if (c.option.closeEnable && !g) {
              var i = [c.data[c.data.length - 1], c.data[0]];
              g = utils.onLine(e, i)
          }
          if (g)
              return c.option.selected = !0,
              {
                  data: c
              }
      }
      return !1
  }
  ,
  this.moveShape = function(a, c, e, f, g) {
      var h = deepCopy(f.data, [])
        , i = [Math.round((e.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((e.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)]
        , j = i[0] - a[0]
        , k = i[1] - a[1];
      if (g === !0)
          ;
      else
          for (var l = 0; l < f.data.length; l++) {
              var m = utils.pointInPoly([c.data[l][0] + j, c.data[l][1] + k], f.option.maxPoly);
              if (!m)
                  return b.$canvas.trigger("mouseup.draw"),
                  !1
          }
      for (var l = 0; l < f.data.length; l++)
          f.data[l][0] = c.data[l][0] + j,
          f.data[l][1] = c.data[l][1] + k;
      return f.beforModifyData = h,
      b.drawFunc(),
      delete f.beforModifyData,
      !0
  }
  ,
  this.resizeShape = function(c, e, f) {
      var g = deepCopy(f.data, [])
        , h = [Math.round((e.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((e.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)]
        , i = deepCopy(f, []);
      i.data[c][0] = h[0],
      i.data[c][1] = h[1];
      var j = utils.lineCrossPoly(i.data, c);
      return j === !0 ? !1 : (f.data[c][0] = h[0],
      f.data[c][1] = h[1],
      f.beforModifyData = g,
      b.drawFunc(),
      void delete f.beforModifyData)
  }
}
