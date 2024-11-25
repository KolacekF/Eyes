class Eye{
    constructor(border, eyelid, pupil, debuging = false){
        document.addEventListener("mousemove", (e)=>(this.handleMouseMove(e, this))); //mousemove moves the pupil
        document.addEventListener("resize", ()=>(this.updateLocation(this))); //resize changes the window size
        document.addEventListener("scroll", ()=>(this.updateLocation(this)));//scroll changes position relative to mouse
        
        this.border = border; //html element node
        this.pupil = pupil; //html element node

        this.eyelid = eyelid; //circle in px
        this.center = {}; //center of the border element - position in absolute px //gets updated by updateLocation
        this.windowSize = {}; //size of browser window //gets updated by updateLocation

        this.lastMouseCords = {};
        
        if (debuging){
            //set style.border to border element
            this.debugingOn();
        }

        this.styling();

        this.updateLocation();
    }
//put default value parameter as in handleMouseMove; add event listener for widnow resize and put this method to update values if window is resized; test if no errors
    updateLocation(eyeClassInstance = this){ //eyeClassInstance server as this, but because of handler on document, it needs to be like this
        let elemRect = this.border.getBoundingClientRect();
        let height = parseInt(this.border.offsetHeight);
        let width = parseInt(this.border.offsetWidth);

        //let center = [];
        //center[0] = elemRect.top + height / 2;
        //center[1] = elemRect.left + width / 2;
        
        //this.center = center;
        //this.center[0] = elemRect.top + height / 2;
        //this.center[1] = elemRect.left + width / 2;
        eyeClassInstance.center.x = elemRect.left + width / 2;
        eyeClassInstance.center.y =  elemRect.top + height /2;

        //this.windowSize[0] = window.innerHeight;
        //this.windowSize[1] = window.innerWidth;
        eyeClassInstance.windowSize.x = window.innerWidth;
        eyeClassInstance.windowSize.y = window.innerHeight;

        this.handleMouseMove(undefined, this);
    }
    debugingOn(){
        //show border for outer box (=this.border)
        this.border.style.border = "solid";
    }

    handleMouseMove(event, eyeClassInstance){ //eyeClassInstance server as this, but because of handler on document, it needs to be like this

        //mouseCords.x = event.pageX;
        //mouseCords.y = event.pageY;
        if (event != undefined){
            eyeClassInstance.lastMouseCords.x = event.clientX;
            eyeClassInstance.lastMouseCords.y = event.clientY;
        }

        let dx = eyeClassInstance.lastMouseCords.x - eyeClassInstance.center.x;
        let dxRelative = dx / eyeClassInstance.windowSize.x;
        let dxFinale = dxRelative * eyeClassInstance.eyelid;

        let dy = eyeClassInstance.lastMouseCords.y - eyeClassInstance.center.y;
        let dyRelative = dy / eyeClassInstance.windowSize.y;
        let dyFinale = dyRelative * eyeClassInstance.eyelid;

        eyeClassInstance.pupil.style.left = dxFinale +"px"; //FIX FUNCTION, TO ACOMODATE THE this.eyelid BASED ON WINDOW  SIZE
        eyeClassInstance.pupil.style.top = dyFinale +"px";
    }
    styling(){
        this.border.style.display = "inline-grid";
        this.border.style.placeItems = "center";
        this.pupil.style.position = "relative";
        this.pupil.style.borderRadius = "25px"; //unnesessary - only to see if it works
    }
}


export default Eye;