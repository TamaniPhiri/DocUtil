import { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const [conversionError, setConversionError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleConversion = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/convert-docx-to-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      setConversionError(null);
      setConvertedFile(response.data);
    } catch (error) {
      console.error('Conversion failed:', error);
      setConversionError('Conversion failed. Please try again later.');
    }
  };

  const handleDownload = () => {
    if (convertedFile) {
      const downloadUrl = URL.createObjectURL(new Blob([convertedFile]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'converted.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleConversion}>Convert to PDF</button>
      {conversionError && <p>{conversionError}</p>}
      {convertedFile && (
        <button onClick={handleDownload} disabled={!convertedFile}>
          Download PDF
        </button>
      )}
    </div>
  );
}

export default App;
