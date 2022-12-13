import requests
from io import BytesIO
from PyPDF2 import PdfFileReader, PdfFileMerger

# Set the base URL for the PDF files
base_url = "https://inst.eecs.berkeley.edu/~cs182/fa22/assets/notes/scribe"

# Set the range of PDFs to download and merge
pdf_range = range(2, 28)

# Initialize a list to store the individual PDFs
pdf_list = []

# Iterate over the range of PDFs
for i in pdf_range:
  # Form the URL for the current PDF
  pdf_url = base_url + str(i) + ".pdf"

  # Download the PDF
  response = requests.get(pdf_url)

  # Read the PDF into memory
  pdf_bytes = BytesIO(response.content)

  # Create a PdfFileReader object for the PDF
  pdf_reader = PdfFileReader(pdf_bytes)

  # Add the PDF to the list
  pdf_list.append(pdf_reader)

# Create a PdfFileMerger object
pdf_merger = PdfFileMerger()

# Iterate over the list of PDFs
for pdf in pdf_list:
  # Add each PDF to the merger
  pdf_merger.append(pdf)

# Write the merged PDF to a file
with open("merged_pdfs.pdf", "wb") as f:
  pdf_merger.write(f)
