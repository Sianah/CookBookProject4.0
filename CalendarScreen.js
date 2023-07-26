import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun', 'Jul.', 'Aug', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

LocaleConfig.defaultLocale = 'en';

export default function CalendarScreen({ navigation }) {
  const [markedDates, setMarkedDates] = useState({});

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

