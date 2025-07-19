import { utils, deepCopy } from '../util.js';
import { jQuery as  a } from '../../jQuery.js';

function d(a, b, c) {
    if (a += "",
    !b || 0 === b.length)
        return a;
    for (; a.length < c; )
        a = b + a;
    return a
}

export function MotionDetectShape() {
    var b = this
      , c = 0
      , f = 0
      , g = 0
      , h = 0
      , i = []
      , j = []
      , k = 0
      , l = 0;
    this.init = function(a, c, d, e, f) {
        b.type = "motionDetect",
        b.regionNum = 1,
        b.$canvas = a,
        b.ctx = c,
        b.drawFunc = d,
        b.eventFunc = e,
        b.coordinate = f,
        b.data = [],
        i = []
    }
    ,
    this.add = function(c, f) {
        if (0 === g || 0 === h)
            return !1;
        j = [],
        k = 0;
        var l = {};
        return l.data = deepCopy(c, []),
        l.shapeId = utils.shapeId++,
        l.option = deepCopy(f, {}),
        b.data[0] = l,
        i = [],
        a.each(c, function(b, c) {
            i[b] = [],
            j[b] = k++,
            a.each(c.Region, function(a, c) {
                var e = d(c.toString(2), "0", g)
                  , f = e.split("");
                i[b][a] = f
            })
        }),
        b.draw(),
        l
    }
    ,
    this.drawGrid = function(a, d) {
        if (g = d,
        h = a,
        b.ctx.clearRect(0, 0, b.$canvas.prop("width"), b.$canvas.prop("height")),
        0 !== a && 0 !== d) {
            b.ctx.globalAlpha = .5,
            c = b.$canvas.prop("width") / g,
            f = b.$canvas.prop("height") / h,
            b.ctx.strokeStyle = "#C8C8C8";
            var e;
            for (b.ctx.beginPath(),
            e = 0; g + 1 > e; e++)
                b.ctx.moveTo(c * e, 0),
                b.ctx.lineTo(c * e, b.$canvas.prop("height"));
            for (e = 0; h + 1 > e; e++)
                b.ctx.moveTo(0, f * e),
                b.ctx.lineTo(b.$canvas.prop("width"), f * e);
            b.ctx.closePath(),
            b.ctx.stroke()
        }
    }
    ,
    this.drawStart = function() {
        var c = null
          , d = null
          , f = null
          , j = 0;
        b.$canvas.off("mousedown.draw").on("mousedown.draw", function(a) {
            a.preventDefault(),
            0 !== g && 0 !== h && b.data[0] && b.data[0].data && b.data[0].data.length > 0 && (c = [a.clientX - b.$canvas.offset().left + window.scrollX, a.clientY - b.$canvas.offset().top + window.scrollY],
            f = b.getColumnRow(c),
            j = 0 == i[l][f.row][f.column] ? 1 : 0,
            i[l][f.row][f.column] = j,
            b.drawFunc())
        }),
        b.$canvas.off("mousemove.draw").on("mousemove.draw", function(d) {
            if (c) {
                var e = [d.clientX - b.$canvas.offset().left + window.scrollX, d.clientY - b.$canvas.offset().top + window.scrollY]
                  , g = b.getColumnRow(e);
                if (g.row == f.row && g.column == f.column)
                    return;
                var h = b.getDataByRect(c, e);
                a.each(h, function(a, b) {
                    i[l][b.row][b.column] = j
                }),
                f = deepCopy(g, {}),
                b.drawFunc()
            }
        }),
        b.$canvas.off("mouseup.draw").on("mouseup.draw", function() {
            c && (b.data[0].event = {},
            b.data[0].event.type = utils.eventName.drawFinish,
            b.matrixToNumber(i),
            utils.eventEnabled && b.eventFunc && b.eventFunc(b.data[0])),
            c = null,
            d = null
        }),
        b.$canvas.off("mouseleave.draw").on("mouseleave.draw", function() {
            b.$canvas.trigger("mouseup.draw")
        })
    }
    ,
    this.getColumnRow = function(a) {
        var b = 0 == a[0] ? 0 : Math.ceil(a[0] / c) - 1
          , d = 0 == a[1] ? 0 : Math.ceil(a[1] / f) - 1;
        return {
            column: b,
            row: d
        }
    }
    ,
    this.getDataByRect = function(a, b) {
        var d = {}
          , e = []
          , g = 0 == a[0] ? 0 : Math.ceil(a[0] / c) - 1
          , h = 0 == a[1] ? 0 : Math.ceil(a[1] / f) - 1
          , i = 0 == b[0] ? 0 : Math.ceil(b[0] / c) - 1
          , j = 0 == b[1] ? 0 : Math.ceil(b[1] / f) - 1;
        if (g > i) {
            var k = g;
            g = i,
            i = k
        }
        if (h > j) {
            var k = h;
            h = j,
            j = k
        }
        for (var l = i - g, m = j - h, d = {}, n = g; g + l >= n; n++)
            for (var o = h; h + m >= o; o++)
                d = {},
                d.column = n,
                d.row = o,
                e.push(d);
        return e
    }
    ,
    this.draw = function(a) {
        b.drawGrid(h, g),
        b.drawData(a)
    }
    ,
    this.drawData = function() {
        var d = deepCopy(j, []);
        d.sort(utils.compareArray);
        for (var g = 0; g < d.length; g++) {
            var h = j.indexOf(d[g])
              , k = i[h];
            switch (h + "") {
            case "0":
                b.ctx.fillStyle = "#FF2D11";
                break;
            case "1":
                b.ctx.fillStyle = "#FFE011";
                break;
            case "2":
                b.ctx.fillStyle = "#06C8F9";
                break;
            case "3":
                b.ctx.fillStyle = "#3DFF00"
            }
            a.each(k, function(d, e) {
                a.each(e, function(a, e) {
                    1 == e && b.ctx.fillRect(a * c, d * f, c, f)
                })
            })
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
    ,
    this.moveShape = function() {}
    ,
    this.resizeShape = function() {}
    ,
    this.matrixToNumber = function(c) {
        a.each(c, function(c, d) {
            a.each(d, function(a, d) {
                b.data[0].data[c].Region[a] = parseInt(d.join(""), 2)
            })
        })
    }
    ,
    this.deleteMotionDetect = function(c) {
        if (b.data[0] && b.data[0].data && b.data[0].data.length > 0) {
            if (null == c || void 0 == c)
                b.data[0].data.forEach((b, a) => {
                    for (var c = 0; c < b.Region.length; c++) {
                        b.Region[c] = 0;
                        for (var d = 0; g > d; d++)
                            i[a][c][d] = 0
                    }
                });
            else
                for (var d = 0; d < b.data[0].data[c].Region.length; d++) {
                    b.data[0].data[c].Region[d] = 0;
                    for (var f = 0; g > f; f++)
                        i[c][d][f] = 0
                }
            b.draw(),
            b.data[0].event = {},
            b.data[0].event.type = utils.eventName.deleteFinish,
            utils.eventEnabled && b.eventFunc && b.eventFunc(b.data[0])
        } else {
            var h = {};
            h.event = {},
            h.event.type = utils.eventName.deleteFinish,
            h.data = null,
            utils.eventEnabled && b.eventFunc && b.eventFunc(h)
        }
    }
    ,
    this.setCurrentDrawId = function(a) {
        l = a,
        j[l] = k++,
        b.drawFunc()
    }
}
