 /*首页下载板块更新悬浮效果*/
    $(".down-list .type a").hover(function (e) {
        $(".down-list .type .hover").removeClass("hover");
        $(this).addClass("hover");
        /*计算当前应该偏移的高度*/
        var index = $(".down-list .type .hover").index();
        var x = $(".down-list").width() * index + parseInt($(".down-list").css("margin-right")) * index;
        $(".down-list .tpl-tr").css("transform", "translateX(-" + x + "px)");
    });