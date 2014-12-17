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
        var type = (typeof Object.getPrototypeOf(this).exports[arguments[i]]),
            module = Object.getPrototypeOf(this).exports[arguments[i]];

        //If arguments is a function
        if (type === 'function') {
            this[arguments[i]] = module(this);
        }

        //If argument is a object
        if (type === 'object') {
            this[arguments[i]] = module;
        }

        //Show a warning if the module does not exist.
        if (type !== 'function' && type !== 'object')
            console.warn(arguments[i] + ': was required, but does not exist a module associated.');
    }
    return false;
}

// Expose exports method
// This is just a wrapper for expose exports method.
mpAPP.prototype.exports = function() {
    return false;
}
