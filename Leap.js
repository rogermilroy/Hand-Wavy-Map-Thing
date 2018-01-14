
function Leap(type) {
    this.previousFrame = null;
    this.openMenu = false;

    this.screenGrabbed = false;
    this.startVector = null;
    this.endVector = null;

    this.controllerOptions = {enableGestures: true};


    this.mapMovement = function mapMovement(frame) {
        if (frame.hands.length > 0) {
            for (var i = 0; i < frame.hands.length; i++) {
                var hand = frame.hands[i];
                if (!screenGrabbed) {
                    if (hand.grabStrength === 1) {
                        screenGrabbed = true;
                        startVector = hand.palmPosition;
                        console.log("Screen Grabbed: " + screenGrabbed);
                        console.log("Grab Start Vector: " + startVector);
                    }
                }

                if (screenGrabbed) {
                    if (hand.grabStrength === 0) {
                        screenGrabbed = false;
                        endVector = hand.palmPosition;
                        console.log("Screen Grabbed: " + screenGrabbed);
                        console.log("Grab End Vector:" + endVector);
                    }
                }
            }
        }
        //TODO Do Something to move the map
    };

    this.menuGestures = function menuGestures(frame) {
        if (frame.gestures.length > 0) {
            // check if there are 2 hands. Print to verify. Just to test!!
            for (var i = 0; i < frame.gestures.length; i++) {
                var gesture = frame.gestures[i];
                if (gesture.type === "swipe") {
                    if (gesture.direction[1] < -0.2 && gesture.direction[0] < 0.2 && gesture.direction[0] > -0.2) {
                        //Opens menu
                        openMenu = true;
                        console.log("Open Menu");
                        //TODO open menu
                    }
                }

                if (gesture.type === "keyTap" && openMenu) {
                    console.log("Clicked");
                    //TODO click menu item
                }
            }
        }

    };

    function vectorToString(vector, digits) {
        if (typeof digits === "undefined") {
            digits = 1;
        }
        return "(" + vector[0].toFixed(digits) + ", "
            + vector[1].toFixed(digits) + ", "
            + vector[2].toFixed(digits) + ")";
    }

    function togglePause() {
        paused = !paused;

        if (paused) {
            document.getElementById("pause").innerText = "Resume";
        } else {
            document.getElementById("pause").innerText = "Pause";
        }
    }

    function pauseForGestures() {
        if (document.getElementById("pauseOnGesture").checked) {
            pauseOnGesture = true;
        } else {
            pauseOnGesture = false;
        }
    }

    function hasTwoHands(frame) {
        return frame.hands.length === 2;
    }
}

