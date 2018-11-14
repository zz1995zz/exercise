// ajax请求
$(function () {
    // 轮播图
    banner();
    //标签页
    initMobileTap();
    //工具提示
    $('[data-toggle="tooltip"]').tooltip();
});
var banner = function () {
    //数据缓存
    var getData = function (callback) {
        if (window.data) {
            callback && callback(window.data);
        } else {
            $.ajax({
                url: "js/package.json",
                type: "get",
                data: {},
                dataType: "json",
                success: function (data) {
                    window.data = data;
                    callback && callback(window.data);
                }
            });
        }
    };
    var render = function () {
        getData(function (data) {
            //    判断屏幕大小
            var isMobile = $(window).width() < 768 ? true : false;
            //   点和图片html字符串
            var pointBox = template('pointTemplate', {list: data});
            var imgBox = template('imgTemplate', {list: data, isMobile: isMobile});

            //    渲染到页面中
            $('.carousel-indicators').html(pointBox);
            $('.carousel-inner').html(imgBox);
        });
    };

//    功能测试 监听屏幕变化
    $(window).on('resize', function () {
            render();
        })
        //主动触发第一次
        .trigger('resize');

    //移动端手势切换事件
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    //jq中的e是封装过的，e.originalEvent得到js原生事件对象
    $('.wjs_banner').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend', function (e) {
        if (isMove && Math.abs(distanceX) > 50) {
            //    判断左滑右滑
            if (distanceX < 0) {
                //    左滑
                $('.carousel').carousel('next');
            } else {
                //    右滑
                $('.carousel').carousel('prev');
            }
        }

        //    重置参数
        startX = 0;
        distanceX = 0;
        isMove = false;
    });

};

//初始标签页
var initMobileTap = function () {
    var ulWidth = 0;
//解决换行
    $('.nav-tabs').find('li').each(function (i, item) {
        var liWidth = $(this).outerWidth(true);
        ulWidth += liWidth;
    });
    $('.nav-tabs').width(ulWidth);

// 能够滑动
    new IScroll($('.nav-tabs-parent')[0], {
        scrollX: true,
        scrollY: false,
        click: true
    });
};



