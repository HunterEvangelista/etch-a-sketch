const divClassName = 'grid-div';
const gridContainer = document.querySelector('.sketch-pad');
const body = document.querySelector('body');
const reset = document.querySelector('.reset');

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

function dragDraw(e) {
  document.getElementById(e.target.id).setAttribute('style', 'background-color: black;');
}

function stopDragDraw() {
  gridDivs.forEach((element) => {
    element.removeEventListener('mousemove', dragDraw);
  });
}

body.addEventListener('mouseup', stopDragDraw);

gridDivs.forEach((element) => {
  element.addEventListener('mousedown', () => {
    element.setAttribute('style', 'background-color: black;');
    gridDivs.forEach((div) => {
      div.addEventListener('mousemove', dragDraw);
    });
  });
});

reset.addEventListener('click', () => {
  gridDivs.forEach((element) => {
    element.setAttribute('style', 'background-color: white;');
  });
});
