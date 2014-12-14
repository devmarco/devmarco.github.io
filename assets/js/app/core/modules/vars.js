'use strict';

/**
 * [Setup your app]
 * @return {[type]} [description]
 */

var mpAPP = mpAPP || {};



mpAPP.prototype.exports.vars = function () {
	var vars = {};

	//Selectors variables
    vars.wrapper = document.querySelector('.wrapper');
    vars.wrapperRows = vars.wrapper.querySelectorAll('.wrapper__rows');
    vars.wrapperArrowsRight = document.querySelector('.arrow--right');
    vars.wrapperArrowsLeft = document.querySelector('.arrow--left');
    vars.navLinks = document.querySelectorAll('.js-anchor');
    vars.shareButton = document.querySelectorAll('.js-share');
    vars.body = document.querySelector('body');
    vars.aside = document.querySelector('.wrapper').querySelector('.content');

    //Base variables
    vars.wrapperRowsWidth = vars.wrapperRows[0].offsetWidth;
    vars.wrapperRowsLength = vars.wrapperRows.length;
    vars.distanceToHome = 0;
    vars.nextPosition = 0;
    vars.rowsLimit = (vars.wrapperRowsLength - 1);
    vars.breakArea = 420;
    vars.mobile = (window.outerWidth < 480 ? true : false);
    vars.slugs = [];

    return vars;
}
