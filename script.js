const divClassName = 'grid-div';
const gridContainer = document.querySelector('.sketch-pad');
const body = document.querySelector('body');

function createGrid(width) {
  for (let i = 1; i <= width ** 2; i += 1) {
    window[`div${i}`] = document.createElement('div');
    window[`div${i}`].classList.add(divClassName);
    window[`div${i}`].setAttribute('id', i);
    gridContainer.appendChild(window[`div${i}`]);
  }
}

// hard code this for now but the idea is too call this every
// time the user changes the size of the pad
createGrid(16);

// add an event listener that takes a click as an action and
// changes the background color of whatever div was targeted
// for now just set the background color to black
// get all elements that fall under the specified class
const gridDivs = document.querySelectorAll(`.${divClassName}`);

// iterate through node list to apply event listener
// need to handle drag vs. click
// we can set a variable to false and when we clock a div it sets the drag to True
// when clicked or dragging with the var == true then change the background color
// when mouse comes up set the drag var to false

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
