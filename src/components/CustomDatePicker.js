import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';  // Correctly importing the DatePicker from the package

const CustomDatePicker = ({selectedDate, onChange }) => {
  const [date, setDate] = useState(selectedDate ? new Date(selectedDate) : new Date());
  const [open, setOpen] = useState(false);  // State to control the modal visibility

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    onChange(selectedDate);  // Notify parent component with the selected date
    setOpen(false);  // Close the date picker after selection
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setOpen(true)} // Open the date picker when tapped
      >
        <Text style={styles.dateText}>
        {date ? date.toDateString() : "Select Date"}
           {/* Display selected date or placeholder */}
        </Text>
      </TouchableOpacity>

      {/* Date Picker modal */}
      <DatePicker
        modal
        mode='date'
        open={open}
        date={date}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}  // Close the picker on cancel
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateButton: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row', // Align the text and calendar icon horizontally

    borderWidth: 1, padding: 10, marginBottom: 16 ,borderRadius:10
  },
  dateText: {
    fontSize: 16,
    color: '#000', // Text color
    marginRight: 10, // Space between text and icon
  },
  calendarIcon: {
    fontSize: 24, // Icon size
    marginLeft: 1, // Space between text and icon
  },
});

export default CustomDatePicker;
