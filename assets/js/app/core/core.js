'use strict';

/**
 * [APP Core]
 * Author: Marco Paulo
 * @return {[false]}
 *
 * This pattern is a experience
 * I tried to create a simple module pattern that works with DI (Dependency Injection)
 * Enjoy =D
 */

var mpAPP = mpAPP || {};

//Initialize
mpAPP = function() {
    var i = 0;

    for (i in arguments) {
    	//If arguments is a function
    	if (typeof Object.getPrototypeOf(this).exports[arguments[i]] === 'function') {
    		this[arguments[i]] = Object.getPrototypeOf(this).exports[arguments[i]](this);
    	}

    	//If argument is a object
    	if (typeof Object.getPrototypeOf(this).exports[arguments[i]] === 'object') {
    		this[arguments[i]] = Object.getPrototypeOf(this).exports[arguments[i]];
    	}
    }

    return false;
}

//Expose exports class
mpAPP.prototype.exports = function(a) {
    return this;
}
