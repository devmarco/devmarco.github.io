'use strict';

/**
 * [Prev]
 * @parameter {[position]}
 */

var mpAPP = mpAPP || {};

mpAPP.prototype.exports.actions = function(_this) {
    var base = _this.vars;

    return {
        run: function(position) {
            base.nextPosition = base.distanceToHome * base.wrapperRowsWidth;

            if (position) {
                base.nextPosition = (position) * base.wrapperRowsWidth;
            }

            //Set url history
            util.setHistory(position || base.distanceToHome);

            //Where the magic happens
            base.wrapper.style.webkitTransform = 'translate3d(-' + base.nextPosition + 'px,0,0)';
            base.wrapper.style.MozTransform = 'translate3d(-' + base.nextPosition + 'px,0,0)';

            return false;
        },
        next: function(position) {
            if (base.distanceToHome === base.rowsLimit) {
                return false;
            } else {
                base.distanceToHome++;
                this.run(position);
            }

            return false;
        },
        prev: function(position) {
            if (base.distanceToHome === 0) {
                return false;
            } else {
                base.distanceToHome--;
                this.run(position);
            }

            return false;
        },
        retrievePosts: function(target) {
            var i = 0,
                prevElement = base.wrapperRows[0];

            for (i; i < base.wrapperRows.length; i++) {
                //IE8 Support
                if (base.wrapperRows[i].classList && base.wrapperRows[i].classList.contains(target)) {
                    base.wrapperRows[i].classList.add("animate");
                    prevElement = base.wrapper.insertBefore(base.wrapperRows[i], prevElement.nextSibling);
                }
            }
        }
    }
}
