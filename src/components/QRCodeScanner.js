import React, { useEffect, useState } from "react";
import { Alert, View, Text, StyleSheet, Button } from "react-native";
import { Camera, useCameraDevices, useCodeScanner, useCameraPermission, useCameraDevice } from "react-native-vision-camera";

const QRCodeScanner = ({ onScan }) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  
  // State to manage whether the scanner is active
  const [scannerActive, setScannerActive] = useState(true);

  // Hook for scanning codes
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`);
      onScan(codes); // Pass the scanned data to the onScan function

      // Deactivate the scanner after scanning
      setScannerActive(false);
    }
  });

  // Request permission when the component mounts
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  // Handle case where device is not available or permission is denied
  if (!device) {
    console.log("Camera Device Not Available");
    return <Text>Loading Camera...</Text>;
  }

  // Handle when permission is not granted
  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No Camera Permission</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Only render Camera when scanner is active */}
      {scannerActive && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner} // Use the code scanner hook here
        />
      )}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default QRCodeScanner;
