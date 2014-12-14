'use strict';

/**
 * [Util]
 * @return supports_history_api [description]
 * @return setHistory [description]
 * @return generateSlugs [description]
 * @return getTitleSlugs [description]
 * @return ready [description]
 */

var mpAPP = mpAPP || {};

mpAPP.prototype.exports.util = function(_this) {
    var base = _this.vars;

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
                    titleSlug = '#/' + title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

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
                return base.slugs.object[index];
            }

            return base.slugs.object;
        },
        share: function() {
            return {
                facebook: function(link, caption, description) {
                    FB.ui({
                        method: 'feed',
                        link: link,
                        picture: 'http://devmarco.github.io/assets/imgs/logo/devmarco-fb.jpg',
                        caption: caption,
                        description: description
                    });
                },
                generic: function(postUrl) {
                    var left = (screen.width - 700) / 2,
                        top = (screen.height - 500) / 4,
                        url = postUrl.split(".")[1].toLowerCase();

                    window.open(postUrl, "Compartilhar", "width=700, height=500, top=" + top + ", left=" + left + ", scrollbars=yes, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no");
                }
            }
        },
        ready: function(fn) {
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', fn);
            } else {
                document.attachEvent('onreadystatechange', function() {
                    if (document.readyState === 'interactive')
                        fn();
                });
            }
        }
    };
};
