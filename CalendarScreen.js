import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun', 'Jul.', 'Aug', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

LocaleConfig.defaultLocale = 'en';


export default function CalendarScreen({ navigation }) {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    // Load marked dates when the component mounts
    const loadMarkedDates = async () => {
      try {
        const savedMarkedDates = await AsyncStorage.getItem('markedDates');
        if (savedMarkedDates) {
          setMarkedDates(JSON.parse(savedMarkedDates));
        }
      } catch (error) {
        console.error("Failed to load the marked dates.", error);
      }
    };

    loadMarkedDates();
  }, []);

  const onDayPress = (day) => {
    let newMarkedDates = { ...markedDates };

    // If date is already selected, unselect it
    if (newMarkedDates[day.dateString]) {
      delete newMarkedDates[day.dateString];
    } else {
      newMarkedDates[day.dateString] = {
        selected: true,
        marked: true,
      };
    }
    setMarkedDates(newMarkedDates);
    // Save the updated marked dates to AsyncStorage
    AsyncStorage.setItem('markedDates', JSON.stringify(newMarkedDates));
  };

  return (
    <ImageBackground source={require('./ingredients.jpg')} style={styles.container}>
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
      />
      <View style={styles.guidanceBox}>
      <Text style={styles.guidanceText}>
        Tap On the Days that You Will Be Preparing Your Meals
      </Text>
    </View>
  </View>
  </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 10,
    
  },
  guidanceBox: {
    marginTop: 20,
    backgroundColor: '#f2f2f2',  // Light gray background for the box
    padding: 10,                  // Padding inside the box
    borderRadius: 8,              // Rounded corners for the box
    shadowColor: "#000",          // Below are shadow settings for a raised effect
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
},
guidanceText: {
    textAlign: 'center',
    color: '#000',          // Changing color to black for better contrast
    fontSize: 18,           // Increasing the font size
    fontWeight: 'bold',     // Making the text bold
    fontStyle: 'italic',    // Adding an italic style
},


});





