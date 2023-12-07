import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Notification = () => {
  const navigation = useNavigation();
  const numbers = [1, 2, 3, 4];
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showAllNumbers, setShowAllNumbers] = useState(false);

  const openComponent2 = () => {
    navigation.navigate('Component2', { numbers, selectedNumber });
  };

  const toggleNumbersDisplay = () => {
    setShowAllNumbers(!showAllNumbers);
  };

  return (
    <View>
      <Text>Notification</Text>
      <TouchableOpacity onPress={toggleNumbersDisplay}>
        <Text>Show Numbers</Text>
      </TouchableOpacity>
      {showAllNumbers ? (
        numbers.map((number) => (
          <TouchableOpacity
            key={number}
            onPress={() => setSelectedNumber(number)}
          >
            <Text>{number}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <TouchableOpacity onPress={openComponent2}>
          <Text>Selected Number: {selectedNumber || 'None'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Notification;
