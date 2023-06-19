const express = require('express');
const multer = require('multer');
const { ConvertDocumentApi, ApiClient } = require('cloudmersive-convert-api-client');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5000;

const API_KEY = '2fbbf895-4897-4e6d-9765-a6cef67b8910'; // Replace with your actual API key

const defaultClient = ApiClient.instance;
defaultClient.authentications['Apikey'].apiKey = API_KEY;

const convertDocumentToPdf = async (file) => {
  const api = new ConvertDocumentApi();

  try {
    const inputFile = new File([file], file.name, { type: file.type });
    const response = await api.convertDocumentDocxToPdf(inputFile);

    // The API response will contain the converted PDF file as a Blob
    const convertedFile = response.data;

    return convertedFile;
  } catch (error) {
    throw new Error('Conversion failed. Please try again later.');
  }
};

const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/convert-docx-to-pdf', upload.single('file'), async (req, res) => {
  try {
    const { file } = req;
    const convertedFile = await convertDocumentToPdf(file.path);

    res.setHeader('Content-Disposition', 'attachment; filename="converted.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    fs.createReadStream(convertedFile).pipe(res);
  } catch (error) {
    console.error('Conversion failed:', error);
    res.status(500).send('Conversion failed. Please try again later.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
