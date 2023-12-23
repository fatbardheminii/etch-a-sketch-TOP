const gridWrapper = document.querySelector('#grid-wrapper');
const gridSizeRange = document.querySelector('#grid-size-range');
const gridDivColor = document.querySelector('#grid-div-color');
const gridDivBgColor = document.querySelector("#grid-div-bg-color");
const rainbowColor = document.querySelector("#rainbow-color");
const deleteColor = document.querySelector("#delete-color");
const addBorders = document.querySelector("#add-borders");
const deleteBorders = document.querySelector("#delete-borders");
const darkenColor = document.querySelector("#darken-color");
const lightenColor = document.querySelector('#lighten-color');
const rangeSize = document.querySelector('.range-size');

// fill Area with div for etch-a-sketch
function fillGridArea(size){
     for (let i = 0; i < size.value * size.value; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.toggle('grid-item');
        gridItem.style.cssText = `border:1px solid black;display:inline-block;background-color:${gridDivBgColor.value}`;
        gridItem.addEventListener("mouseenter", () => changeColor(gridItem));
        gridWrapper.appendChild(gridItem);
    }
}

//set grid layout
function setGridLayout(num){
    gridWrapper.style.cssText = `display:grid;grid-template-rows:repeat(${num.value},1fr);grid-template-columns:repeat(${num.value}, 1fr)`;
}

//listener when page is loaded gridWrapper size = rangeSize.value
window.addEventListener("load", () => {
    fillGridArea(gridSizeRange)
    setGridLayout(gridSizeRange);
});
//listener when size of grid is changed
gridSizeRange.addEventListener("change", () => {
  //innerHTML deletes all old child elements after every change !!
  gridWrapper.innerHTML = "";
  rangeSize.textContent = `${gridSizeRange.value}`;
  rainbowColor.classList.remove('active-button');
  deleteColor.classList.remove("active-button");
  currentMode = 'color';
  fillGridArea(gridSizeRange);
  setGridLayout(gridSizeRange);
});

let currentMode = 'color';
//select color to be used in changeColor func
function setCurrentMode(newMode){
    activeButton(newMode)
    currentMode = newMode;
}
//css applied to active button
function activeButton(newMode){
    if(currentMode === 'rainbow'){
        rainbowColor.classList.remove('active-button');
    } else if(currentMode === 'delete'){
        deleteColor.classList.remove('active-button');
    }

    if(newMode === 'rainbow'){
        rainbowColor.classList.add('active-button');
    } else if(newMode === 'delete') {
        deleteColor.classList.add('active-button');
    }
}

//change gridItem color
function changeColor(gridItem){
    if(currentMode === 'color'){
        gridItem.style.backgroundColor = `${gridDivColor.value}`;
    } else if(currentMode === 'rainbow'){
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        gridItem.style.backgroundColor = `rgb(${r},${g},${b})`;
    } else if(currentMode === 'delete'){
        gridItem.style.backgroundColor = `${gridDivBgColor.value}`;
    }
    
}

rainbowColor.addEventListener("click",() => setCurrentMode('rainbow'));
gridDivColor.addEventListener("click", () => setCurrentMode('color'));
deleteColor.addEventListener("click", () => setCurrentMode('delete'));


