const divClassName = "grid-div";
const gridContainer = document.querySelector(".sketch-pad");

function createGrid(width) {
    for(let i = 1; i <= width**2; i++) {
        window[`div${i}`] = document.createElement("div");
        window[`div${i}`].classList.add(divClassName);
        gridContainer.appendChild(window[`div${i}`]);
    }
}

// hard code this for now but the idea is too call this every time the user changes the size of the pad
createGrid(16);

