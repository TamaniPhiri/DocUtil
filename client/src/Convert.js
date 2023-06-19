import pkg from 'cloudmersive-convert-api-client';
const { ConvertDocumentApi, ApiClient } = pkg;

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

export default convertDocumentToPdf;
