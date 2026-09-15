// ================= CARD EXPORT UTILITIES ================= //

function downloadCardImage() {
    const card = document.getElementById('id-card');
    const newWindow = window.open('', '_blank', 'width=400,height=600');
    newWindow.document.write(`
        <html>
        <head>
            <link rel="stylesheet" href="style.css">
            <style>
                body { display: flex; justify-content: center; align-items: center; height: 100vh; background: #fff; margin: 0; }
                .id-card { box-shadow: none; }
            </style>
        </head>
        <body>
            ${card.outerHTML}
            <script>window.onload = function() { window.print(); window.close(); }</script>
        </body>
        </html>
    `);
    newWindow.document.close();
}

function printCard() {
    const cardElement = document.getElementById('id-card').outerHTML;
    document.body.innerHTML = `
        <style>body { background: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; } @page { size: auto; margin: 0mm; }</style>
        <div>${cardElement}</div>
    `;
    window.print();
    location.reload(); 
}
