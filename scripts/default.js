var myBarChart = null;
var chartHtml = null;
var prevScrollTop = 0;
var headerHeight = 81;
var screen50 = 0;
var screen10 = 0;
var isAnimating = false;
var afterAnimation = false;
var isMobile = false;

function mobile(){
    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
    return isMobile;
}

function scrollTextEffect() {
    $('article:not(.chart-article) section').each(function(index, el){
        var viewPortHeight = $(window).height();
        var yPage = $(window).scrollTop();
        var sc = $(el);
        var cell = sc.parent();
        var height = cell.height();
        var whole = (height - 2) - (sc.height() - 2);
        var frontier = whole / 2;
        var cellTop = cell.offset().top;
        var cellBottom = cellTop + height;
        var viewPortBottom = yPage + viewPortHeight;

        if (viewPortBottom + 500 > cellBottom && cellTop > (yPage + headerHeight - 500)) {
            var viewPortHeight = viewPortBottom - (yPage + headerHeight + height);
            var diff = viewPortBottom - cellBottom;
            var realDiff = (viewPortHeight - diff);
            var percentage = realDiff / viewPortHeight * 100;
            var step = percentage * whole / 100;
            var top = -1 * (frontier - step);
            sc.css({top: top.toString() + 'px'});
        }
    });
}

function shiftingChart() {
    var yPage = $(window).scrollTop();
    //var chartTop = $('.chart-article').offset().top;
    //var chartBottom = chartTop + $('.chart-article').height();
    //if ((yPage + 600) < chartTop || (yPage + 400) > chartBottom){
    //    return;
    //}

    var sc = $('.chart-item-box')
    var parent = sc.parent();
    var containerTop = parent.offset().top;
    var pHeight = parent.height();
    var pBottom = containerTop + pHeight;

    var iHeight = sc.height();

    var frontier = (yPage + headerHeight + 50);

    if (frontier > containerTop && frontier < (pBottom - iHeight))
    {
        sc.css({position: 'fixed', top: (headerHeight + 50).toString() + 'px'});
    }
    else{
        sc.css({position: 'relative', top: (frontier >= (pBottom - iHeight) ? (pHeight - iHeight) : 0).toString() + 'px'});
    }
}

function scrollButtonsEffect(){
    var yPage = $(window).scrollTop();
    var viewPortHeight = $(window).height();
    var chartTop = $('.chart-article').offset().top;
    var chartBottom = chartTop + $('.chart-article').height();
    var yBottom = (yPage + viewPortHeight);
    if (yBottom < chartTop || yPage > chartBottom){
        return;
    }

    if (!isAnimating && yBottom > chartTop + 90 + screen50) {
        isAnimating = true;
        $('.button-box').each(function(ind, itm){
            $(itm).delay(ind * 100).animate({left: 0, opacity: 1}, 500, 'easeInExpo', function(){
                if (ind > 3) {
                    afterAnimation = true;
                }
            });
        });
    }
    if (afterAnimation && yBottom > chartTop + 100 + screen50){
        $('.button-box').css({left: 0, opacity: 1});
        return;
    }

    if (!afterAnimation) return;

    var wholeStep = 50;
    $('.button-box').each(function(ind,itm){
       var i = $(itm);
       var iTop = i.offset().top;
       var iHeight = i.height();
       var iBottom = iTop + iHeight;
       if (yBottom > iBottom + (ind * iHeight) - 300 && yBottom < (iBottom + (ind+1)* iHeight) + 300)
       {
           var diff = (iBottom + (ind+2)* iHeight) - (yBottom + iHeight - screen10);
           var percentage = diff / iHeight * 100;
           percentage = percentage > 100 ? 100 : (percentage < 0 ? 0 : percentage);
           var step = percentage * wholeStep / 100;
           i.css({left: step.toString() + 'px', opacity:1-(percentage / 100)});
       }
    });
}

