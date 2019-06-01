const SecondsPerTransition = 500;
const BlockDisplayDelayTime = 200;
const SlideIDPrefix = "slide-";
const RootID = "carousel";
const SlideShowRootNode = document.getElementById(RootID);

// Convoluated way of saying 5 seconds per side plus the amount 
// of time to transition from the previous slide to the next slide
const SecondsPerSlide = 5 * 1000 + 2 * SecondsPerTransition; 

const SlideImageUrls = [
    "assets/images/maze.jpg",
    "assets/images/secondroom.jpg"
]

const SlideShowState = {
    currentSlideID: 0,
    timer: null,
    slideNodes: []
}

// initializes the carousel
async function initialize() {
    initializeNodes();
    await show();
    SlideShowState.timer = setInterval(swapSlide, SecondsPerSlide);
}

// Initializes nodes and adds them to the slideshow state
function initializeNodes() {
    for (let i = 0; i < SlideImageUrls.length; i++) {
        const slideID = i + 1;
        const node = createNode(slideID);
        styleNode(node, SlideImageUrls[i]);
        SlideShowState.slideNodes.push(node);
    }
}

// Creates a node from a slide ID
function createNode(slideID) {
    const node = document.createElement("div");
    node.id = `${SlideIDPrefix}${slideID}`;
    node.className = "slide";
    SlideShowRootNode.appendChild(node);
    return node;
}

// Styles the initialized slide nodes with slide images, transition, and opacity
function styleNode(node, imageURL) {
    node.style.backgroundImage = `url(${imageURL})`;
    node.style.opacity = 0;
    node.style.transition = `opacity ${SecondsPerTransition}ms ease`;
}

// Handler function for when the carousel transitions
async function swapSlide() {
    await hide();
    if (isLastSlide()) {
        SlideShowState.currentSlideID = 0;
    } else {
        SlideShowState.currentSlideID++;
    }
    await show();
}

// Hides the current slide stored in state
async function hide() {
    await transitionSlide(0);
    getCurrentSlideNode().style.display = "none";
}

// Stalls the program until the transition is completed
async function transitionSlide(opacity) {
    return new Promise((resolve) => {
        setOpactiy(getCurrentSlideNode(), opacity);
        setTimeout(resolve, SecondsPerTransition);
    });
}

// Gets the current slide stored in state
function getCurrentSlideNode() {
    return SlideShowState.slideNodes[SlideShowState.currentSlideID];
}

// Sets the opacity of a passed node to a passed value
function setOpactiy(node, value) {
    node.style.opacity = value;
}

// Checks if the carousel's state is a last slide state
function isLastSlide() {
    return SlideShowState.currentSlideID == SlideImageUrls.length - 1;
}

// shows the current slide stored in state
async function show() {
    getCurrentSlideNode().style.display = "block";
    setTimeout(async () => {
        await transitionSlide(1);
    }, BlockDisplayDelayTime);
}

// Actual call to begin the carousel
initialize();