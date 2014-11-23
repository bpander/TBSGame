define(function (require) {
    'use strict';

    var EventEmitter = require('EventEmitter');
    var UIControl = require('components/UIControl');
    var UIReadout = require('components/UIReadout');


    function UI () {
        EventEmitter.call(this);

        this.element = document.createElement('div');

        this.guardControl = new UIControl('Guard');

        this.apReadout = new UIReadout('Action Points', '0');

        this.skipControl = new UIControl('Skip');

        this._onSkipControlClick = UI._onSkipControlClick.bind(this);

        this.init();
    }
    UI.prototype = Object.create(EventEmitter.prototype);
    UI.prototype.constructor = UI;


    UI.EVENT_NAME = {
        SKIP_REQUEST: 'ui:skipRequest'
    };


    UI._onSkipControlClick = function () {
        this.trigger(UI.EVENT_NAME.SKIP_REQUEST);
    };


    UI.prototype.init = function () {
        this.element.classList.add('ui');
        this.element.appendChild(this.guardControl.element);
        this.element.appendChild(this.apReadout.element);
        this.element.appendChild(this.skipControl.element);

        this.apReadout.element.classList.add('mix-ui-control_center');
        this.skipControl.element.classList.add('mix-ui-control_right');

        this.skipControl.element.addEventListener('click', this._onSkipControlClick);

        return this;
    };


    return UI;
});
