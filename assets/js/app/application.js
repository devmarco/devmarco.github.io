// Initialize application
var app = new mpAPP('vars', 'util', 'actions', 'bind', 'teste');

console.log(app);

//Get the modules based on DI
var base    = app.vars,
    actions = app.actions,
    util    = app.util,
    bind    = app.bind;

//The Util module has the 'ready' method that execute features in DOMContentLoaded event
util.ready(function() {
    var urlPath = location.hash;

    //Expose the share`s function
    window.shareFacebook = util.share().facebook;
    window.genericShare = util.share().generic;

    //Generate URL Paths
    base.slugs = util.generateSlugs();

    if (!base.mobile) {

        //Bind DOM Elements
        bind.keydown();
        bind.mouseArrows();
        bind.shareLinks();
        bind.navLinks();

        //Listener popstate function
        window.onpopstate = function(event) {
            if (event.state === null)
                return;

            actions.run(event.state.rowNumber);
            document.title = event.state.titleSlug.title;
        };

        // Turn the presentation fixed
        // Fixed with only css has a bug when used with css3 transform
        var fixedPresentation = window.onscroll = function() {
            var scrollDistance;

            window.pageYOffset > 0 ? scrollDistance = window.pageYOffset : scrollDistance = 0;

            base.aside.style.webkitTransform = 'translate3d(0,' + scrollDistance + 'px,0)';
            base.aside.style.MozTransform = 'translate3d(0,' + scrollDistance + 'px,0)';
        };

        //Set the style of content
        base.wrapper.style.width = ((base.wrapperRowsWidth * base.wrapperRowsLength) + base.breakArea) + 'px';
        base.wrapper.parentNode.style.height = 'auto';

        //Anchor
        if (urlPath !== '') {
            var index = base.slugs.array.indexOf(urlPath);

            document.title = urlPath;
            actions.run(index + 1);
            base.distanceToHome = index + 1;
        }

    };
});
