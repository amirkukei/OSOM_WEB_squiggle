
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
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
    const drawingData = canvas.toDataURL();

    fetch('/save_canvas/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ drawing_data: drawingData }),
    })
        .then(response => response.json())
        .then(data => {
            // Processing the response from the server
            if (data.success) {
                console.log('The drawing is saved in the users gallery.');
                // Output a message about successful save
                window.location.href = '/gallery/';
            } else if (data.error) {
                console.error('Error saving picture:', data.error);

            }
        })
        .catch(error => {
            console.error('Error while executing AJAX request:', error);
        });
}

function handleLoadButtonClick() {
    /*fetch('load_drawings/')
        .then(response=>response.json()).then(data => {
        data.forEach(drawingData=> {
            let image = new Image();

            image.src =drawingData.drawing_data;

            image.onload=function(){
                ctx.drawImage(image, 0, 0);
            };
        });
    })*/

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
    if (e.target.id ==='backgroundColor'){
        bgColor();
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
function showAlert() {
     var myText = "\n\nsquiggleWEAR © OSOM 2023\n\n\n            squiggle you happy\n\n        wear your art\n\n\nbrought to you with love by\n    amir iakupov\n    elena corbeanu \n    janella gatmaitan\n";
      alert (myText);
 //   location.href = '/squiggle/about.html'
}
 function onSignIn(googleUser) {
     id_token = googleUser.getAuthResponse().id_token;

}function bgColor(){


             fetch('/get_background_color')
                 .then(response => response.json())
                 .then(data => {
                     const backgroundColor = data.background_color;
                     ctx.fillStyle = backgroundColor;
                     ctx.fillRect(0, 0, canvas.width, canvas.height);
                 })
                 .catch(error => {
                     console.log('Error:', error);
                 });

}




