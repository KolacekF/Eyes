const message = () => {
    const name = "Jesse";
    const age = 40;
    return name + ' is ' + age + ' years old.';
    };

//Take (element), Return its position {top, left}
export const ElementPosition = (e) => {
    let elemRect = e.getBoundingClientRect();
    let top = elemRect.top;
    let left = elemRect.left;
    return({top, left});
}

//Take event (mouseMove), return x and y coordinates
export function MouseMove(event){
//    console.log(event);
    let x = event.pageX;
    let y = event.pageY;
    return({x, y});
}
//add event listeners and event handlers (=take return value from MouseMove(event) and put it in innerHTML of "p4" and "p5")
document.onmousemove = HandleMouseMove;
function HandleMouseMove(event){
    let mouseCords = MouseMove(event);
    document.getElementById("p4").innerHTML = mouseCords.x;
    document.getElementById("p5").innerHTML = mouseCords.y;
    EyeUpdate(mouseCords.x, mouseCords.y);
    
    //GetElement("p4", mouseCords.x);
    //GetElement("p5", mouseCords.y);
}


let eye_box = document.getElementById("eye_box");
let eye_center = document.getElementById("eye_center");

eye_box.style.position = "relative";
eye_center.style.position = "absolute";

function EyeUpdate(x, y){
    //eye_center.setAttribute("top", x+"px");
    //eye_center.setAttribute("left", y+"px");
    eye_center.style.top = x+"px";
    eye_center.style.left = y+"px";
}


    
//export default ElementPosition;