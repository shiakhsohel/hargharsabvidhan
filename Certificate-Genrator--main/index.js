const submitBtn = document.getElementById("submitBtn");

const { PDFDocument, rgb, degrees } = PDFLib;



const generatePDF = async (name) => {
  const existingPdfBytes = await fetch("./certificate_sed.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("./font.ttf").then((res) =>
    res.arrayBuffer()
  );

  // Embed our custom font in the document
  const SanChezFont = await pdfDoc.embedFont(fontBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw a string of text diagonally across the first page
  const fontSize = 30;
  const lineHeight = fontSize * 1.2; // adjust as needed
  const textHeight = lineHeight; // adjust as needed
  const pageHeight = firstPage.getHeight();
  const textWidth = name.length * fontSize;
  const pageWidth = 842; 
  const x = (pageWidth - textWidth) / 2;  const y = (pageHeight - textHeight) / 2;
  console.log(y , x)
  firstPage.drawText(name, {
    x: x,
    y: 500,
    size: fontSize,
    font: SanChezFont,
    color: rgb(0.0, 0.5, 1.0),
  });


  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");

  // this was for creating uri and showing in iframe

  // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  // document.getElementById("pdf").src = pdfDataUri;

  var file = new File(
    [pdfBytes],
    `${name}_Certificate.pdf`,
    {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};

// init();
