define(function (require) {
    'use strict';

    var Point = require('models/Point');


    function Rectangle (x, y, width, height) {

        this.x = x;

        this.y = y;

        this.width = width;

        this.height = height;

    }


    Rectangle.prototype.getSideIntersectionPointFromCenterAngle = function (radians) {
        var angleToCorner = Math.atan2(this.width / 2, this.height / 2);
        var angleToCornerOther = Math.PI / 2 - angleToCorner;
        var x;
        var y;
        var cornerNE = angleToCorner;
        var cornerNW = angleToCorner + angleToCornerOther * 2;
        var cornerSW = cornerNE + Math.PI;
        var cornerSE = cornerNW + Math.PI;

        if (radians < 0) {
            radians = 2 * Math.PI + radians;
        }

        if (radians < cornerNE || radians > cornerSE) {
            x = this.width / 2;
            y = x * Math.tan(radians);
        } else if (radians < cornerNW) {
            y = this.height / 2;
            x = y / Math.tan(radians);
        } else if (radians < cornerSW) {
            x = this.width / -2;
            y = x * Math.tan(radians);
        } else {
            y = this.height / -2;
            x = y / Math.tan(radians);
        }

        return new Point(this.x + x, this.y + y);
    };


    return Rectangle;
});
