if (!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    $("body").before('<div id="fps" style="z-index:10000;opacity: 0.9;color: var(--font-color);font-size:12px;position:fixed;font-weight:bold;"></div>');
    var showFPS = function() {
        var e, t, n, o, i, r = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
            window.setTimeout(e, 1e3 / 60)
        }
        ;
        e = 0,
        t = Date.now(),
        o = function() {
            n = Date.now() - t,
            e += 1,
            n >= 1e3 && (t += n,
            i(e),
            e = 0),
            r(o)
        }
        ,
        i = function(e) {
            $("#fps").html(e + "FPS")
        }
        ,
        o()
    }();
    let e = $("#rightMenu").width()
      , t = $("#rightMenu").height();
    window.oncontextmenu = function(n) {
        if (n.ctrlKey)
            return !0;
        $(".rightMenu-group.hide").hide(),
        document.getSelection().toString() && $("#menu-text").show(),
        "INPUT" != document.activeElement.tagName && "TEXTAREA" != document.activeElement.tagName || $("#menu-read").show();
        let o = n.clientX + 10
          , i = n.clientY;
        return o + e > window.innerWidth && (o -= e),
        i + t > window.innerHeight && (i -= t),
        kk.showRightMenu(!0, i, o),
        !1
    }
}