document.addEventListener('DOMContentLoaded', function () {
    var slider = document.querySelector('.js_slider');
    var slideCount = slider.querySelectorAll('.js_slide').length;
    var dotContainer = slider.querySelector('.slider_navigation_dots');
    var templateListItem = document.createElement('li');

    function handleEvents(e) {
        console.log(e);
        if (e.type === 'before.lory.init') {
            for (var i = 0, len = slideCount; i < len; i++) {
                var clone = templateListItem.cloneNode();
                dotContainer.appendChild(clone);
            }
            dotContainer.childNodes[0].classList.add('active');
        }
        if (e.type === 'after.lory.init') {
            for (var i = 0, len = slideCount; i < len; i++) {
                dotContainer.childNodes[i].addEventListener('click', function (e) {
                    lorySlider.slideTo(Array.prototype.indexOf.call(dotContainer.childNodes, e.target));
                });
            }
        }
        if (e.type === 'after.lory.slide') {
            for (var i = 0, len = dotContainer.childNodes.length; i < len; i++) {
                dotContainer.childNodes[i].classList.remove('active');
            }
            dotContainer.childNodes[e.detail.currentSlide - 1].classList.add('active');
        }
    }

    slider.addEventListener('before.lory.init', handleEvents);
    slider.addEventListener('after.lory.init', handleEvents);
    slider.addEventListener('after.lory.slide', handleEvents);

    var lorySlider = lory(slider, {
        infinite: 1,
        enableMouseEvents: true,
        slideSpeed: 1000
    });

    // http://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
    var stop = false;
    var frameCount = 0;
    var fps, fpsInterval, startTime, now, then, elapsed;

    function startAnimating(fps) {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        animate();
    }

    function animate() {
        requestAnimationFrame(animate);

        now = Date.now();
        elapsed = now - then;

        if (elapsed > fpsInterval) {
            then = now - elapsed % fpsInterval;

            lorySlider.next();
        }
    }

    startAnimating(.15);

    // mouseover 
    slider.addEventListener('mouseover', function (e) {
        console.log('pause');
    });

    // mouseout
    slider.addEventListener('mouseout', function (e) {
        console.log('resume');
        console.log('maybe reset timer');
    });
});