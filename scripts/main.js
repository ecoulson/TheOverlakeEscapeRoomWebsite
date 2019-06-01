const NumberOfSlides = 1;
const SecondsPerSlide = 5 * 1000;

const SlideImageUrls = [
    "assets/images/maze.jpg"
]

const SlideHtmlNodes = [
    document.getElementById("slide-1")
];

const SlideShowState = {
    currentSlideID: 0,
    timer: null
}

function initialize() {
    if (!canInitialize()) {
        throw new Error("Missing slide image URLs, Slide HTML nodes, or number of slides is too small");
    }
    for (let i = 0; i < NumberOfSlides; i++) {
        SlideHtmlNodes[i].style.backgroundImage = `url(${SlideImageUrls[i]})`;
    }
    SlideShowState.timer = setInterval(swapSlide, SecondsPerSlide);
}

function canInitialize() {
    return NumberOfSlides == SlideImageUrls.length && 
        NumberOfSlides == SlideHtmlNodes.length;
}

function swapSlide() {
    console.log("swap");
}

initialize();