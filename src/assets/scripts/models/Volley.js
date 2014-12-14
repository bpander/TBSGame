define(function (require) {
    'use strict';

    var Bullet = require('components/Bullet');
    var Rectangle = require('models/Rectangle');


    function Volley (game, piece, targetCell) {

        this.game = game;

        this.piece = piece;

        this.targetCell = targetCell;

        this.angleOfShot;

        this.targetsHit = [];

        this.terminus;

    }

    Volley.RADIANS_IN_A_DEGREE = Math.PI / 180;

    Volley.DEGREES_OF_RANDOMNESS = 5;

    Volley.RADIANS_OF_RANDOMNESS = Volley.DEGREES_OF_RANDOMNESS * Volley.RADIANS_IN_A_DEGREE;


    Volley.prototype.shoot = function () {
        var angleOfShot;
        var cellDimensions = this.piece.cell.element.getBoundingClientRect();
        var positionOfShooter = this.piece.cell.getCenterPoint();
        var positionOfTarget = this.targetCell.getCenterPoint();
        var rangeRectangle;
        var rangeX = this.piece.range * cellDimensions.width;
        var rangeY = this.piece.range * cellDimensions.height;
        var shotEndPoint;

        this.piece.registerVolley();

        rangeRectangle = new Rectangle(positionOfShooter.left, positionOfShooter.top * -1, rangeX * 2, rangeY * 2);
        angleOfShot = this.piece.cell.getAngleTo(this.targetCell) + (Math.random() * Volley.RADIANS_OF_RANDOMNESS - Volley.RADIANS_OF_RANDOMNESS / 2);
        shotEndPoint = rangeRectangle.getSideIntersectionPointFromCenterAngle(angleOfShot);

        return this;
    };


    return Volley;
});
