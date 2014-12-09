'use strict';

/**
 * [Setup your app]
 * @return {[type]} [description]
 */

var mpAPP = function () {
    var
    //Define the selectors
        wrapper = document.querySelector('.wrapper'),
        wrapperRows = wrapper.querySelectorAll('.wrapper__rows'),
        wrapperArrowsRight = document.querySelector('.arrow--right'),
        wrapperArrowsLeft = document.querySelector('.arrow--left'),
        navLinks = document.querySelectorAll('.js-anchor'),
        shareButton = document.querySelectorAll('.js-share'),
        body = document.querySelector('body'),

        //Base
        wrapperRowsWidth = wrapperRows[0].offsetWidth,
        wrapperRowsLength = wrapperRows.length,
        distanceToHome = 0,
        nextPosition = 0,
        rowsLimit = (wrapperRowsLength - 1),
        breakArea = 420,
        mobile = false,
        slugs;

    //If in mobile, change value to true
    if (window.outerWidth < 480) {
        mobile = true;
    }

    var setup = function setup() {
        var urlPath = location.hash,
            helpers = util();

        if (!mobile) {
            wrapper.style.width = ((wrapperRowsWidth * wrapperRowsLength) + breakArea) + 'px';
            wrapper.parentNode.style.height = 'auto';
        }

        //Generate URL Paths
        slugs = helpers.generateSlugs();

        if (urlPath !== '') {
            var index = slugs.array.indexOf(urlPath);

            document.title = urlPath;
            run(index + 1);
            distanceToHome = index + 1;
        }
    };

    /**
     * [helpers description]
     * @return {[type]} [description]
     */
    var util = function util() {
        return {
            supports_history_api: function() {
                return !!(window.history && history.pushState);
            },
            setHistory: function(distanceToHome) {
                //Get the title slug
                var titleSlug = this.getTitleSlugs(distanceToHome);

                //Set the page title
                document.title = titleSlug.title;

                history.pushState({
                    rowNumber: distanceToHome,
                    titleSlug: titleSlug
                }, document.title, titleSlug.slug);

                return false;
            },
            generateSlugs: function() {
                var titlePage = document.querySelectorAll('h1'),
                    slugTitlesArray = [],
                    slugTitlesObject = [],
                    i = 1;
                
                slugTitlesObject = [{
                    title: document.title,
                    slug: '/'
                }];

                for (i; i < titlePage.length; i++) {
                    //Hasgbang Used for Support Github Pages
                    var title = titlePage[i].textContent || titlePage[i].innerText,
                        titleSlug = '#/'+title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

                    //Array for indexOf search
                    slugTitlesArray.push(titleSlug);

                    slugTitlesObject.push({
                        title: title,
                        slug: titleSlug
                    });
                }

                return {
                    object: slugTitlesObject,
                    array: slugTitlesArray
                };
            },
            getTitleSlugs: function(index) {
                if (index >= 0) {
                    return slugs.object[index];
                }

                return slugs.object;
            }
        };
    };

    /**
     * [bindActions description]
     * @return {[type]} [description]
     */
    var bindActions = function bindActions() {
        var navLinksIterate = 0,
            shareLinksIterate = 0;

        document.addEventListener('keydown', function(e) {
            switch (e.keyCode) {
                case 37:
                    prev();
                    break; // Left
                case 39:
                    next();
                    break; // Right
                    //case 38: fb_navigation.scroll_up_down(e); break; // Up
                    //case 40: fb_navigation.scroll_up_down(e); break; // Down
            }
        });

        document.addEventListener('mousemove', function(e) {
            wrapperArrowsRight.style.top = (e.clientY - 28) + 'px';
            wrapperArrowsLeft.style.top = (e.clientY - 28) + 'px';
            e.preventDefault();
        });

        wrapperArrowsRight.addEventListener('click', function() {
            next();
        });

        wrapperArrowsLeft.addEventListener('click', function() {
            prev();
        });

        //Listener popstate function
        window.onpopstate = function(event) {
            if (event.state === null)
                return;

            run(event.state.rowNumber);
            document.title = event.state.titleSlug.title;
        };

        //Bind for share links
        var bindShareLinks = function(index) {
            var shareList = shareButton[index].parentNode.querySelector('.social__list');

            shareButton[index].addEventListener('click', function(e) {
                shareList.style.display = 'block';
                e.stopImmediatePropagation();
            });

            shareList.addEventListener('mouseleave', function(e) {
                shareList.style.display = 'none';
                e.preventDefault();
            });

            return false;
        }

        for (shareLinksIterate; shareLinksIterate < shareButton.length; shareLinksIterate++) {
            bindShareLinks(shareLinksIterate);
        }

        //Bind for navigations links
        var bindNavLinks = function(index) {
            navLinks[index].addEventListener('click', function(e) {
                var target = e.target.getAttribute('target');
                retrievePosts(target);
            });
            return false;
        };

        for (navLinksIterate; navLinksIterate < navLinks.length; navLinksIterate++) {
            bindNavLinks(navLinksIterate);
        }
    };


    /**
     * [retrievePosts description]
     * @param  {[type]} target [description]
     * @return {[type]}        [description]
     */
    var retrievePosts = function retrievePosts(target) {
        var i = 0,
            prevElement = wrapperRows[0];

        for (i; i < wrapperRows.length; i++) {
            //IE8 Support
            if (wrapperRows[i].classList && wrapperRows[i].classList.contains(target)) {
                wrapperRows[i].classList.add("animate");
                prevElement = wrapper.insertBefore(wrapperRows[i], prevElement.nextSibling);
            }
        }
    }

    /**
     * [next description]
     * @return {Function} [description]
     */
    var next = function next(position) {
        if (distanceToHome === rowsLimit) {
            return false;
        } else {
            distanceToHome++;
            run(position);
        }

        return false;
    };

    /**
     * [prev description]
     * @return {[type]} [description]
     */
    var prev = function prev(position) {
        if (distanceToHome === 0) {
            return false;
        } else {
            distanceToHome--;
            run(position);
        }

        return false;
    };

    /**
     * [run description]
     * @param  {[type]} position [description]
     * @return {[type]}          [description]
     */
    var run = function run(position) {
        var helpers = util();

        nextPosition = distanceToHome * wrapperRowsWidth;

        if (position) {
            nextPosition = (position) * wrapperRowsWidth;
        }

        //Set url history
        helpers.setHistory(position || distanceToHome);

        //Where the magic happens
        wrapper.style.webkitTransform = 'translate3d(-' + nextPosition + 'px,0,0)';
        wrapper.style.MozTransform = 'translate3d(-' + nextPosition + 'px,0,0)';

        return false;
    };

    /**
     * [mobileFunctions description]
     * @return {[type]} [description]
     */
    var mobileFunctions = function mobileFunctions() {
        var helpers = util(),
            index = 0;

        window.onscroll = function() {
            if (window.pageYOffset > wrapperRows[index].offsetTop) {
                //Set url history
                helpers.setHistory(index);
                index++;
            }
        };
        return false;
    };

    /**
     * [init description]
     * @return {[type]} [description]
     */
    var init = function() {
        setup();
        bindActions();

        if (mobile) {
            mobileFunctions();
        }

        return false;
    };

    return {
        next: next,
        prev: prev,
        init: init
    };
};