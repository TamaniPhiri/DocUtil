import streamlit as st
import aspose.pdf as ap
import tempfile
import os

def convert_pdf_to_doc(input_pdf, output_filename):
    # Create a temporary file to save the uploaded PDF content
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        temp_filepath = temp_file.name
        temp_file.write(input_pdf.read())

    # Open PDF document from the temporary file
    document = ap.Document(temp_filepath)

    save_options = ap.DocSaveOptions()
    save_options.format = ap.DocSaveOptions.DocFormat.DOC_X
    save_options.mode = ap.DocSaveOptions.RecognitionMode.FLOW
    save_options.relative_horizontal_proximity = 2.5
    save_options.recognize_bullets = True

    # Save the file into MS Word document format with the desired output filename
    output_doc = output_filename + ".docx"
    document.save(output_doc, save_options)

    # Delete the temporary file
    os.remove(temp_filepath)

    return output_doc

def main():
    st.title("Document Converter")
    conversion_type = st.selectbox("Select Conversion Type", ("PDF to DOCX",))

    if conversion_type == "PDF to DOCX":
        st.subheader("Convert PDF to DOCX")
        pdf_file = st.file_uploader("Upload PDF File", type=["pdf"])

        if pdf_file is not None:
            output_filename = pdf_file.name.rsplit(".", 1)[0]  # Extracting the filename without extension
            if st.button("Convert"):
                progress_bar = st.progress(0)
                with st.spinner("Converting..."):
                    docx_file = convert_pdf_to_doc(pdf_file, output_filename)
                    progress_bar.progress(100)
                st.success("Conversion Successful!")
                st.download_button("Download DOCX", docx_file)

if __name__ == "__main__":
    main()