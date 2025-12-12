
import PhotoSwipeLightbox from 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/photoswipe-lightbox.esm.min.js';
import PhotoSwipeSlideshow from '/assets/js/photoswipe-slideshow.esm.js';


function initPhotoSwipe() {
    //console.log('initPhotoSwipe activeData', activeData);
    var psData = [];
    for (var i = 0; i < activeData.length; i++) { 
        var src = activeData[i].SrcSet; //.replace('cdn2', 'cdn8');
        var obj = { src: src, iid: activeData[i].ImagesId, vid: activeData[i].VideosId, fiid: activeData[i].FolderImagesId, originalFileName: activeData[i].OriginalFileName, width: activeData[i].Width, height: activeData[i].Height, videoUrl: activeData[i].VideoUrl };
        //if (activeData[i].ImagesId && activeData[i].ImagesId != '') //images only, no video
            psData.push(obj);

        //else
        //    psData.push({ fiid: activeData[i].FolderImagesId, html: '<p>video</p>' });
    }
    //photoSwiper.pswp.options.dataSource = psData;

    //console.log('psData', psData);

    if (photoSwiper) {
        photoSwiper.destroy();
        photoSwiper = null;
    }

    photoSwiper = new PhotoSwipeLightbox({
        //gallery: '#divGrid',
        //children: '.grid-item',
        dataSource: psData,
        //showHideAnimationType: 'none',
        history: false,
        showAnimationDuration: 400,
        padding: { top: (document.documentElement.clientWidth < 900 ? 50 : 0), bottom: (document.documentElement.clientWidth < 900 ? 50 : 0) },
        //below function is flaky on ios:
        //paddingFn: (viewportSize, itemData, index) => {
        //    if (window.location.href.indexOf('test-for-slideshow') > 0) {
        //        $('#Xyz').remove();
        //        var msg = $('.pswp__zoom-wrap:visible').attr('style'); // viewportSize.x;
        //        $('body').append('<div id="Xyz" style="position: fixed; z-index: 999999; bottom: 10px; left: 10px;">' + msg + '</div>');
        //    }

        //    console.log('viewportSize.x', viewportSize.x);
        //    return {
        //        // check based on viewport size
        //        top: viewportSize.x < 900 ? 50 : 0,

        //        // check based on viewport size
        //        bottom: viewportSize.x < 900 ? 50 : 0,

        //        // check based on image size
        //        left: 0,

        //        right: 0
        //    }
        //},
        pswpModule: () => import('https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/photoswipe.esm.min.js')
    });
    psSlideshow = new PhotoSwipeSlideshow(photoSwiper, {
        // Plugin options, for example:
        defaultDelayMs: 4000, // 4 sec
        progressBarPosition: 'bottom',
    });

    // override slide content for videos
    photoSwiper.on('contentLoad', (e) => {
        const { content } = e;
        //console.log('contentload', content.data);
        if (content.data.vid) {
            // prevent the deafult behavior
            e.preventDefault();

            // Create a container for iframe
            // and assign it to the `content.element` property
            content.element = document.createElement('div');
            content.element.className = 'pswp__video-container';

            const iframe = document.createElement('iframe');
            //iframe.setAttribute('allow', 'accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.setAttribute('onload', 'hidePageSpinner();');
            //iframe.setAttribute('loading', 'lazy');
            iframe.src = 'about:blank';
            content.element.appendChild(iframe);
            iframe.src = content.data.videoUrl;

            // Mark as loading, then immediately as loaded
            // (or call onLoaded() in iframe.onload if you want to wait)
            content.state = 'loading';
            // Prevent spinner: mark as loaded right away
            content.onLoaded();
        }
    });

    photoSwiper.on('uiRegister', function () {
        //console.log('registering...');    
        psOptions();
    });

    photoSwiper.on('openingAnimationEnd', () => {
        //if (window.actionClicked) {
        //    photoSwiper.pswp.close();
        //    window.actionClicked = false;
        //    return false;
        //}
    });

    photoSwiper.on('change', (x) => {
        //console.log('photoSwiper currSlide', photoSwiper.pswp.currSlide.data.element);
    });

    photoSwiper.on('close', () => {
        // PhotoSwipe starts to close, unbind most events here
        //console.log('close');
        $('body').removeClass('noscroll');
        pushHistory();
    });

    photoSwiper.on('afterInit', () => {
        //console.log('afterInit');
        // photoswipe fully initialized and opening transition is running (if available)
        //$('.pswp__button--zoom').remove(); //.addClass('ps-button');
        $('.pswp__button--zoom').addClass('ps-button');
        $('.pswp__button--zoom svg').replaceWith('<i class="fal fa-magnifying-glass-plus"></i>');
        $('.pswp__button--close').addClass('ps-button');
        $('.pswp__button--close svg').replaceWith('<i class="fal fa-xmark"></i>');

        if ($('.pswp__button--close.lc').length == 0) {
            var b = $('.pswp__button--close').clone();
            b.insertBefore('.pswp__counter').addClass('lc').attr('onclick', 'photoSwiper.pswp.close();');
            b.find('i').replaceWith('<i class="fal fa-arrow-left"></i>')
        }
    });

    photoSwiper.on('contentActivate', ({ content }) => {
        // content starts to load 
        // can be default prevented
        // assign elements to `content.element`
        //console.log('contentActivate', content);
        $('.pswp').removeAttr('tabindex'); //this blocks inputs
        $('body').addClass('noscroll');
        //var s = content.data.element;
        //thisIid = $(s).attr('data-iid');
        //thisFiid = $(s).attr('data-fiid');
        //thisGridItem = $(s);

        var img = $(content.element);
        //console.log('ps img', img);
        if (content.data.iid) {
            var src = img.attr('src').replace('cdn2', 'cdn8');
            img.attr('data-src', src).addClass('lazyload');
            img.attr('alt', content.data.originalFileName);
            $('.pswp__button--zoom').show();
        }
        else {
            console.log('this is video ' + content.data.vid);
            $('.pswp__button--zoom').hide();
            $('.pswp__preloader').css('opacity','0');
        }


        thisIid = content.data.iid;
        thisVid = content.data.vid;
        thisFiid = content.data.fiid;
        //console.log('contentActivate thisFiid', thisFiid);

        toggleModalSpecificCount(thisFiid);
        $('#ulComments').html('<li>Loading...</li>'); //reset comments
        CallAjax('FolderImageActivities_SaveView', { 'collectionsGuid': $('[id$="hfCollectionsGuid"]').val(), 'folderImagesId': thisFiid }, loadImageDetails);
        //
        pushHistory(thisFiid);        
    });
}


window.initPhotoSwipe = initPhotoSwipe;


