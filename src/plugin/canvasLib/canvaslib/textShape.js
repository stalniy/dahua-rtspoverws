import { utils, deepCopy } from '../util.js';

export function TextShape() {
    var b = this;
    this.init = function(a, c, d, e, f) {
        b.type = "text",
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
    this.draw = function(a) {
        if (1 != a.option.hide) {
            var c = b.ctx.font
              , e = b.ctx.textAlign
              , f = b.ctx.textBaseline
              , g = b.ctx.fillStyle;
            b.ctx.font = a.option.font,
            b.ctx.textAlign = a.option.textAlign,
            b.ctx.textBaseline = a.option.textBaseline,
            b.ctx.fillStyle = a.option.strokeColor,
            utils.strokeText(b.ctx, a.option.title, a.data[0] * b.coordinate.widthDraw, a.data[1] * b.coordinate.heightDraw, a.option.textAlign, a.option.strokeColor),
            b.ctx.font = c,
            b.ctx.textAlign = e,
            b.ctx.textBaseline = f,
            b.ctx.fillStyle = g
        }
    }
    ,
    this.checkOnPoint = function() {
        return !1
    }
    ,
    this.checkSelected = function() {
        return !1
    }
}
