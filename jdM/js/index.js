window.onload = function () {
//    首页搜索效果
    search();
//    轮播图
    banner();
//    倒计时
    downTime();
};

//首页搜索
function search() {
//    获取元素
    var searchBox = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;

//    页面卷曲高度和轮播图高度比较  因为都是webkit，所以不考虑兼容性
    window.onscroll = function () {
        var opacity = 0;
        var scrollTop = document.documentElement.scrollTop;
        if (scrollTop < height) {
            opacity = scrollTop / height * 0.85;
        } else {
            opacity = 0.85;
        }
//    设置透明度
        searchBox.style.background = 'rgba(201,21,35,' + opacity + ')';
    }
}


//轮播图
function banner() {
//自动无缝播放
//    滑动播放
//    滑动距离小于1/3弹回，大于1/3跳过

//    获取元素
    var bannerBox = document.querySelector('.jd_banner ul:first-child');
    var pointBox = document.querySelector('.jd_banner ul:last-child');
    var points = pointBox.querySelectorAll('li');
    var liBox = bannerBox.querySelectorAll('li');
    var width = liBox[0].offsetWidth;
    //添加过渡
    function addTransition() {
        bannerBox.style.transition = 'all 0.2s';
        bannerBox.style.webkitTransition = 'all 0.2s';
    }

//移除过渡
    function removeTransition() {
        bannerBox.style.transition = 'none';
        bannerBox.style.webkitTransition = 'none';
    }

//移动
    function transform(translateX) {
        bannerBox.style.transform = 'translateX(' + translateX + 'px)';
        bannerBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }

//    定时器
    var index = 1;
    var timer = setInterval(function () {
        index++;
        //    过渡
        addTransition();
        //    移动
        transform(-index * width);
    }, 1000);
    //    判断
    bannerBox.addEventListener('transitionend', function () {
        //    最后一张
        if (index >= 9) {
            index = 1;
            //    瞬间转移
            //    清浮动
            removeTransition();
            //    转移
            transform(-index * width);
        }
        else if (index <= 0) {
            index = 8;
            //    瞬间转移
            //    清浮动
            removeTransition();
            //    转移
            transform(-index * width);
        }

        //    设置点样式
        //    index 1-8  对应 0-7
        setPoint();
    });
    //    设置点样式
    function setPoint() {
        for (var i = 0; i < points.length; i++) {
            var obj = points[i];
            //    移除样式
            obj.classList.remove('now');
        }
        //对应点添加样式
        points[index - 1].classList.add('now');
    }

//    手指滑动轮播图
    var startX = 0;
    var translateX = 0;
    bannerBox.addEventListener('touchstart', function (e) {
        //  清除定时器
        clearInterval(timer);
        //    开始触摸位置
        startX = e.touches[0].clientX;

    });
    bannerBox.addEventListener('touchmove', function (e) {
        // 滑动的位置
        var moveX = e.touches[0].clientX;
        translateX = moveX - startX;
        //    清除过渡
        removeTransition();
        //    位置跟着动
        transform(-index * width + translateX);
    });
    bannerBox.addEventListener('touchend', function (e) {
        // 判断是否滑动超过1/3
        if (Math.abs(translateX) < width / 3) {
            addTransition();
            transform(-index * width);
        } else {
            //    判断左滑右滑
            if (translateX > 0) {
                //    右
                index--;
            } else {
                //    左
                index++;
            }
            addTransition();
            transform(-index * width);
        }
        //    重置参数
        startX = 0;
        translateX = 0;
        //添加定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            //    过渡
            addTransition();
            //    移动
            transform(-index * width);
        }, 1000);
    });
}

//倒计时
function downTime() {
//时间
    var time = 2 * 60 * 60;
//    获取元素
    var spanBox = document.querySelector('.time').querySelectorAll('span');
    //定时器
    var timer = setInterval(function () {
        time--;
        //    获取时分秒
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = time % 60;
//    设置时间
        //    时
        spanBox[0].innerHTML = Math.floor(h / 10);
        spanBox[1].innerHTML = h % 10;
        //分
        spanBox[3].innerHTML = Math.floor(m / 10);
        spanBox[4].innerHTML = m % 10;
        //秒
        spanBox[6].innerHTML = Math.floor(s / 10);
        spanBox[7].innerHTML = s % 10;
    }, 1000);

//    清除定时器
    if (time <= 0) {
        clearInterval(timer);
    }
}
