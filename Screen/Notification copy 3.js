import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const Notification = () => {
  const progress = useRef(new Animated.Value(0)).current;
  const [progressValue, setProgressValue] = useState(0);
  const [usage_quantity] = useState(120);

  useEffect(() => {
    const progressListener = progress.addListener(({ value }) => {
      setProgressValue(value);
    });

    return () => {
      progress.removeListener(progressListener);
    };
  }, [progress]);

  const increaseValue = () => {
    const newValue = Math.min(usage_quantity, progressValue + 10);
    if (progressValue < usage_quantity) {
      Animated.timing(progress, {
        toValue: newValue,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  };

  const width = progress.interpolate({
    inputRange: [0, usage_quantity],
    outputRange: ['0%', '100%'],
  });

  const progressPercentage = Math.max(0, Math.min(100, (progressValue / usage_quantity) * 100));

  return (
    <View style={styles.container}>
      <View style={styles.progressBarBackground}>
        <Animated.View style={[styles.progressBar, { width }]}>
          <Text style={styles.progressTextInsideBar}>
            {Math.round(progressPercentage)}% ({progressValue.toFixed(2)})
          </Text>
        </Animated.View>
      </View>
      <TouchableOpacity style={styles.button} onPress={increaseValue}>
        <Text style={styles.buttonText}>Giảm giá trị</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  progressTextInsideBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
  },
  progressBarBackground: {
    height: 20,
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#f00',
    borderRadius: 10,
  },
  progressText: {
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Notification;
