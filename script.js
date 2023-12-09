const container = document.querySelector("#container");
const sizeBtn = document.querySelector("#size-button");
const clearBtn = document.querySelector("#clear-button");
const eraseBtn = document.querySelector("#erase-button");
const randomBtn = document.querySelector("#random-button");
const shadowBtn = document.querySelector("#shadow-button");

let sizeOfGrid = 16;
let mousedown = 0;
let eraseMode = false;
let randomMode = false;
let shadowMode = false;

document.body.addEventListener('mousedown', () => {
    mousedown = 1;
});

document.body.addEventListener('mouseup', () => {
    mousedown = 0;
});

eraseBtn.addEventListener('click', () => {
    if (eraseMode) {
        setEraseOff();
    } else {
        setEraseOn();
    }
});

randomBtn.addEventListener('click', () => {
    if (randomMode) {
        setRandomOff();
    } else {
        setRandomOn();
    }
});

shadowBtn.addEventListener('click', () => {
    if (shadowMode) {
        setShadowOff();
    } else {
        setShadowOn();
    }
})

createBlocksInSize(sizeOfGrid); //Create the first set of blocks when the page is loaded
toggleBlocks();

sizeBtn.addEventListener('click', () => {
    gridSize = prompt("Select grid size:");
    if (gridSize == "" || isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
        alert("Please insert a number between 1 and 100.");
    } else {
        sizeOfGrid = gridSize;
        createBlocksInSize(gridSize);
        setEraseOff();
    }
    toggleBlocks();
});

clearBtn.addEventListener('click', () => {
    eraseMode = false;
    gridSize = sizeOfGrid;
    createBlocksInSize(gridSize);
    toggleBlocks();
    setEraseOff();
});

function toggleBlocks() {
    const singleBlocks = document.querySelectorAll("#container > div");

    singleBlocks.forEach((block) => {

        block.setAttribute('ondragstart', 'dragstart(event)'); //Prevent the mouse drag action

        if (eraseMode) {
            block.className = "erase";

            block.addEventListener('mousedown', () => {
                block.style.backgroundColor = "";
            });

            block.addEventListener('click', () => {
                block.style.backgroundColor = "";
            });

            block.addEventListener('mouseenter', () => {
                if (mousedown) {
                    block.style.backgroundColor = "";
                }
            });
        } else if (randomMode) {
            block.className = "random";

            let randomColor = Math.floor(Math.random()*16777215).toString(16);
            document.documentElement.style.setProperty('--random-color', "#" +randomColor);

            block.addEventListener('mousedown', () => {
                let randomColor = Math.floor(Math.random()*16777215).toString(16);
                block.style.backgroundColor = "#" + randomColor;
            });
    
            block.addEventListener('click', () => {
                let randomColor = Math.floor(Math.random()*16777215).toString(16);
                block.style.backgroundColor = "#" + randomColor;
            });
            
            block.addEventListener('mouseenter', () => {
                if (mousedown) {
                    let randomColor = Math.floor(Math.random()*16777215).toString(16);
                    block.style.backgroundColor = "#" + randomColor;
                }
            });
        } else if (shadowMode) {
            block.className = "shadow";
            let transparencyCounter = 0.0;
            
            block.addEventListener('mousedown', () => {
                let shadowColor;
                transparencyCounter += 0.2;
                block.style.backgroundColor = `rgba(0, 0, 0, ${transparencyCounter})`;
                shadowColor = `rgba(0, 0, 0, ${transparencyCounter})`;
                document.documentElement.style.setProperty('--shadow-color', shadowColor);
            });
    
            block.addEventListener('click', () => {
                let shadowColor;
                transparencyCounter += 0.2;
                block.style.backgroundColor = `rgba(0, 0, 0, ${transparencyCounter})`;
                shadowColor = `rgba(0, 0, 0, ${transparencyCounter})`;
                document.documentElement.style.setProperty('--shadow-color', shadowColor);
            });
            
            block.addEventListener('mouseenter', () => {
                if (mousedown) {
                    let shadowColor;
                    transparencyCounter += 0.2;
                    block.style.backgroundColor = `rgba(0, 0, 0, ${transparencyCounter})`;
                    shadowColor = `rgba(0, 0, 0, ${transparencyCounter})`;
                    document.documentElement.style.setProperty('--shadow-color', shadowColor);
                }
            });
        } else {
            block.className = "paint";
            
            block.addEventListener('mousedown', () => {
                block.style.backgroundColor = "black";
            });
    
            block.addEventListener('click', () => {
                block.style.backgroundColor = "black";
            });
            
            block.addEventListener('mouseenter', () => {
                if (mousedown) {
                    block.style.backgroundColor = "black";
                }
            });
        }
    });
};

function createBlocksInSize(gridSize) {
    eraseMode = false;
    container.innerHTML = "";
    for (let i = 1; i <= gridSize * gridSize; i++) {
        const insideDiv = document.createElement("div");
        insideDiv.style.boxSizing = "border-box";
        container.appendChild(insideDiv);
        insideDiv.style.width = `calc(550.2px/${gridSize})`;
        insideDiv.style.height = `calc(550px/${gridSize})`;
    }
    sizeBtn.textContent = `Select size: ${gridSize}`;
};

function dragstart (event) {
    event.preventDefault()
};

function setEraseOn() {
    eraseMode = true;
    eraseBtn.textContent = "Erase Mode: On";
    eraseBtn.style.backgroundColor = "#0C6B37";
    eraseBtn.style.color = "white";
    document.body.style.cursor = "cell";
    toggleBlocks();
}

function setEraseOff() {
    eraseMode = false;
    eraseBtn.textContent = "Erase Mode: Off";
    eraseBtn.style.backgroundColor = "#BC2023";
    document.body.style.cursor = "";
    toggleBlocks();
}

function setRandomOn() {
    randomMode = true;
    setEraseOff();
    setShadowOff();
    randomBtn.textContent = "Random Color Mode: On";
    const color1 = Math.floor(Math.random()*16777215).toString(16);
    const color2 = Math.floor(Math.random()*16777215).toString(16);
    randomBtn.style.backgroundImage = "linear-gradient(90deg, #" + color1 + " 0%, #" + color2 + " 100%)";
    toggleBlocks();
}

function setRandomOff() {
    randomMode = false;
    randomBtn.textContent = "Random Color Mode: Off";
    randomBtn.style.backgroundImage = "";
    toggleBlocks();
}

function setShadowOn() {
    shadowMode = true;
    setEraseOff();
    setRandomOff();
    shadowBtn.textContent = "Shadow Mode: On";
    shadowBtn.style.backgroundImage = "linear-gradient(90deg, white 0%, gray 100%)";;
    toggleBlocks();
}

function setShadowOff() {
    shadowMode = false;
    shadowBtn.textContent = "Shadow Mode: Off";
    shadowBtn.style.backgroundImage = "";
    toggleBlocks();
}