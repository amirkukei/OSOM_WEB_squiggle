const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let startX;
let startY;
let brushSizes =[5,10,15];
let currentBrushSizeIndex = 0;
let lineWidth = brushSizes[currentBrushSizeIndex];

function openColorPicker() {
      // Open the color picker
    const colorPicker = document.getElementById("colorPicker");
    colorPicker.click();
    }

function toggleBrushSize(){
    currentBrushSizeIndex = (currentBrushSizeIndex + 1) % brushSizes.length;
    let brushSizesStr =["S","M","L"];
    let newBrushSize = brushSizesStr[currentBrushSizeIndex];
    let button = document.getElementById("brush");
      button.textContent = "Brush: " + newBrushSize;
      lineWidth =brushSizes[currentBrushSizeIndex];
}

function handleSaveButtonClick() {
    let data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    fetch('http://127.0.0.1:8000/design/create/', {//here we will write url to API-saveDrawings! localhost just a dummy!
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add any additional headers if required
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        // Request was successful
        console.log('Data saved successfully');
      } else {
        // Handle error response
        console.error('Error saving data');
      }
    })
    .catch(error => {
      // Handle network or other errors
      console.error('Error:', error);
    });
}

function handleLoadButtonClick() {
  // Make a GET request to the server
  fetch('http://127.0.0.1:8000/design/create/')//here we will write url to get API-savedDrawings! localhost just a dummy!
    .then(response => {
      if (response.ok) {
        // Get the response data as JSON
        return response.json();
      } else {
        // Handle error response
        throw new Error('Error loading data');
      }
    })
    .then(data => {
      // Handle the retrieved data
      console.log('Data loaded:', data);
    })
    .catch(error => {
      // Handle network or other errors
      console.error('Error:', error);
    });
}

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (e.target.id==='save'){
        handleSaveButtonClick();
    }
    if (e.target.id ==='load'){
        handleLoadButtonClick();
    }
    if (e.target.id ==='color'){
        openColorPicker();
    }
    if (e.target.id ==='brush'){
        toggleBrushSize();
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'colorPicker') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }

});

const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);
function showAlert(){
    var myText = "squiggleWEAR &copy;OSOM 2023\n squiggle you happy\n wear your art\n brought to you with love by\n amir iakupov\n elena corbeanu \n janella gatmaitan\n";
    alert (myText);
}
function toggleBrushSize(){
    currentBrushSizeIndex = (currentBrushSizeIndex + 1) % brushSizes.length;
    let brushSizesStr =["S","M","L"];
    let newBrushSize = brushSizesStr[currentBrushSizeIndex];
    let button = document.getElementById("brush");
      button.textContent = "Brush: " + newBrushSize;
      lineWidth =brushSizes[currentBrushSizeIndex];
}
