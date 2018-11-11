/**
 * Created by Administrator on 2018/11/10.
 */
window.onload = function () {

    document.querySelector('.jd_cateLeft').addEventListener('touchmove', function (e) {

        e.preventDefault();

    });
    document.querySelector('.jd_cateRight').addEventListener('touchmove', function (e) {

        e.preventDefault();

    });
    //区域滚动效果
    new IScroll(document.querySelector('.jd_cateLeft'), {
        scrollX: false,
        scrollY: true
    });
    new IScroll(document.querySelector('.jd_cateRight'), {
        scrollX: true,
        scrollY: true
    });
};

