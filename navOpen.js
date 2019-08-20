function navOpen() {



    const button = document.querySelector(".menu");
    const hamburgerLines = document.querySelectorAll(".menu line");
    const navOpen = document.querySelector(".nav-open");
    const contact = document.querySelector(".contact");
    const social = document.querySelector(".social");
    const logo = document.querySelector(".logo");

    const tl = new TimelineMax({ paused: true, reversed: true });

    tl.to(
        navOpen,
        0.1, { y: 0 })
        .fromTo(
            contact,
            0.3,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0 },
            "-=0.1"
        )
        .fromTo(
            navOpen,
            0.4,
            { opacity: 0, pointerEvents: "none", y: -80 },
            { opacity: 1, pointerEvents: "auto", y: 0 },
            "-=0.1"
        )
        .fromTo(
            social,
            0.8,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0 },
            "-=0.5"
        )
        .fromTo(
            logo,
            0.8,
            { color: "white" },
            { color: "black" },
            "-=1"
        )
        .fromTo(
            hamburgerLines,
            0.8,
            { stroke: "white" },
            { stroke: "black" },
            "-=1"
        )
        .fromTo(
            navOpen,
            0.3,
            { display: "none" },
            { display: "grid" },
            "-=0.5"
        )

    console.log(button);
    button.addEventListener("click", function () {
        tl.reversed() ? tl.play() : tl.reverse();
    });
    button.addEventListener("click", function () {
        console.log("XD");
    });

    console.log(button);
}

navOpen();