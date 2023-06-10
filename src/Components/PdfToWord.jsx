import { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const PdfToWord = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfContent, setPdfContent] = useState(null);
  const [fontSize, setFontSize] = useState(12);
  const [fontColor, setFontColor] = useState('black');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Read the contents of the selected PDF file
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      setPdfContent(arrayBuffer);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(parseInt(event.target.value));
  };

  const handleFontColorChange = (event) => {
    setFontColor(event.target.value);
  };

  const handleSavePdf = async () => {
    try {
      // Load the PDF document
      const pdfDoc = await PDFDocument.load(pdfContent);

      // Get the first page of the document
      const [page] = pdfDoc.getPages();

      // Modify the font size and color of the first page's content
      const helveticaFont = await pdfDoc.embedFont('Helvetica');
      page.setFont(helveticaFont);
      page.setFontSize(fontSize);
      page.setTextColor(rgb(...hexToRgb(fontColor)));

      // Save the modified PDF as a new ArrayBuffer
      const modifiedPdfBytes = await pdfDoc.save();

      // Create a Blob from the ArrayBuffer
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });

      // Create a temporary URL for the Blob
      const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob);

      // Trigger a download of the modified PDF file
      const link = document.createElement('a');
      link.href = modifiedPdfUrl;
      link.download = 'modified.pdf';
      link.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(modifiedPdfUrl);
    } catch (error) {
      console.error('Error saving PDF:', error);
    }
  };

  // Helper function to convert a hexadecimal color to RGB values
  const hexToRgb = (hex) => {
    const normalizedHex = hex.replace('#', '');
    const r = parseInt(normalizedHex.substring(0, 2), 16);
    const g = parseInt(normalizedHex.substring(2, 4), 16);
    const b = parseInt(normalizedHex.substring(4, 6), 16);
    return [r, g, b];
  };
    
  return (
    <div>
    <h1>PDF Editor</h1>
    <input type="file" accept=".pdf" onChange={handleFileChange} />
    <div>
      <label>Font Size:</label>
      <input type="number" value={fontSize} onChange={handleFontSizeChange} />
    </div>
    <div>
      <label>Font Color:</label>
      <input type="color" value={fontColor} onChange={handleFontColorChange} />
    </div>
    <button onClick={handleSavePdf}>Save PDF</button>
  </div>
  )
}

export default PdfToWord
