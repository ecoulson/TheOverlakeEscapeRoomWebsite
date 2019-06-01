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

// initializes the carousel
function initialize() {
    if (!canInitialize()) {
        throw new Error("Missing slide image URLs, Slide HTML nodes, or number of slides is too small");
    }
    for (let i = 0; i < NumberOfSlides; i++) {
        SlideHtmlNodes[i].style.backgroundImage = `url(${SlideImageUrls[i]})`;
    }
    SlideShowState.timer = setInterval(swapSlide, SecondsPerSlide);
}


// Checks that the programmer has correctly set the number of slides,
// slide urls, and slide nodes
function canInitialize() {
    return NumberOfSlides == SlideImageUrls.length && 
        NumberOfSlides == SlideHtmlNodes.length;
}

// Handler function for when the carousel transitions
function swapSlide() {
    hide();
    if (isLastSlide()) {
        SlideShowState.currentSlideID = 0;
    } else {
        SlideShowState.currentSlideID++;
    }
    show();
}

// Hides the current slide stored in state
function hide() {
    console.log("hide");
}

// Checks if the carousel's state is a last slide state
function isLastSlide() {
    return SlideShowState.currentSlideID == NumberOfSlides - 1;
}

// shows the current slide stored in state
function show() {
    console.log("show");
}

// Actual call to begin the carousel
initialize();