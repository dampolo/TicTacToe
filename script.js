let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];
let currentPlayer = 'circle'



function render() {
    const contentDiv = document.getElementById('content');

    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if(fields[index] === 'circle') {
                symbol = generateAnimatedCircle();
            } else if (fields[index] === 'cross') {
                symbol = generateAnimatedCrossCircle();
            }
            tableHtml += `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    contentDiv.innerHTML = tableHtml;
}

// function handleClick(cell, index) {
//     if (fields[index] === null) {
//         fields[index] = currentPlayer;
//         cell.innerHTML = currentPlayer === 'circle' ? generateAnimatedCircle() : generateAnimatedCrossCircle();
//         cell.onclick = null;
//         currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';   
//     }
// }

function handleClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        if (currentPlayer === 'circle') {
            cell.innerHTML = generateAnimatedCircle();
        } else {
            cell.innerHTML = generateAnimatedCrossCircle();
        };
        cell.onclick = null;
        if (currentPlayer === 'circle') {
            currentPlayer = 'cross';
        } else {
            currentPlayer = 'circle';
        };
        if(isGameFinished()) {
            const winCombination = getWinningCombination();
            drawWinningLine(winCombination)
        }
    }
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


function generateAnimatedCrossCircle() {
    const svgCode = `
        <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="70" x2="60" y2="30" stroke="#FFC000" stroke-width="5">
                <animate attributeName="x2" from="20" to="60" dur=".4s" begin="0s" fill="freeze" />
                <animate attributeName="y2" from="70" to="30" dur=".4s" begin="0s" fill="freeze" />
            </line>
            <line x1="20" y1="30" x2="60" y2="70" stroke="#FFC000" stroke-width="5">
                <animate attributeName="x2" from="20" to="60" dur=".4s" begin="0s" fill="freeze" />
                <animate attributeName="y2" from="30" to="70" dur=".4s" begin="0s" fill="freeze" />
            </line>
        </svg>
    `;

    return svgCode;
}
