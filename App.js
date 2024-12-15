// src/App.js
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Page1 from "./src/screens/Page1";
import Page2 from "./src/screens/Page2";

const App = () => {
  const [page, setPage] = useState(1); // Navigation between pages
  const [data, setData] = useState({}); // Shared state between pages

  const navigateToPage2 = (formData) => {
    setData(formData); // Pass data to Page 2
    setPage(2);
  };

  return (
    <View style={styles.container}>
      {page === 1 && <Page1 onNext={navigateToPage2} />}
      {page === 2 && <Page2 data={data} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1,
    backgroundColor:'white'
   },
});

export default App;