function followActiveMenu(animation) {
    var activeMenu = $('.menu-item a.active');
    var width = activeMenu.width();
    var left = activeMenu.offset().left;
    if (animation){
        $('.active-menu').animate({left:left,width:width}, {queue:true, duration: 100});
    }
    else {
        $('.active-menu').css({left: left, width: width});
    }
}

$(document).ready(function(){
    isMobile = mobile();
    var viewPortHeight = $(window).height();
    headerHeight = $('.header').height();
    screen50 = viewPortHeight * 50 / 100;
    screen10 = viewPortHeight * 10 / 100;

    chartHtml = $('.chart').html();
    scrollTextEffect(false);

    // initialize chart
    $('#simpleStructData').addClass('active')
    var data = benchmark.getData('XS');
    var ctx = document.getElementById("benchmark").getContext("2d");
    myBarChart = new Chart(ctx).Bar(data.chartData, {
        multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
    });

    $(window).load(function(){
        $('.menu-item a[href="#intro"]').addClass('active');
        var intro = $('.menu-item a.active');
        var introWidth = intro.width();
        var introLeft = intro.offset().left;
        $('.active-menu').css({left:introLeft, width: introWidth});
    });

    $(window).resize(function(){
        screen50 = viewPortHeight * 50 / 100;
        screen10 = viewPortHeight * 10 / 100;
        followActiveMenu();
    });

    $('.menu-item').on('click', function(e){
        _gaq.push(['_trackEvent', 'HeaderMenu', 'Click', $(this).find('a').text()]);
    });

    $('.menu-item').on('mouseenter', function(e){
        if ($(this).find('.title-block').length > 0) return;
        var ref = $(this).find('a');
        var width = ref.width();
        var left = ref.offset().left;
        $('.active-menu').animate({left:left,width:width}, {queue:true, duration: 100});
    });

    $('.menus').on('mouseleave', function(e){
        followActiveMenu(true);
    });

    if (isMobile) {
        $('article:not(.chart-article) section').css({top:0});
        $('.button-box').css({left: 0, opacity: 1});

    }

    $(document).scroll(function(e){
        var yPage = $(window).scrollTop();
        var links = $('a[name]').toArray();
        for(var i = 0; i < links.length; i++){
            var lnk = $(links[i]);
            var frontier = lnk.offset().top - 300;
            var height = lnk.closest('article').height();
            var bottomY = lnk.offset().top + height - 350;

            if (yPage > frontier && yPage < bottomY){
                if ($('.header a.active').length > 0 && $('.header a.active').attr('href').indexOf(lnk.attr('name')) > -1) break;
                $('.header a').removeClass('active');
                $('.header a[href=#'+lnk.attr('name')+']').addClass('active');
                $('#home').removeClass();
                $('#home').addClass(lnk.attr('name') + (yPage < prevScrollTop ? '-reverse' : ''));
                followActiveMenu(true);
                break;
            }
        }
        if (!isMobile) {
            scrollTextEffect();
            scrollButtonsEffect();
            shiftingChart();
            prevScrollTop = $(window).scrollTop();
        }
    });

    $('.mail a').on('click', function(e){
        _gaq.push(['_trackEvent', 'ContactUs', 'Click', 'Email']);
    });

    $('.bench-test-button').on('click', function(e){
        _gaq.push(['_trackEvent', 'BenchmarkChart', 'TestChange', $(this).text()]);
        $('.bench-test-button').removeClass('active');
        $(this).addClass('active');
        var data = benchmark.getData($(this).attr('id'));
        if (myBarChart){
            myBarChart.clear();
            myBarChart.destroy();
        }
        $('.chart').replaceWith($(chartHtml));
        $('.chart-article .chart-text').removeClass('active');
        $('.chart-article .chart-text[name='+ $(this).attr('id') +']').addClass('active');

        var scrollTo = $('a[name=benchmarks]').offset().top - headerHeight;
        $('body').animate({scrollTop: scrollTo}, 300, 'swing');

        var ctx = document.getElementById("benchmark").getContext("2d");
        myBarChart = new Chart(ctx).Bar(data.chartData, {
            multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
        });
    });
});