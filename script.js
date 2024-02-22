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

window.onload = () => {
  createGrid(50);
};
