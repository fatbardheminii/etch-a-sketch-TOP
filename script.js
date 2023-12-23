const gridWrapper = document.querySelector('#grid-wrapper');
const gridSizeRange = document.querySelector('#grid-size-range');
const gridDivColor = document.querySelector('#grid-div-color');
const gridDivBgColor = document.querySelector("#grid-div-bg-color");
const randomColor = document.querySelector("#random-color");
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
        gridItem.style.cssText = `border:1px solid black;display:inline-block`;
        gridWrapper.appendChild(gridItem);
    }
}

//set grid layout
function setGridLayout(num){
    gridWrapper.style.cssText = `display:grid;grid-template-rows:repeat(${num.value},1fr);grid-template-columns:repeat(${num.value}, 1fr)`;
}

//listener when page is loaded gridWrapper size = rangeSize.value
window.addEventListener("load", function(){
    fillGridArea(gridSizeRange)
    setGridLayout(gridSizeRange);
});

gridSizeRange.addEventListener("change", function () {
  //innerHTML deletes all old child elements after every change !!
  gridWrapper.innerHTML = "";
  rangeSize.textContent = `${gridSizeRange.value}`;
  fillGridArea(gridSizeRange);
  setGridLayout(gridSizeRange);
});



