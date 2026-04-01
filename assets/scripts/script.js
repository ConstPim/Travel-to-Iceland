$(document).ready(function () {
    new WOW().init(); /*Анимации*/

// Слайдер 1
    const programSwiper = new Swiper('.program .swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        effect: "fade",
        fadeEffect: {crossFade: true},
        loop: true,

        navigation: {
            nextEl: ".program-arrow-next",
            prevEl: ".program-arrow-prev",
        },
    });

// Слайдер 2
    const swiper = new Swiper('.reviews .swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        effect: "fade",
        fadeEffect: {crossFade: true},
        loop: true,

        navigation: {
            nextEl: ".reviews-arrow-next",
            prevEl: ".reviews-arrow-prev",
        },
    });






    // Валидация
    let loader = $('.loader');
    let phone = $('#phone');


    phone.on('input', function () {
        let currentValue = phone.val();

        currentValue = currentValue.replace(/[^0-9+]/g, '');

        if (currentValue.indexOf('+') > 0) {
            currentValue = currentValue.replace(/\+/g, '');
        }

        phone.val(currentValue);
    });

    $('#submit').click(function (e) {
        e.preventDefault(); //Это у ИИ спросил, если честно не понимаю почему в других ДЗ без этого метода работало, а в этой нет
        let name = $('#name');
        let peopleCount = $('input[name="people"]:checked').val();
        let hasError = false;

        $('.error-message').text(''); // Очищаем все сообщения об ошибках
        $('.form-input').removeClass('error'); // Убираем красные рамки


        if (!name.val()) {
            $('#nameError').text('Имя обязательно для заполнения.');
            name.addClass('error');
            hasError = true;
        }
        if (!phone.val()) {
            $('#phoneError').text('Введите номер телефона.');
            phone.addClass('error');
            hasError = true;
        }


        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {people: peopleCount, name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    let order = $('.form-order');
                    let thanks = $('.thanks');
                    loader.hide();
                    if (msg.success) {
                        order.addClass('animate__bounceOut');
                        setTimeout(() => {
                            order.css('display', 'none');
                            thanks.show().addClass('animate__bounceIn').css('display', 'flex');
                        }, 1000)


                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                    console.log(msg);
                });
        }
    })

    // Видео

    let video = $('.video-placeholder');
    const videoContainer = $('.video-container');
    video.click(function playVideo() {
        video.addClass('hidden');
        videoContainer.removeClass('hidden');
    })


    // Адаптив слайдера gallery
    //

    // function updateSlider() {
    //
    //     const isMobile = $(window).width() <= 768;
    //     const wrapper = $('.gallery .swiper-wrapper');
    //     const links = $('.gal-img');
    //     const oldSlides = $('.gallery .swiper-slide');
    //     if (isMobile) {
    //
    //         if (wrapper.length && links.length) {
    //             links.addClass('swiper-slide').appendTo(wrapper);
    //             oldSlides.not('.gal-img').remove();
    //             gallerySwiper.update();
    //         }
    //
    //     } else {
    //         const wrapperAp = $('.gallery .swiper-wrapper');
    //         const linksAp = wrapperAp.find('.gal-img');
    //
    //         // Очищаем контейнер
    //         wrapperAp.empty();
    //
    //         // Группируем элементы по 5
    //         for (let i = 0; i < linksAp.length; i += 5) {
    //             // Создаем слайд и сетку
    //             const slide = $('<div class="swiper-slide"></div>');
    //             const grid = $('<div class="gallery-grid"></div>');
    //
    //             // Вырезаем 5 элементов
    //             const chunk = linksAp.slice(i, i + 5);
    //
    //             // Очищаем элементы от мусорных стилей/классов Swiper и добавляем в сетку
    //             chunk.each(function() {
    //                 $(this).removeAttr('style')
    //                 .removeClass('swiper-slide swiper-slide-active swiper-slide-next swiper-slide-visible swiper-slide-fully-visible');
    //                 grid.append($(this));
    //             });
    //
    //             slide.append(grid);
    //             wrapperAp.append(slide);
    //         // const $wrapper = $('.gallery .swiper-wrapper');
    //         // const $items = $wrapper.find('.gal-img');
    //         //
    //         // // Очищаем контейнер
    //         // $wrapper.empty();
    //         //
    //         // // Группируем элементы по 5
    //         // for (let i = 0; i < $items.length; i += 5) {
    //         //     // Создаем слайд и сетку
    //         //     const $slide = $('<div class="swiper-slide"></div>');
    //         //     const $grid = $('<div class="gallery-grid"></div>');
    //         //
    //         //     // Вырезаем 5 элементов
    //         //     const $chunk = $items.slice(i, i + 5);
    //         //
    //         //     $chunk.each(function() {
    //         //         $(this).removeAttr('style')
    //         //             .removeClass('swiper-slide swiper-slide-active swiper-slide-next swiper-slide-visible swiper-slide-fully-visible');
    //         //         $grid.append($(this));
    //         //     });
    //         //
    //         //     $slide.append($grid);
    //         //     $wrapper.append($slide);
    //         };
    //         gallerySwiper.update();
    //     }
    //
    //
    // }


    // Слайдер 3
    let gallerySwiper;
    function initGallerySwiper() {
        // Если слайдер уже существует удаляем его перед созданием нового
        if (gallerySwiper) {
            gallerySwiper.destroy(true, true);
        }
        gallerySwiper = new Swiper('.gallery-swiper', {
            slidesPerView: 1,
            loop: true,
            spaceBetween: 30,
            effect: "fade",
            fadeEffect: {crossFade: true},

            pagination: {
                el: '.gallery-pagination',
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 4
            },

            navigation: {
                nextEl: '.gallery-arrow-next',
                prevEl: '.gallery-arrow-prev',
            },
        });
    }
    let lastMode = null; // Флаг для отслеживания текущего режима (mobile/desktop)

    function updateSlider() {
        const width = $(window).width();
        const isMobile = width <= 768;

        // Проверяем, изменился ли режим. Если нет — ничего не делаем.
        if (isMobile === lastMode) return;
        lastMode = isMobile;

        const $wrapper = $('.gallery .swiper-wrapper');
        // Ищем картинки везде в галерее, чтобы не потерять их при перестроении
        const $links = $('.gallery').find('.gal-img');

        if (!$wrapper.length || !$links.length) return;

        if (isMobile) {
            // --- РЕЖИМ MOBILE ---
            // Делаем все картинки в wrapper как отдельные слайды
            $links.addClass('swiper-slide').removeAttr('style').appendTo($wrapper);
            // Удаляем пустые сетки и старые слайды-контейнеры
            $wrapper.children().not('.gal-img').remove();

        } else {
            // --- РЕЖИМ DESKTOP ---
            $wrapper.empty();

            for (let i = 0; i < $links.length; i += 5) {
                const $slide = $('<div class="swiper-slide"></div>');
                const $grid = $('<div class="gallery-grid"></div>');
                const $chunk = $links.slice(i, i + 5);

                $chunk.each(function() {
                    $(this).removeAttr('style')
                        .removeClass('swiper-slide swiper-slide-active swiper-slide-next swiper-slide-visible swiper-slide-fully-visible');
                    $grid.append($(this));
                });

                $slide.append($grid);
                $wrapper.append($slide);
            }
        }

        initGallerySwiper(); // Заново создаем слайдер
    }


// Запуск при ресайзе (с небольшой задержкой для оптимизации)
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateSlider, 100);
    });


updateSlider();


// Бургер
let menu = $('#menu');
$('#burger').click(function () {
    menu.addClass('menu-open');
    console.log('menu open');
});

menu.find('*').click(function () {
    menu.removeClass('menu-open');
});

// Увеличение картинок
    $('.gal-img').magnificPopup({
        type: 'image'
    });

})
;