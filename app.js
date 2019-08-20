function init() {
    const slide = document.querySelectorAll('.slide');
    const pages = document.querySelectorAll('.page');
    const backgrounds = [
        'radial-gradient(1560.00px at 50% -31.44%, #08364A 0%, #2D444D 100%);',
        'radial-gradient(1267.00px at 50% -4.31%, #8E0A0A 0%, #4E3E3E 100%)',
        'radial-gradient(1267.00px at 50% -4.31%, #39342F 0%, #7A6E6E 100%)'
    ];

    //Tracker
    let current = 0;
    let scrollSlide = 0;

    slide.forEach((slide, index) => {
        slide.addEventListener("click", function () {
            changeDots(this);
            nextSlide(index);
            scrollSlide = index;
        });
    });

    function changeDots(dot) {
        slide.forEach(slide => {
            slide.classList.remove('active');
        });
        dot.classList.add('active');
    }

    function nextSlide(pageNumber) {
        const nextPage = pages[pageNumber];
        const currentPage = pages[current];
        const nextLeft = nextPage.querySelector('.hero .model-left')
        const nextRight = nextPage.querySelector('.hero .model-right')
        const currentLeft = currentPage.querySelector('.hero .model-left')
        const currentRight = currentPage.querySelector('.hero .model-right')
        const nextText = nextPage.querySelector('.details');
        const portfolio = document.querySelector('.portfolio');



        const tl = new TimelineMax({
            onStart: function(){
                slide.forEach(slide => {
                    slide.style.pointerEvents = 'none';
                });
            },
            onComplete: function() {
                slide.forEach(slide => {
                    slide.style.pointerEvents = 'all';
                })
            }
        });

        tl.fromTo(currentLeft, 0.3, { y: "-10%" }, { y: "-100%" })
            .fromTo(currentRight, 0.3, { y: "10%" }, { y: "-100%" }, "-=0.2")
            .to(portfolio, 0.3, {backgroundImage: backgrounds[pageNumber]})
            .fromTo(
                currentPage,
                0.3,
                {opacity: 1, pointerEvents: "all"},
                {opacity:0, pointerEvents: "none"}
            )
            .fromTo(
                nextPage,
                0.3,
                {opacity: 0, pointerEvents: "none"},
                {opacity: 1, pointerEvents: "all"},
            )
            .fromTo(
                nextLeft,
                0.3,
                {y:'-100%'},
                {y:'-10%'},
                '-=0.4'
            )
            .fromTo(
                nextRight,
                0.3,
                { y: '-100%' },
                { y: '10%' },
                '-=0.6'
            )
            .fromTo(
                nextText,
                0.3,
                {opacity: 0, y: -30},
                {opacity: 1, y: 0},
                // '-=0.3'
            )
            .set(
                nextLeft,
                {clearProps: 'all'}
            )
            .set(
                nextRight,
                { clearProps: 'all' }
            )

        current = pageNumber;
    }

    // Detect scroll
    document.addEventListener("wheel", throttle(scrollChange, 1500));
    document.addEventListener("touchmove", throttle(scrollChange, 1500));

    function switchDots(dotNumber) {
        const activeDot = document.querySelectorAll(".slide")[dotNumber];
        slide.forEach(slide => {
            slide.classList.remove("active");
        });
        activeDot.classList.add("active");
    }

    function scrollChange(e) {
        if(e.deltaY > 0){
            scrollSlide +=1;
        } else {
            scrollSlide -=1;
        }

        if(scrollSlide > 2) {
            scrollSlide = 0;
        }
        if(scrollSlide < 0) {
            scrollSlide = 2;
        }
        nextSlide(scrollSlide);
        switchDots(scrollSlide);
        console.log(scrollSlide)
    };
};



function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

init();