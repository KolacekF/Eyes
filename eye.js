class Eye{
    constructor(border, eyelid, pupil, debuging = false){
        document.addEventListener("mousemove", (e)=>(this.handleMouseMove(e, this))); //mousemove moves the pupil
        document.addEventListener("touchmove", (e)=>(this.handleMouseMove(e.touches[0], this))); //touchmove moves the pupil, because of multitouch its hold in array .touches
        document.addEventListener("resize", ()=>(this.updateLocation(this))); //resize changes the window size
        document.addEventListener("scroll", ()=>(this.updateLocation(this)));//scroll changes position relative to mouse
        
        this.border = border; //html element node
        this.pupil = pupil; //html element node

        this.eyelid = eyelid; //circle in px
        
        this.center = {}; //center of the border element - position in absolute px //gets updated by updateLocation()
        this.windowSize = {}; //size of browser window //gets updated by updateLocation()
        this.lastMouseCords = {}; //to function on page scroll //gets updated by handleMouseMove()

        if (debuging){
            //set style.border to border element
            this.debugingOn();
        }

        this.styling();

        this.updateLocation(); //run once on init to fill other this. values, then by eventTrigger resize | scroll 
    }
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

    handleMouseMove(event, eyeClassInstance){ //eyeClassInstance serves as this, but because of handler on document, it needs to be like this
        //mouseCords.x = event.pageX;
        //mouseCords.y = event.pageY;
        
        //if event = undefined -> called from updateLocation(), pupil is moving when scrolling
        if (event != undefined){
            eyeClassInstance.lastMouseCords.x = event.clientX; //clientX - relative to window position
            eyeClassInstance.lastMouseCords.y = event.clientY;
        }

        //wordly for x and y, to know, what is happening
        let dx = eyeClassInstance.lastMouseCords.x - eyeClassInstance.center.x;
        let dxRelative = dx / eyeClassInstance.windowSize.x;
        let dxFinale = dxRelative * eyeClassInstance.eyelid;
        //the same for y
        let dy = eyeClassInstance.lastMouseCords.y - eyeClassInstance.center.y;
        let dyRelative = dy / eyeClassInstance.windowSize.y;
        let dyFinale = dyRelative * eyeClassInstance.eyelid;

        //setTimeout to give more pleasant movement - Canceled. Done via CSS transition
        setTimeout(() => {
        eyeClassInstance.pupil.style.left = dxFinale +"px"; //FIX FUNCTION, TO ACOMODATE THE this.eyelid BASED ON WINDOW  SIZE
        eyeClassInstance.pupil.style.top = dyFinale +"px";    
        }, 0); //150);


    }
    styling(){
        this.border.style.display = "inline-grid";
        this.border.style.placeItems = "center";
        this.pupil.style.position = "relative";
        //this.pupil.style.borderRadius = "25px"; //unnesessary - only to see if it works
        this.pupil.style.transition = "top 150ms ease-in-out 0s"; //not to jump to new location if mouse draged out of window and then back in
        this.pupil.style.transition = "left 150ms ease-in-out 0s"; //not to jump to new location if mouse draged out of window and then back in
    }
}


export default Eye;