const container = document.querySelector("#container");

for (let i = 1; i <= 256; i++) {
    const insideDiv = document.createElement("div");
    insideDiv.className = "single-block";
    insideDiv.textContent = `${i}`;
    container.appendChild(insideDiv);
}