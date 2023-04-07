const divClassName = 'grid-div';
const gridContainer = document.querySelector('.sketch-pad');
const body = document.querySelector('body');
const resetButton = document.querySelector('.reset');
const randomColorButton = document.querySelector('.random-color');
let opacity = 1;
const defaultColor = `rgba(0, 0, 0, ${opacity})`;
const opacityButton = document.querySelector('.opacity');
let randColorSetting = false;
let opacitySetting = false;
let paintColor = defaultColor;

function createGrid(width) {
  for (let i = 1; i <= width ** 2; i += 1) {
    window[`div${i}`] = document.createElement('div');
    window[`div${i}`].classList.add(divClassName);
    window[`div${i}`].classList.add('1');
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
  return `rgba(${randomInt(256)}, ${randomInt(256)}, ${randomInt(256)}, ${opacity})`;
}

function handleRandomColorClick() {
  randomColorButton.classList.toggle('clicked');
  if (randColorSetting === true) {
    randColorSetting = false;
  } else if (randColorSetting === false) {
    randColorSetting = true;
  }
}

function handleOpacityClick() {
  opacityButton.classList.toggle('clicked');
  if (opacitySetting) {
    opacitySetting = false;
    opacity = 1;
  } else if (!opacitySetting) {
    opacity = 0.02;
    opacitySetting = true;
  }
}

function setBrushColor() {
  if (randColorSetting) {
    paintColor = randomPaintColor();
  } else {
    paintColor = `rgba(0, 0, 0, ${opacity})`;
  }
}

function dragDraw(e) {
  // track times a div has been "painted" by updating the last class of every grid div
  // gradually move away from transparent over 15 interactions
  const workingElement = document.getElementById(e.target.id);
  const lastClass = e.target.classList.item(e.target.classList.length - 1);
  if (opacitySetting && parseInt(lastClass, 10) < 15) {
    workingElement.classList.remove(`${lastClass}`);
    workingElement.classList.add(`${parseInt(lastClass, 10) + 1}`);
    opacity = (
      0.07 * parseInt(workingElement.classList.item(workingElement.classList.length - 1), 10)
    );
  } else {
    opacity = 1;
  }
  setBrushColor();
  workingElement.setAttribute('style', `background-color: ${paintColor};`);
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

randomColorButton.addEventListener('click', handleRandomColorClick);

resetButton.addEventListener('click', () => {
  gridDivs.forEach((element) => {
    element.setAttribute('style', 'background-color: white;');
    if (randColorSetting === true) handleRandomColorClick();
    if (opacitySetting === true) handleOpacityClick();
  });
});

opacityButton.addEventListener('click', handleOpacityClick);
