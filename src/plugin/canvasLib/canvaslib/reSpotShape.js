import { jQuery as a } from '../../jQuery.js';
import { utils } from '../util.js';

export function ReSpotShape() {
  var b = this;
  this.init = function(a, c, d, e) {
      b.type = "reSpot",
      b.regionNum = 999999,
      b.$canvas = a,
      b.ctx = c,
      b.drawFunc = d,
      b.eventFunc = e,
      b.coordinate = {
          widthDraw: 1,
          heightDraw: 1,
          widthMouse: 1,
          heightMouse: 1
      },
      b.data = [],
      b.r = 6,
      b.size = {
          width: 70,
          height: 20,
          distance: 10
      }
  }
  ,
  this.add = function() {
      return !1
  }
  ,
  this.drawStart = function(c) {
      var e = null;
      b.regionNum = 1,
      b.$canvas.off("mousedown.draw").on("mousedown.draw", function(f) {
          if (f.preventDefault(),
          !utils.moveFlag && !utils.resizeFlag) {
              e = [Math.round((f.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((f.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
              var g = []
                , h = {};
              h.data = g,
              h.option = a.extend(!0, {}, c),
              h.shapeId = utils.shapeId++,
              h.option.zindex = utils.zindex++,
              h.option.type = b.type,
              h.option.selected = !0,
              h.option.fillStyle = h.option.fillStyle || "#00FF00",
              b.data[0] = h,
              b.data[0].data = a.extend(!0, [], e),
              utils.drawState = 1,
              b.drawFunc()
          }
      }),
      b.$canvas.off("mousemove.draw").on("mousemove.draw", function() {});
      var f = function() {
          if (1 == utils.drawState) {
              var a = b.data[0];
              a.event = {},
              a.event.type = utils.eventName.drawFinish,
              utils.eventEnabled && b.eventFunc && b.eventFunc(a),
              utils.drawState = 2
          }
      };
      b.$canvas.off("mouseup.draw").on("mouseup.draw", f),
      b.$canvas.off("mouseleave.draw").on("mouseleave.draw", f)
  }
  ,
  this.draw = function(a) {
      1 != a.option.hide && (b.ctx.fillStyle = a.option.fillStyle,
      b.ctx.beginPath(),
      b.ctx.arc(a.data[0] * b.coordinate.widthDraw, a.data[1] * this.coordinate.heightDraw, b.r * this.coordinate.widthDraw, 0, 2 * Math.PI, !0),
      b.ctx.closePath(),
      b.ctx.fill(),
      b.ctx.beginPath(),
      b.ctx.fillRect((a.data[0] + b.size.distance) * b.coordinate.widthDraw, (a.data[1] - b.size.height / 2) * b.coordinate.heightDraw, b.size.width * b.coordinate.widthDraw, b.size.height * b.coordinate.heightDraw),
      b.ctx.closePath(),
      a.option.title && (b.ctx.font = "normal normal bold 16px arial",
      utils.strokeText(b.ctx, a.option.title, a.data[0] + b.size.distance + 6, a.data[1] + b.size.height / 4, "left", "#000000"),
      b.ctx.font = "normal normal 100 10px arial"))
  }
  ,
  this.checkOnPoint = function() {
      return !1
  }
  ,
  this.checkSelected = function() {
      return !1
  }
  ,
  this.moveShape = function() {
      return !1
  }
}
