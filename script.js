const clearButton = document.getElementById("clear-button");
const gridButton = document.getElementById("grid-button");
const colorPicker = document.getElementById("color-picker");
const gridSizeInput = document.getElementById("grid-size");

// Mouse over functionality taken from https://github.com/michalosman/etch-a-sketch/blob/master/script.js
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const createGrid = (sideLength) => {
  const gridContainer = document.getElementById("grid-container");

  for (let i = 0; i < sideLength; ++i) {
    const gridRowContainer = document.createElement("div");
    gridRowContainer.classList.add("grid-row");
    for (let j = 0; j < sideLength; ++j) {
      const gridRowItem = document.createElement("div");
      gridRowItem.classList.add("grid-item");
      gridRowItem.classList.add("grid-item--border");
      gridRowItem.style.backgroundColor = "#d4d4d8";

      // Create an object to store the rgb values of the color, start value is black
      const rgbColor = {
        r: 0,
        g: 0,
        b: 0,
      };

      addColorShadeToGridItem(gridRowItem, rgbColor);

      gridRowContainer.appendChild(gridRowItem);
    }
    gridContainer.appendChild(gridRowContainer);
  }
};

const addColorShadeToGridItem = (gridRowItem, rgbColor) => {
  let opacity = 0;
  // Change the color of the div when the mouse hovers over it to a darker shade by changing the opacity
  gridRowItem.addEventListener("mouseover", () => {
    if (mouseDown && opacity < 10) {
      opacity++;
      const newColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${
        opacity / 10
      })`;
      gridRowItem.style.backgroundColor = newColor;
    }
  });
};

const clearGrid = () => {
  console.log("Clearing grid");
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((gridItem) => (gridItem.style.backgroundColor = "#d4d4d8"));
};

const addGridToScreen = () => {
  console.log("Toggle grid to screen");
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    item.classList.toggle("grid-item--border");
  });
};

// Function to convert hex to rgb taken from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const changeColor = (newColor) => {
  console.log("Changing color");
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    addColorShadeToGridItem(item, newColor);
  });
};

const changeGridSize = (newSize) => {
  console.log("Changing grid size");
  const gridContainer = document.getElementById("grid-container");
  gridContainer.innerHTML = "";
  createGrid(newSize);
};

clearButton.addEventListener("click", clearGrid);

gridButton.addEventListener("click", addGridToScreen);

colorPicker.addEventListener("change", (e) => {
  const newColor = e.target.value;
  console.log(`New color: ${newColor}`);
  const convertColorToRgb = hexToRgb(newColor);
  changeColor(convertColorToRgb);
});

gridSizeInput.addEventListener("change", (e) => {
  const newSize = e.target.value;
  console.log(`New grid size: ${newSize}`);
  changeGridSize(newSize);
});

gridSizeInput.addEventListener("mousemove", (e) => {
  const currentGridSize = document.getElementById("current-size");
  const newSize = gridSizeInput.value;
  currentGridSize.textContent = `${newSize}x${newSize}`;
});

window.onload = () => {
  createGrid(50);
};
