import streamlit as st
from pptx import Presentation
import docx2pdf

# Define the dimensions for the image on the slide
left = top = 0
width = height = 100

def main():
    st.title("Document Converter")
    file = st.file_uploader("Upload a file", type=["docx"])
    if file is not None:
        if st.button("Convert to PPT"):
            ppt = Presentation()
            converted_ppt = convert_to_ppt(file.name, ppt)
            st.success(f"File converted to PPT successfully. Download link: [Download PPT]({converted_ppt})")
        
        if st.button("Convert to PDF"):
            pdf_file = convert_to_pdf(file)
            st.success(f"File converted to PDF successfully. Download link: [Download PDF]({pdf_file})")

def convert_to_ppt(file, ppt):
    ppt_file = file[:file.rindex('.')] + ".pptx"
    slide_layout = ppt.slide_layouts[1]
    
    # Modify the line below to use the uploaded file path
    file_path = file
    
    slide = ppt.slides.add_slide(slide_layout)
    slide.shapes.add_picture(file_path, left, top, width, height)
    
    ppt.save(ppt_file)
    
    return ppt_file

def convert_to_pdf(file):
    pdf_file = file[:file.rindex('.')] + ".pdf"
    
    # Modify the line below to use the uploaded file path
    file_path = file
    
    docx2pdf.convert(file_path, pdf_file)
    
    return pdf_file

if __name__ == '__main__':
    main()
