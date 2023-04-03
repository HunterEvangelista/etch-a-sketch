const divClassName = "grid-div";
const gridContainer = document.querySelector(".sketch-frame"); // this is returning null
let gridHeight = 16
let gridLength = 16
let gridArray = []
let gridCount = gridHeight * gridLength;

for(let i = 1; i <= gridCount; i++) {
    // eval(`let div${i} = document.createElement("div");`)
    // // eval(`div${i}.classList.add('${divClassName}');`);
    // eval(`gridArray.push(div${i});`)
    window[`div${i}`] = document.createElement("div");
    window[`div${i}`].classList.add(divClassName);
    // gridArray.push(window[`div${i}`]);
    gridContainer.appendChild(window[`div${i}`]);

}

// gridContainer.appendChild(window)
// for(i = 0; i < gridArray.length; i++) {
//     gridContainer.appendChild(window[`${gridArray[i]}`]);
// }