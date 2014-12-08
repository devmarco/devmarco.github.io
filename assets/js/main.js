//Function for share posts
var shareFunction = (function shareFunction() {
    window.shareThis = function(postUrl) {
        var left = (screen.width - 700) / 2,
            top = (screen.height - 500) / 4,
            url = postUrl.split(".")[1].toLowerCase();

        window.open(postUrl, "Compartilhar", "width=700, height=500, top=" + top + ", left=" + left + ", scrollbars=yes, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no");
    };
}());


//Init Application
var app = mpAPP();
app.init();
