# React Native QR Code Scanning, Custom Dropdowns, and PDF Generation

## Objective

Build a React Native Android application demonstrating the ability to implement QR code scanning, custom dropdowns, and PDF generation. The application includes two pages with functionality for scanning QR codes, entering data, displaying the data, selecting values from dropdowns, and generating and sharing a PDF.

---

## Table of Contents

- [Technologies Used](#technologies-used)
- [Application Structure](#application-structure)
- [Features](#features)
- [How to Run the Application](#how-to-run-the-application)

---
##Application Structure

/src
  /components
    QRCodeScanner.js  -- QR code scanner component
    Dropdown.js       -- Custom dropdown component
    PDFGenerator.js   -- Component for generating PDF
  /screens
    Page1.js          -- QR Code scanning and data input page
    Page2.js          -- Display scanned data, dropdowns, and submit button
  App.js              -- Main component with navigation setup

##Features
###Page 1 - QR Code Scanning and Data Entry
QR Code Scanners: Implements three custom QR code scanners using react-native-vision-camera.
User Inputs: Text input fields for:
Eway Bill No
Challa No
Expense (Only numerical values)
Load Date (Date picker can be implemented if required)
Navigation: "Next" button to navigate to Page 2 with scanned data passed.

###Page 2 - Data Display, Dropdowns, and PDF Generation
Data Display: Shows scanned QR code data and user input values from Page 1.
Custom Dropdowns: Allows users to select:
Vehicle Name (Dummy data)
Vehicle Owner Name (Dummy data)
State (Dummy data)
PDF Generation: On clicking "Submit", a PDF is generated with the following:
Scanned QR code data
Text input field values
Dropdown selected values
Allows users to print, save, or share the PDF.

#APP FLOW

+-----------------------------+
|         Launch App           |
+-----------------------------+
             |
             v
+-----------------------------+
|     Page 1: QR Scanning     |
|   (Scan QR Codes, Enter     |
|    Data: Eway Bill,         |
|     Challa No, Expense,     |
|     Load Date)              |
+-----------------------------+
             |
             v
+-----------------------------+
|     Page 2: Display Data    |
|   (Show Scanned Data,       |
|     Dropdowns, Submit Button|
+-----------------------------+
             |
             v
+-----------------------------+
|     Generate & Share PDF    |
|   (Print, Save, Share PDF)  |
+-----------------------------+


##Conclusion
###This React Native application implements QR code scanning, custom dropdowns, and PDF generation, providing a comprehensive example of these features. The project is modular, using separate components for QR scanning, dropdowns, and PDF generation.

