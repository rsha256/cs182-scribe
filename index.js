async function mergeAllPDFs(urls) {
    
    const pdfDoc = await PDFLib.PDFDocument.create();
    const numDocs = urls.length;
    
    for(var i = 0; i < numDocs; i++) {
        const donorPdfBytes = await fetch(urls[i]).then(res => res.arrayBuffer());
        const donorPdfDoc = await PDFLib.PDFDocument.load(donorPdfBytes);
        const docLength = donorPdfDoc.getPageCount();
        for(var k = 0; k < docLength; k++) {
            const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);
            //console.log("Doc " + i+ ", page " + k);
            pdfDoc.addPage(donorPage);
        }
    }

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    console.log(pdfDataUri);
  
    // strip off the first part to the first comma "data:image/png;base64,iVBORw0K..."
    var data_pdf = pdfDataUri.substring(pdfDataUri.indexOf(',')+1);

    // return "data:application/pdf;base64," + data_pdf;
    document.getElementById('scribe').src = loc;
    document.getElementById('ascribe').href = loc;
}

var urls = [];
for (var i = 2; i < 28; ++i) {
    urls.push("https://inst.eecs.berkeley.edu/~cs182/fa22/assets/notes/scribe" + i + ".pdf");
    // console.log if there is a valid PDF at the URL
    fetch(urls[i-2]).then(res => res.arrayBuffer()).then(res => console.log(res));
}

var pdf = mergeAllPDFs(urls);
