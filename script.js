const container = document.querySelector("#container");
const sizeBtn = document.querySelector("#size-button");
const clearBtn = document.querySelector("#clear-button");
const eraseBtn = document.querySelector("#erase-button");
const randomBtn = document.querySelector("#random-button");

let sizeOfGrid = 16;
let mousedown = 0;
let eraseMode = false;
let randomMode = false;

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
            console.log("random mode on");
            block.className = "";
            const randomColor = Math.floor(Math.random()*16777215).toString(16);

            block.addEventListener('mousedown', () => {
                block.style.backgroundColor = "#" + randomColor;
            });
    
            block.addEventListener('click', () => {
                block.style.backgroundColor = "#" + randomColor;
            });
            
            block.addEventListener('mouseenter', () => {
                if (mousedown) {
                    block.style.backgroundColor = "#" + randomColor;
                }
            });
        } else {
            block.className = "";

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
        insideDiv.style.height = `calc(550.2px/${gridSize})`;
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

function setRandomOn() {
    randomMode = true;
    randomBtn.textContent = "Random Color Mode: On";
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    randomBtn.style.backgroundColor = "#" + randomColor;
    toggleBlocks();
}

function setRandomOff() {
    randomMode = false;
    randomBtn.textContent = "Random Color Mode: Off";
    randomBtn.style.backgroundColor = "";
    toggleBlocks();
}