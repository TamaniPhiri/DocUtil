import { useState } from 'react';
import docxConverter from 'docx-pdf';

const PdfToWord = () => {

  const [convertedFilePath, setConvertedFilePath] = useState(null);

  const convertDocxToPdf = () => {
    const inputPath = './input.docx';
    const outputPath = './output.pdf';

    docxConverter(inputPath, outputPath, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('result: ' + result);
        setConvertedFilePath(outputPath);
      }
    });
  };

  const handleDownload = () => {
    if (convertedFilePath) {
      // Create a download link
      const link = document.createElement('a');
      link.href = convertedFilePath;
      link.download = 'converted.pdf';
      link.click();
    }
  };

    
  return (
    <div>
      <h1>Docx to PDF Converter</h1>
      <button onClick={convertDocxToPdf}>Convert</button>
      {convertedFilePath && (
        <button onClick={handleDownload}>Download Converted PDF</button>
      )}
    </div>
  )
}

export default PdfToWord
