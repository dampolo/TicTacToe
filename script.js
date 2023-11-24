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
                symbol = 'x';
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
            <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0FF" stroke-width="5">
                <animate attributeName="r" from="0" to="30" dur="1s" begin="0s" fill="freeze" />
                <animate attributeName="stroke-dasharray" values="0 0; 188 50" dur="3s" begin="0s" fill="freeze" />
            </circle>
        </svg>
    `;

    return svgCode;
}
