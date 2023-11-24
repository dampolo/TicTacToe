let fields = [
    null,
    'circle',
    'circle',
    'circle',
    null,
    null,
    'cross',
    'cross',
    null,
];

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
            tableHtml += `<td>${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    contentDiv.innerHTML = tableHtml;
}


function generateAnimatedCircle() {
    const svgCode = `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="50" fill="none" stroke="#00B0FF" stroke-width="5">
                <animate attributeName="r" from="30" to="30" dur=".5s" begin="0s" fill="freeze" />
                <animate attributeName="stroke-dasharray" values="0 0; 188 50" dur=".4s" begin="0s" fill="freeze" />
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
