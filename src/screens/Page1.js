import React, { useState ,useEffect, } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView ,BackHandler, Image } from "react-native";
import QRCodeScanner from "../components/QRCodeScanner";  
import CustomDatePicker from "../components/CustomDatePicker";

import qr1 from '../assets/images/qr1.png'
import AllQRCodes from '../assets/images/AllQRCodes.png'
const Page1 = ({ onNext }) => {
  const [qrData, setQrData] = useState(""); 
  const [inputs, setInputs] = useState({ ewayBill: "", challaNo: "", expense: "",  loadDate: new Date().toDateString() });
  const [scanned, setScanned] = useState(false); 
  const [isScanning, setIsScanning] = useState(false); 

 
  // Handle QR code scan
  const handleQRScan = (scannedData) => {
    const qrValue = scannedData[0].value;
    const parsedData = qrValue.split('\n');
    setQrData(parsedData)
    setScanned(true);   // Mark as scanned
    setIsScanning(false);  // Hide scanner buttons after scan
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    setInputs({ ...inputs, [field]: value });
  };

  // Handle next button click
  const handleNext = () => {
    const { ewayBill, challaNo, expense, loadDate } = inputs;

    if (!qrData || !ewayBill || !challaNo || !expense || !loadDate) {
      alert("Please fill all fields before proceeding!");
      return;
    }

    onNext({ qrData, ...inputs });
  };

  // Handle load date change
  const handleDateChange = (selectedDate) => {
    setInputs((prevState) => ({
      ...prevState,
      loadDate: selectedDate || new Date().toDateString(), // Fallback to today's date
    }));
  };

    // Handle back button press when scanning is done
    useEffect(() => {
        const backAction = () => {
          if (isScanning || scanned) {
            // Reset the scanning state if back is pressed
            setIsScanning(false);
            setScanned(false);
            return true; // Prevent the default back action
          }
          return false; // Allow the default back action if no QR is scanned
        };
    
        // Add back button listener
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    
        // Cleanup the listener on component unmount
        return () => backHandler.remove();
      }, [isScanning || scanned]);

  return (
    <View style={styles.container}>
      {/* Start Scan Button */}
      {!isScanning && !scanned && (

      <Image source={AllQRCodes} style={{ width:195, height: 195,alignSelf:"center" ,marginBottom:90,marginVertical:50}} />
      )}
      {!isScanning && !scanned && (


        <TouchableOpacity style={styles.startScanButton} onPress={() => setIsScanning(true)}>
            <View>

            <Text style={styles.startScanButtonText}>Scanner 1</Text>

            </View>
        </TouchableOpacity>
      )}

{!isScanning && !scanned && (
        <TouchableOpacity style={styles.startScanButton} onPress={() => setIsScanning(true)}>
          <View>
            <Text style={styles.startScanButtonText}>Scanner 2</Text>

            </View>
        </TouchableOpacity>
      )}

{!isScanning && !scanned && (
        <TouchableOpacity style={styles.startScanButton} onPress={() => setIsScanning(true)}>
          <View>
            <Text style={styles.startScanButtonText}>Scanner 3</Text>

            </View>
          
        </TouchableOpacity>
      )}

      {/* QR Code Scanner */}
      {isScanning && (
        <QRCodeScanner onScan={handleQRScan} />
      )}

      {/* After scan, hide QR scanner buttons and show scanned QR code and inputs */}
      {scanned && (
        <ScrollView>
        {/* <Button title="Re Scan" onPress={() => {
            setIsScanning(true);
            setScanned(false);
          }} /> */}

<TouchableOpacity
            style={styles.reScan}
            onPress={() => {
                setIsScanning(true);
                setScanned(false);
              }}
          >
            <Text style={styles.reScanText}>Re-Scan</Text>
            <Image source={qr1} style={{ width: 25, height: 25, }} />
          </TouchableOpacity>


          <Text style={styles.labelTop}>Scanned QR Code Data:</Text>
          <Text style={styles.qrDataValue}> {qrData}</Text>
          

          {/* Eway Bill No Input */}
          <Text style={styles.label}>Eway-Bill No:</Text>
          <TextInput
            style={styles.input}
            placeholder="Eway-Bill No"
            onChangeText={(value) => handleInputChange("ewayBill", value)}
          />

          {/* Challa No Input */}
          <Text style={styles.label}>Challa No:</Text>
          <TextInput
            style={styles.input}
            placeholder="Challa No"
            onChangeText={(value) => handleInputChange("challaNo", value)}
          />

          {/* Expense Input */}
          <Text style={styles.label}>Expense:</Text>
          <TextInput
            style={styles.input}
            placeholder="Expense"
            keyboardType="numeric"
            onChangeText={(value) => handleInputChange("expense", value)}
          />

          {/* Load Date Picker */}
          <Text style={styles.label}>Load Date:</Text>
          <CustomDatePicker
            selectedDate={inputs.loadDate}
            onChange={handleDateChange}
          />

          {/* Next Button */}
          <TouchableOpacity
            style={ styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 ,marginTop:10},
  reScan:{backgroundColor: "#28a745",borderRadius:25 ,
    elevation:10,
    width:'30%',
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"flex-end",
    gap:6,
    paddingVertical:10

},
reScanText:{color:'white',fontWeight:'bold'},
labelTop:{marginTop:5, fontSize: 16, fontWeight: "bold",fontSize: 16},
qrDataValue:{marginVertical:15,fontWeight:"700",fontSize: 15},
label: { fontSize: 16, fontWeight: "bold", marginVertical: 8 },
  input: { borderWidth: 1, padding: 12, marginBottom: 16 ,borderRadius:10},
  startScanButton: {
    backgroundColor: "#4CAF50", 
    padding: 15, 
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20
  },
  startScanButtonText: {
    color: "#fff", 
    fontSize: 18, 
    fontWeight: 'bold',
  },
  nextButton: { backgroundColor: "#28a745",borderRadius:25 , paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    elevation:4,
},
buttonText:{
    color:'white',
    fontWeight:'bold',
    fontSize:20,
}


});

export default Page1;
