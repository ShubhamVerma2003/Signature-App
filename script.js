const colorpicker = document.getElementById('colorpicker');
const canvascolor = document.getElementById('canvascolor');
const canvas=document.getElementById('mycanvas');
const clearbutton = document.getElementById('clearbutton');
const savebutton = document.getElementById('savebutton');
const fontpicker = document.getElementById('fontpicker');
const retrive = document.getElementById('retrivebutton');
 const ctx = canvas.getContext('2d');

 colorpicker.addEventListener('change', (e)=> {
  ctx.strokeStyle = e.target.value;            // change the color of the stroke to the color selected by the user
  ctx.fillStyle = e.target.value;                // fill the color of the stroke to the color selected by the user 
 });

 canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;                 //  enable drawing  
  lastX= event.offsetX;               // get the x position of the mouse position
  lastY= event.offsetY;               // get the y position of the mouse position
 });

 canvas.addEventListener('mousemove', (e) => {     
  if(isDrawing){                      //if drawing is enabled then draw the line at the current position of the mouse position 
    ctx.beginPath();                // prevent lines from connecting to the canvas before mouse is clicked outside of the canvas 
    ctx.moveTo(lastX, lastY);      // start from the current position of the mouse position  
    ctx.lineTo(event.offsetX, event.offsetY);         // move to the new position of the mouse position after the mouse is clicked 
    ctx.stroke();                               // stroke the line to the current position of the mouse position 
    lastX = event.offsetX;
    lastY = event.offsetY;
  }
 });

  canvas.addEventListener('mouseup', () => {
  isDrawing = false;                                           // if drawing is disabled

 });

 canvascolor.addEventListener('change', (e) => {
  ctx.fillStyle = e.target.value;                                   // change the background color of the canvas to the color selected by the user
  ctx.fillRect(0, 0, 800, 500);                                       // fill the entire canvas with the new background color
 });

 fontpicker.addEventListener('change', (e) => {
  ctx.font = e.target.value;                                          // change the font of the text to the font selected by the user
 });

 clearbutton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);                    // clear the canvas
 });

  savebutton.addEventListener('click', () => {
  localStorage.setItem('savedCanvas', canvas.toDataURL());         // save the canvas to local storage
  let link=document.createElement('a');                           // create a link element
  link.download='canvas.png';                                      // set the download attribute to the link element
  link.href=canvas.toDataURL();                                    // set the href attribute to the link element
  link.click();                                                    // click the link element
  });

  
retrive.addEventListener('click', () => {
  let savedCanvas = localStorage.getItem('savedCanvas');            // retrieve the saved canvas from local storage
  if(savedCanvas){
    let img = new Image();                                            // create a new image element
    img.src = savedCanvas;                                              // set the source attribute of the image element to the saved canvas
    img.onload = () => {                                              // add an event listener to the image element when it finishes loading
      ctx.drawImage(img, 0, 0);                                          // draw the loaded image onto the canvas
    }
  }
});
                
