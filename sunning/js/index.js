$(function() {
    //轮播图
//   1.图片无缝连接
//    2.点跟着变
//    3.手势事件
    var $banner = $('.sn_banner');
    var width = $banner.width();

    var $imageBox = $banner.find('ul:first');
    var $pointBox = $banner.find('ul:last');
    var $points=$pointBox.find('li');

//    索引
    var index=1;
    var animation=function(){
        $imageBox.animate({transform: 'translateX('+ -index*width +'px);'},200,function(){
            //    无缝连接
            if(index>=9){
                index=1;
                $imageBox.css("transform","translateX("+ -index*width +"px);}");
            }else if(index<=0){
                index=8;
                $imageBox.css("transform","translateX("+ -index*width +"px);}");
            }

            //    点跟着动
            $points.removeClass('now').eq(index-1).addClass('now');
        });
    };
//    定时器
    var timer=setInterval(function(){
        index++;
        animation();
    },2000);


//    手势事件
    $banner.on('swipeLeft',function(){
        //左滑
        index++;
        animation();
    });
    $banner.on('swipeRight',function(){
        // 右滑
        index--;
        animation();
    });
});
