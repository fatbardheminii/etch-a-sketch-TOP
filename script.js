const gridWrapper = document.querySelector('#grid-wrapper');
const gridSizeRange = document.querySelector('#grid-size-range');
const gridDivColor = document.querySelector('#grid-div-color');
const gridDivBgColor = document.querySelector("#grid-div-bg-color");
const rainbowColor = document.querySelector("#rainbow-color");
const deleteColor = document.querySelector("#delete-color");
const addBorders = document.querySelector("#add-borders");
const deleteBorders = document.querySelector("#delete-borders");
const darkenEffect = document.querySelector("#darken-effect");
const lightenEffect = document.querySelector('#lighten-effect');
const rangeSize = document.querySelector('.range-size');
const buttons = document.querySelectorAll('button');
const iconBars = document.querySelector('.icon');
const buttonsWrapper = document.querySelector('#buttons-wrapper');

//iconBars clicked displays or removes buttonsWrapper on smaller screens
iconBars.addEventListener("click", (event) => {
  event.stopPropagation(); // Stop the event from reaching the document.body
  buttonsWrapper.classList.toggle("icon-clicked");
});
//after buttonsWrapper is opened via iconBars remove it by clicking elsewhere rather than buttonsWrapper
document.body.addEventListener("click", (event) => {
  //2 methods possible with contains or closest
  //contains -- checks if clicked element 
  //if(!buttonsWrapper.contains(event.target)) {
  if (!event.target.closest("#buttons-wrapper")) {
    buttonsWrapper.classList.remove("icon-clicked");
  }
});

//listener when page is loaded gridWrapper size = rangeSize.value
window.addEventListener("load", () => {
    fillGridArea(gridSizeRange)
    setGridLayout(gridSizeRange);
});

// fill Area with div for etch-a-sketch
function fillGridArea(size){
     for (let i = 0; i < size.value * size.value; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.toggle('grid-item');
        gridItem.style.cssText = `border:1px solid black;display:inline-block;background-color:${gridDivBgColor.value}`;
        gridItem.addEventListener("mouseenter", () => changeColor(gridItem));
        gridItem.addEventListener("click", () => changeDarkness(gridItem));
        deleteBorders.addEventListener("mousedown", () => toggleBorders(gridItem));
        addBorders.addEventListener("mousedown", () => toggleBorders(gridItem));
        gridWrapper.appendChild(gridItem);
    }
}

//set grid layout
function setGridLayout(num){
    gridWrapper.style.cssText = `display:grid;grid-template-rows:repeat(${num.value},1fr);grid-template-columns:repeat(${num.value}, 1fr)`;
}
//listener when size of grid is changed
gridSizeRange.addEventListener("change", () => {
  //innerHTML deletes all old child elements after every change !!
  gridWrapper.innerHTML = "";
  rangeSize.textContent = `${gridSizeRange.value}`;
  buttons.forEach((btn) => btn.classList.remove("active-button"));
  gridDivColor.classList.remove('active-button');
  currentMode = 'color';
  fillGridArea(gridSizeRange);
  setGridLayout(gridSizeRange);
});
//currentMode is used in changeColor, changeDarkness and activeButton functions-- very important!
let currentMode = 'color';
//Listeners change currentMode -> currentMode changes active button. 
rainbowColor.addEventListener("click",() => setCurrentMode('rainbow'));
gridDivColor.addEventListener("click", () => setCurrentMode('color'));
deleteColor.addEventListener("click", () => setCurrentMode('delete'));
//select color to be used in changeColor func
function setCurrentMode(newMode){
    activeButton(newMode)
    currentMode = newMode;
}
//css applied to active button
function activeButton(newMode){
  //always remove active-btn class after another btn is clicked
  if (currentMode === "color") {
    gridDivColor.classList.remove("active-button");
  } else if (currentMode === "rainbow") {
    rainbowColor.classList.remove("active-button");
  } else if (currentMode === "delete") {
    deleteColor.classList.remove("active-button");
  } else if (currentMode === "dark") {
    darkenEffect.classList.remove("active-button");
  } else if (currentMode === "light") {
    lightenEffect.classList.remove("active-button");
  }
  //always add active-btn class after another btn is clicked
  if (newMode === "color") {
    gridDivColor.classList.add("active-button");
  } else if (newMode === "rainbow") {
    rainbowColor.classList.add("active-button");
  } else if (newMode === "delete") {
    deleteColor.classList.add("active-button");
  } else if (newMode === "dark") {
    darkenEffect.classList.add("active-button");
  } else if (newMode === "light") {
    lightenEffect.classList.add("active-button");
  }
}

//change gridItem color
//currentMode will be changed via listeners and function: setCurrentMode!
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

//add or delete borders
let currentBorders = 'border';
//Listeners change currentBorders via setCurrentBorders func -> setCurrBorders func changes activeBorders func (toggles active-button class) 
deleteBorders.addEventListener("mousedown", () => setCurrentBorders("none"));
addBorders.addEventListener("mousedown", () => setCurrentBorders("border"));

function setCurrentBorders(newMode){
    activeBorders(newMode);
    currentBorders = newMode;
}

function activeBorders(newMode){
    if(currentBorders === 'border'){
        addBorders.classList.remove('active-button');
    } else if (currentBorders === 'none'){
        deleteBorders.classList.remove('active-button');
    }

    if(newMode === 'border'){
        addBorders.classList.add('active-button');
    } else if(newMode === 'none'){
        deleteBorders.classList.add('active-button');
    }
}
//add or remove borders --> called with 2 different listeners inside fillGridArea func
function toggleBorders(gridItem){
    if(currentBorders === 'border'){
        gridItem.style.border = '1px solid black';
    } else if(currentBorders === 'none'){
        gridItem.style.border = 'none';
    }
}

//darken or lighten gridItem
let shadeEffect = 0;
//Listeners change currentMode via setCurrentShade func -> currentMode changes active button
// if currentMode is dark or light --> changeColor func can't be active, because it needs currentMode(color,rainbow or delete)!!
//when changeDarkness is active changeColor is inactive and vice-versa
darkenEffect.addEventListener("mousedown", () => setCurrentShade("dark"));
lightenEffect.addEventListener("mousedown", () => setCurrentShade("light"));

function setCurrentShade(newMode){
    if(newMode === 'light'){
        shadeEffect = 1;
    }
    activeButton(newMode);
    currentMode = newMode;
}

function changeDarkness(gridItem){
    if(currentMode === 'dark'){
        gridItem.style.backgroundColor = `rgba(0,0,0,${shadeEffect += 0.1})`;
        shadeEffect > 1 ? shadeEffect = 0 : shadeEffect;
    } else if (currentMode === 'light'){
        gridItem.style.backgroundColor = `rgba(200,200,200,${shadeEffect -= 0.1})`;
        shadeEffect < 0 ? shadeEffect = 1 : shadeEffect;
    }
}


