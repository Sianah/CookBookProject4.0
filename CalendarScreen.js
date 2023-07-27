import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun', 'Jul.', 'Aug', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

LocaleConfig.defaultLocale = 'en';

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
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    padding: 10,
  },
});

