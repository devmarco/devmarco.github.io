'use strict';

/**
 * [Bind actions]
 */

var mpAPP = mpAPP || {};

mpAPP.prototype.exports.bind = function(_this) {
    var base = _this.vars,
        actions = _this.actions;

    return {
        keydown: function() {
            document.addEventListener('keydown', function(e) {
                switch (e.keyCode) {
                    case 37:
                        actions.prev();
                        break; // Left
                    case 39:
                        actions.next();
                        break; // Right
                        //case 38: fb_navigation.scroll_up_down(e); break; // Up
                        //case 40: fb_navigation.scroll_up_down(e); break; // Down
                }
            });
        },
        mouseArrows: function() {
            document.addEventListener('mousemove', function(e) {
                base.wrapperArrowsRight.style.top = (e.clientY - 28) + 'px';
                base.wrapperArrowsLeft.style.top = (e.clientY - 28) + 'px';
                e.preventDefault();
            });

            base.wrapperArrowsRight.addEventListener('click', function() {
                actions.next();
            });

            base.wrapperArrowsLeft.addEventListener('click', function() {
                actions.prev();
            });
        },
        shareLinks: function() {
            var shareLinksIterate = 0,
                bindShareLinks;

            //Bind for share links
            bindShareLinks = function(index) {
                var shareList = base.shareButton[index].parentNode.querySelector('.social__list');

                base.shareButton[index].addEventListener('click', function(e) {
                    shareList.style.display = 'block';
                    e.stopImmediatePropagation();
                });

                shareList.addEventListener('mouseleave', function(e) {
                    shareList.style.display = 'none';
                    e.preventDefault();
                });

                return false;
            }

            for (shareLinksIterate; shareLinksIterate < base.shareButton.length; shareLinksIterate++) {
                bindShareLinks(shareLinksIterate);
            }
        },
        navLinks: function() {
            var navLinksIterate = 0,
                bindNavLinks;

            //Bind for navigations links
            bindNavLinks = function(index) {
                base.navLinks[index].addEventListener('click', function(e) {
                    var target = e.target.getAttribute('target');
                    actions.retrievePosts(target);
                });
                return false;
            };

            for (navLinksIterate; navLinksIterate < base.navLinks.length; navLinksIterate++) {
                bindNavLinks(navLinksIterate);
            }
        }
    }
}
