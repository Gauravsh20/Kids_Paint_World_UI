// Select elements
const colorCircle = document.querySelectorAll(".color-circle");
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Canvas settings (important for smooth drawing)
c.lineCap = "round";
c.lineJoin = "round";

// Default values
let penSize = 5;
let isDrawing = false;
let x = undefined;
let y = undefined;

// Default color
c.fillStyle = "hotpink";
c.strokeStyle = c.fillStyle;

// Better cursor
canvas.style.cursor = "crosshair";

// Mouse events
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

function stopDrawing() {
    isDrawing = false;
    x = undefined;
    y = undefined;
}

// Draw on move
canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    draw(e.offsetX, e.offsetY);
});

// Draw function
function draw(x2, y2) {
    // Draw smooth circle (brush tip)
    c.beginPath();
    c.arc(x2, y2, penSize, 0, Math.PI * 2);
    c.fill();

    // Draw connecting line
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
}

// Draw line
function drawLine(x1, y1, x2, y2) {
    if (x1 === undefined || y1 === undefined) return;

    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = c.fillStyle;
    c.lineWidth = penSize * 2;
    c.stroke();
}

// Clear canvas
function clearCanvas() {
    c.clearRect(0, 0, canvas.width, canvas.height);
}

// Attach clear button safely
const clearBtn = document.querySelector(".clear button");
if (clearBtn) {
    clearBtn.addEventListener("click", clearCanvas);
}

// Select color
function selectColor(elem) {
    removeActiveCircleColor();

    const color = elem.getAttribute("data-color");
    c.fillStyle = color;
    c.strokeStyle = color;

    elem.classList.add("active");
}

// Remove active class
function removeActiveCircleColor() {
    colorCircle.forEach((circle) => {
        circle.classList.remove("active");
    });
}

// Pen size
function penSizeChange(size) {
    penSize = Number(size);
}

// Custom color picker
function favColor(elem) {
    removeActiveCircleColor();

    c.fillStyle = elem.value;
    c.strokeStyle = elem.value;
}

// Apply color from data-color attribute
colorCircle.forEach((circle) => {
    const color = circle.getAttribute("data-color");
    circle.style.backgroundColor = color;
});

// Save image (improved)
const saveBtn = document.querySelector("a");
if (saveBtn) {
    saveBtn.addEventListener("click", (e) => {
        const image = canvas.toDataURL("image/png");
        e.target.href = image;
        e.target.download = "painting-" + Date.now() + ".png";
    });
}