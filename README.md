# React Native QR Code Scanning, Custom Dropdowns, and PDF Generation

## Objective

Build a React Native Android application demonstrating the ability to implement QR code scanning, custom dropdowns, and PDF generation. The application includes two pages with functionality for scanning QR codes, entering data, displaying the data, selecting values from dropdowns, and generating and sharing a PDF.

## Table of Contents
1.Folder Structure
2. [Technologies Used](#technologies-used)
3. [Application Structure](#application-structure)
4. [Features](#features)
    - [Page 1 - QR Code Scanning and Data Entry](#page-1---qr-code-scanning-and-data-entry)
    - [Page 2 - Data Display, Dropdowns, and PDF Generation](#page-2---data-display-dropdowns-and-pdf-generation)
5. [Conclusion](#conclusion)

---


### Folder Structure Explanation:

- **/src**: Contains all the source code for the app.
  - **/components**: Reusable components used throughout the app.
    - **QRCodeScanner.js**: Implements the QR code scanner using `react-native-vision-camera`.
    - **Dropdown.js**: Custom dropdown component for selecting vehicle, owner, and state.
    - **PDFGenerator.js**: Handles PDF generation functionality.
  - **/screens**: Contains the two pages of the app.
    - **Page1.js**: Handles QR scanning, data input (Eway Bill, Challa No, Expense, Load Date), and navigation.
    - **Page2.js**: Displays the scanned data, dropdowns, and includes a submit button to generate the PDF.
  - **App.js**: Main entry point of the app that sets up navigation and routing.
             -- Main component with navigation setup

## Technologies Used

- **React Native**: For building the cross-platform mobile application.
- **react-native-vision-camera**: For implementing QR code scanning.
- **react-native-pdf-lib**: For generating the PDF file.
- **React Navigation**: For managing navigation between pages.
- **Date Picker**: For selecting the Load Date.
  

---

## Conclusion

This **React Native** application demonstrates the implementation of QR code scanning, custom dropdowns, and PDF generation, providing a comprehensive example of these features. The project is modular, with separate components for QR scanning, dropdowns, and PDF generation, ensuring easy management and scalability.

--- 

Feel free to customize or expand upon this **README** based on your project's specific needs and features.
