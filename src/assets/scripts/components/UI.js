define(function (require) {
    'use strict';

    var UIControl = require('components/UIControl');
    var UIReadout = require('components/UIReadout');


    function UI () {

        this.element = document.createElement('div');

        this.guardControl = new UIControl('Guard');

        this.apReadout = new UIReadout('Action Points', '0');

        this.skipControl = new UIControl('Skip');

        this.init();
    }


    UI.prototype.init = function () {
        this.element.classList.add('ui');
        this.element.appendChild(this.guardControl.element);
        this.element.appendChild(this.apReadout.element);
        this.element.appendChild(this.skipControl.element);

        this.apReadout.element.classList.add('mix-ui-control_center');
        this.skipControl.element.classList.add('mix-ui-control_right');

        return this;
    };


    return UI;
});
