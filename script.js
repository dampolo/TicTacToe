let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "circle";
const descriptionEl = document.getElementById("description")
const startingSymbolEl = document.getElementById("starting-symbol")
const contentEL = document.getElementById("content");

const svgCircle = `
    <svg width="70" height="70">
    <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0FF" stroke-width="5"></circle>
    </svg>
`;

const svgCross = `
    <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="70" x2="60" y2="30" stroke="#FFC000" stroke-width="5">
        </line>
        <line x1="20" y1="30" x2="60" y2="70" stroke="#FFC000" stroke-width="5">
        </line>
    </svg>
`;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


function render() {
  currentPlayer = "circle";
  descriptionEl.innerHTML = `You are staring with:`;
  descriptionEl.style = "color: #00B0FF";


  let tableHtml = "<table>";
  for (let i = 0; i < 3; i++) {
    tableHtml += "<tr>";
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      let symbol = "";
      if (fields[index] === "circle") {
        symbol = generateAnimatedCircle();
      } else if (fields[index] === "cross") {
        symbol = generateAnimatedCircle();
      }
      tableHtml += `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
    }
    tableHtml += "</tr>";
  }
  tableHtml += "</table>";

  contentEL.innerHTML = tableHtml;
}

function handleClick(cell, index) {
  if (fields[index] === null) {
    fields[index] = currentPlayer;
    if (currentPlayer === "circle") {
      startingSymbolEl.innerHTML = svgCross;
      descriptionEl.innerHTML = `Cross`;
      descriptionEl.style = "color: #FFC000";
      cell.innerHTML = generateAnimatedCircle();
    } else {
      startingSymbolEl.innerHTML = svgCircle;
      descriptionEl.innerHTML = `Circle`;
      descriptionEl.style = "color: #00B0FF";
      cell.innerHTML = generateAnimatedCross();
    }
    cell.onclick = null;
    if (currentPlayer === "circle") {
      currentPlayer = "cross";
    } else {
      currentPlayer = "circle";
    }
    if (isGameFinished()) {
      const winCombination = getWinningCombination();
      drawWinningLine(winCombination);
      if (fields[index] == "circle") {
        descriptionEl.innerHTML = `Circle WON`;
        startingSymbolEl.innerHTML = svgCircle;
        descriptionEl.style = "color: #00B0FF";
      } else {
        descriptionEl.innerHTML = `Cross WON`;
        startingSymbolEl.innerHTML = svgCross;
        descriptionEl.style = "color: #FFC000";
      }
      contentEL.style.pointerEvents = "none";
    }
  }
}

// Die anybody win this game or not
function isGameFinished() {
  // return fields.every((field) => field !== null) || getWinningCombination() !== null;
  return (
    fields.every(function (field) {
      return field !== null;
    }) || getWinningCombination() !== null
  );
}

function getWinningCombination() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i]; // [0, 1, 2]
    if (
      fields[a] === fields[b] &&
      fields[b] === fields[c] &&
      fields[a] !== null
    )
      return winningCombinations[i];
  }
  return null;
}

function drawWinningLine(combination) {
  const lineColor = "#ffffff";
  const lineWidth = 5;

  const startCell = document.querySelectorAll(`td`)[combination[0]];
  const endCell = document.querySelectorAll(`td`)[combination[2]];
  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();

  const contentRect = contentEL.getBoundingClientRect();

  const lineLength = Math.sqrt(
    Math.pow(endRect.left - startRect.left, 2) +
      Math.pow(endRect.top - startRect.top, 2)
  );
  const lineAngle = Math.atan2(
    endRect.top - startRect.top,
    endRect.left - startRect.left
  );

  const line = document.createElement("div");
  line.style.position = "absolute";
  line.style.width = `${lineLength}px`;
  line.style.height = `${lineWidth}px`;
  line.style.backgroundColor = lineColor;
  line.style.top = `${
    startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top
  }px`;
  line.style.left = `${
    startRect.left + startRect.width / 2 - contentRect.left
  }px`;
  line.style.transform = `rotate(${lineAngle}rad)`;
  line.style.transformOrigin = `top left`;
  contentEL.appendChild(line);
}

function generateAnimatedCircle() {
  const svgCode = `
        <svg width="70" height="70">
            <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0FF" stroke-width="5">
                <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur=".4s" begin="0s" fill="freeze" />
            </circle>
        </svg>
    `;

  return svgCode;
}

function generateAnimatedCross() {
  const svgCode = `
    <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="70" x2="60" y2="30" stroke="#FFC000" stroke-width="5">
        <animate attributeName="x2" from="20" to="60" dur=".1s" begin="0s" fill="freeze" />
        <animate attributeName="y2" from="70" to="30" dur=".1s" begin="0s" fill="freeze" />
    </line>
    <line x1="20" y1="30" x2="60" y2="70" stroke="#FFC000" stroke-width="5">
        <animate attributeName="x2" from="20" to="60" dur=".5s" begin="0s" fill="freeze" />
        <animate attributeName="y2" from="30" to="70" dur=".5s" begin="0s" fill="freeze" />
    </line>
</svg>
`;

  return svgCode;
}

function restartGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  render();
  contentEL.style.pointerEvents = "all";
  startingSymbolEl.innerHTML = svgCircle;
}
