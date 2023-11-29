const container = document.querySelector("#container");
const btn = document.querySelector("#top-button");

for (let i = 1; i <= 256; i++) {
    const insideDiv = document.createElement("div");
    insideDiv.style.boxSizing = "border-box";
    insideDiv.className = "single-block";
    container.appendChild(insideDiv);
}

btn.addEventListener('click', () => {
    let gridSize = prompt("Select grid size:");
    if (gridSize == "" || isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
        alert("Please insert a number between 1 and 100.");
    } else {
        container.innerHTML = "";
        for (let i = 1; i <= gridSize * gridSize; i++) {
            const insideDiv = document.createElement("div");
            insideDiv.style.boxSizing = "border-box";
            insideDiv.className = "single-block";
            container.appendChild(insideDiv);
            insideDiv.style.width = `calc(550px/${gridSize})`;
            insideDiv.style.height = `calc(550px/${gridSize})`;
        }
    }
});
