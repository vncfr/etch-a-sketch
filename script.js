const container = document.querySelector("#container");
const btn = document.querySelector("#top-button");

for (let i = 1; i <= 16; i++) {
    const line = document.createElement("div");
    line.style.boxSizing = "border-box";
    for (let j = 1; j <= 16; j++) {
        const insideDiv = document.createElement("div");
        insideDiv.style.boxSizing = "border-box";
        insideDiv.className = "single-block";
        /* insideDiv.textContent = `${i}`; */
        line.appendChild(insideDiv);
        container.appendChild(line);
        /* insideDiv.style.width = `${size}px`;
        insideDiv.style.height = `${size}px`; */
    }
}

const blocks = document.querySelectorAll(".single-block");

btn.addEventListener('click', () => {
    let gridSize = prompt("Select grid size:");
    console.log(typeof gridSize);
    while (gridSize < 1 || gridSize > 100) {
        alert("Please insert a number between 1 and 100.");
        gridSize = prompt("Select grid size:");
    }
    /* let size = 4/gridSize; */
    container.innerHTML = "";
    for (let i = 1; i <= gridSize; i++) {
        const line = document.createElement("div");
        line.style.boxSizing = "border-box";
        for (let j = 1; j <= gridSize; j++) {
            const insideDiv = document.createElement("div");
            insideDiv.style.boxSizing = "border-box";
            insideDiv.className = "single-block";
            /* insideDiv.textContent = `${i}`; */
            line.appendChild(insideDiv);
            container.appendChild(line);
            insideDiv.style.width = `calc(45vw/${gridSize})`;
            insideDiv.style.height = `calc(45vw/${gridSize})`;
        }
    }
    blocks.forEach((block) => {
        
    });
});
