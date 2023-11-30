const container = document.querySelector("#container");
const sizeBtn = document.querySelector("#size-button");
const clearBtn = document.querySelector("#clear-button");
let sizeOfGrid = 16;
let mousedown = 0;

document.body.addEventListener('mousedown', () => {
    mousedown = 1;
});

document.body.addEventListener('mouseup', () => {
    mousedown = 0;
});

for (let i = 1; i <= 256; i++) {
    const insideDiv = document.createElement("div");
    insideDiv.style.boxSizing = "border-box";
    insideDiv.className = "single-block";
    container.appendChild(insideDiv);
}

selectBlocks();

sizeBtn.addEventListener('click', () => {
    gridSize = prompt("Select grid size:");
    if (gridSize == "" || isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
        alert("Please insert a number between 1 and 100.");
    } else {
        sizeOfGrid = gridSize;
        createBlocksInSize(gridSize);
    }
    selectBlocks();
});

clearBtn.addEventListener('click', () => {
    gridSize = sizeOfGrid;
    createBlocksInSize(gridSize);
    selectBlocks();
});

function selectBlocks() {
    const singleBlocks = document.querySelectorAll(".single-block");
    singleBlocks.forEach((block) => {

        block.setAttribute('ondragstart', 'dragstart(event)'); //prevent the mouse drag action

        block.addEventListener('mousedown', () => {
            block.style.backgroundColor = "black";
        });

        block.addEventListener('click', () => {
            block.style.backgroundColor = "black";
        });
        
        block.addEventListener('mouseenter', () => {
            if (mousedown) {
                block.style.backgroundColor = "black";
                mousedown = 1;
            }
        });
    });
};

function createBlocksInSize(gridSize) {
    container.innerHTML = "";
    for (let i = 1; i <= gridSize * gridSize; i++) {
        const insideDiv = document.createElement("div");
        insideDiv.style.boxSizing = "border-box";
        insideDiv.className = "single-block";
        console.log(insideDiv.className);
        container.appendChild(insideDiv);
        insideDiv.style.width = `calc(550px/${gridSize})`;
        insideDiv.style.height = `calc(550px/${gridSize})`;
    }
};

function dragstart (event) {
    event.preventDefault()
};