import { StyleSheet, Text, View, Switch } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from "react-native-event-listeners";
import ThemeContext from "../../components/Theme/themContext";

const DarkMod = () => {
  const theme = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const retrieveDarkMode = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem('darkMode');
        if (storedDarkMode !== null) {
          setDarkMode(JSON.parse(storedDarkMode));
        }
      } catch (error) {
        console.error('Error retrieving darkMode state:', error);
      }
    };
    retrieveDarkMode();
  }, []);

  const toggleDarkMode = async (value) => {
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(value));
    } catch (error) {
      console.error('Error saving darkMode state:', error);
    }
    setDarkMode(value);
    EventRegister.emit('ChangeTheme', value);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.txt, { color: theme.color }]}>
        {darkMode ? "Chuyển chế độ sáng" : "Chuyển chế độ tối"}
      </Text>
      
      <Switch
        value={darkMode}
        onValueChange={(value) => toggleDarkMode(value)}
      />
    </View>
  );
};

export default DarkMod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
