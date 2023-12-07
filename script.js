const container = document.querySelector("#container");
const sizeBtn = document.querySelector("#size-button");
const clearBtn = document.querySelector("#clear-button");
const eraseBtn = document.querySelector("#erase-button");

let sizeOfGrid = 16;
let mousedown = 0;
let eraseMode = false;

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

for (let i = 1; i <= 256; i++) {
    const insideDiv = document.createElement("div");
    insideDiv.style.boxSizing = "border-box";
    insideDiv.className = "single-block";
    container.appendChild(insideDiv);
    toggleBlocks();
}

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
    const singleBlocks = document.querySelectorAll(".single-block");

    singleBlocks.forEach((block) => {

        block.setAttribute('ondragstart', 'dragstart(event)'); //prevent the mouse drag action

        if (eraseMode) {
            block.className = "single-block erase";

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

        } else {
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
        insideDiv.className = "single-block";
        container.appendChild(insideDiv);
        insideDiv.style.width = `calc(550px/${gridSize})`;
        insideDiv.style.height = `calc(550px/${gridSize})`;
    }
};

function dragstart (event) {
    event.preventDefault()
};

function setEraseOn() {
    eraseMode = true;
    eraseBtn.textContent = "Erase Mode: On";
    eraseBtn.style.backgroundColor = "palegreen";
    toggleBlocks();
}

function setEraseOff() {
    eraseMode = false;
    eraseBtn.textContent = "Erase Mode: Off";
    eraseBtn.style.backgroundColor = "lightcoral";
    toggleBlocks();
}