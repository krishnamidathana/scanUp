import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
  PermissionsAndroid,
  Alert,
  ScrollView,
} from "react-native";
import RNFS from "react-native-fs";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import ReactNativePrint from 'react-native-print';

const Page2 = ({ data }) => {
  const { qrData, ewayBill, challaNo, expense, loadDate } = data;

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [dropdownType, setDropdownType] = useState(""); // Tracks which dropdown is active
  const [isSubmitted, setIsSubmitted] = useState(false);  

  const vehicles = ["Truck 1", "Truck 2", "Truck 3"];
  const owners = ["Owner A", "Owner B", "Owner C","Owner D", "Owner E", "Owner F"];
  const states = ["Odisha","Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat"];

  const handleSelect = (item, type) => {
    if (type === "vehicle") setSelectedVehicle(item);
    if (type === "owner") setSelectedOwner(item);
    if (type === "state") setSelectedState(item);
    setModalVisible(false);
  };

  // Check if Truck Owner and Place (State) are selected
  const isFormValid = () => {
    return selectedOwner !== '' && selectedState !== '' && selectedVehicle; // Only validate Truck Owner and Place (State)
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    setIsSubmitted(true);
  };

  // Request download permission for Android
  const getDownloadPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'File Download Permission',
          message: 'Your permission is required to save files to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.log('Error while requesting permission:', err);
      return false;
    }
  };

  // Generate PDF from HTML content
  const generatePDF = async () => {
    const htmlContent = `
    <html>
      <head>
        <title>QR Code Details</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
          }
          h1 {
            text-align: center;
            font-size: 24px;
            margin-bottom: 30px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
          }
          th {
            font-weight: bold;
            text-transform: uppercase;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          tr:hover {
            background-color: #e0e0e0;
          }
          .container {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          }
          .content {
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Scanned QR Code Details</h1>
          <div class="content">
            <table>
              <tr>
                <th>QR Data</th>
                <td>${qrData.join("<br>")}</td>
              </tr>
              <tr>
                <th>Eway-Bill No</th>
                <td>${ewayBill}</td>
              </tr>
              <tr>
                <th>Challa No</th>
                <td>${challaNo}</td>
              </tr>
              <tr>
                <th>Expense</th>
                <td>${expense}</td>
              </tr>
              <tr>
                <th>Load Date</th>
                <td>${loadDate}</td>
              </tr>
              <tr>
                <th>Vehicle Name</th>
                <td>${selectedVehicle}</td>
              </tr>
              <tr>
                <th>Owner Name</th>
                <td>${selectedOwner}</td>
              </tr>
              <tr>
                <th>State</th>
                <td>${selectedState}</td>
              </tr>
            </table>
          </div>
        </div>
      </body>
    </html>`;

    const options = {
      html: htmlContent,
      fileName: 'QRCodeDetails',
      directory: 'Documents',
    };

    const pdf = await RNHTMLtoPDF.convert(options);
    return pdf.filePath; // Return the generated PDF file path
  };

  const handleShare = async () => {
    try {
      if (Platform.OS === "android") {
        const permissionGranted = await getDownloadPermissionAndroid();
        if (!permissionGranted) return;
      }
      const filePath = await generatePDF();
      const fileExists = await RNFS.exists(filePath);
      if (!fileExists) return;

      await Share.open({
        url: `file://${filePath}`,
        title: "QR Code Details",
        type: 'application/pdf',
      });
    } catch (error) {
      console.error("Error generating or sharing PDF:", error);
    }
  };

  const handleSave = async () => {
    try {
      const filePath = await generatePDF();
      alert(`PDF saved successfully! at  ${filePath}`);
    } catch (error) {
      console.error("Error saving PDF:", error);
    }
  };

  const handlePrint = async () => {
    try {
      const filePath = await generatePDF();
      await ReactNativePrint.print({ filePath: filePath });
    } catch (error) {
      console.error("Error printing PDF:", error);
    }
  };

  return (
    <View style={styles.container}>
        <ScrollView>
      {!isSubmitted ? (
        <>
          <Text style={styles.label}>Scanned QR Code Data:</Text>
          <Text style={styles.value}>{qrData.join(", ")}</Text>

          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              setDropdownType("vehicle");
              setModalVisible(true);
            }}
          >
            <Text>{selectedVehicle || "Select a Vehicle"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              setDropdownType("owner");
              setModalVisible(true);
            }}
          >
            <Text>{selectedOwner || "Select an Owner"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              setDropdownType("state");
              setModalVisible(true);
            }}
          >
            <Text>{selectedState || "Select a State"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handlePrint}
          >
            <Text style={styles.buttonText}>Print PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleShare}
          >
            <Text style={styles.buttonText}>Share PDF</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={dropdownType === "vehicle" ? vehicles : dropdownType === "owner" ? owners : states}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item, dropdownType)}
                >
                  <Text style={styles.dropdownText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, marginTop: 50 },
  label: { fontSize: 19, fontWeight: "bold", marginVertical: 8 },
  value: { fontSize: 16, marginBottom: 60, marginTop: 30 },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 25,
    width: '100%',
    alignItems: 'center',
    elevation:10,
  },
  buttonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  submitButton: { backgroundColor: "#28a745",borderRadius:25 ,elevation:10},
  buttonsContainer: { flexDirection: "column", marginTop: 30 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  dropdownItem: { padding: 10 },
  dropdownText: { fontSize: 18 },
  closeButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    marginTop: 20,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  closeText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default Page2;
