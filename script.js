const divClassName = 'grid-div';
const gridContainer = document.querySelector('.sketch-pad');
const body = document.querySelector('body');
const reset = document.querySelector('.reset');
const randomColorButton = document.querySelector('.random-color');
const defaultColor = 'rgba(0, 0, 0, 1)';
let randColorSetting = false;
let paintColor = defaultColor;

function createGrid(width) {
  for (let i = 1; i <= width ** 2; i += 1) {
    window[`div${i}`] = document.createElement('div');
    window[`div${i}`].classList.add(divClassName);
    window[`div${i}`].setAttribute('id', i);
    gridContainer.appendChild(window[`div${i}`]);
  }
}

createGrid(16);

const gridDivs = document.querySelectorAll(`.${divClassName}`);

function randomInt(limit) {
  return Math.floor(Math.random() * (limit + 1));
}

function randomPaintColor() {
  return `rgba(${randomInt(256)}, ${randomInt(256)}, ${randomInt(256)}, 1)`;
}

function handleRandomColorClick() {
  randomColorButton.classList.toggle('clicked');
  if (randColorSetting === true) {
    randColorSetting = false;
  } else if (randColorSetting === false) {
    randColorSetting = true;
  }
}

function setBrushColor() {
  if (randColorSetting) {
    paintColor = randomPaintColor();
  } else {
    paintColor = 'rgb(0, 0, 0)';
  }
}

function dragDraw(e) {
  setBrushColor();
  document.getElementById(e.target.id).setAttribute('style', `background-color: ${paintColor};`);
}
function stopDragDraw() {
  gridDivs.forEach((element) => {
    element.removeEventListener('mousemove', dragDraw);
  });
}

body.addEventListener('mouseup', stopDragDraw);

gridDivs.forEach((element) => {
  element.addEventListener('mousedown', () => {
    element.setAttribute('style', `background-color: ${paintColor};`);
    gridDivs.forEach((div) => {
      div.addEventListener('mousemove', dragDraw);
    });
  });
});

// how do we get this inserted into the initial draw process?
// this function needs to fire off everytime a color is applied
// different brush functionality could be a toggle
// click random color
// button gets a new class applied to it
// class gives a visual indication it was clicked
// can do this with a variable that is true or false indicating its state

randomColorButton.addEventListener('click', handleRandomColorClick);

reset.addEventListener('click', () => {
  gridDivs.forEach((element) => {
    element.setAttribute('style', 'background-color: white;');
    if (randColorSetting === true) handleRandomColorClick();
  });
});
