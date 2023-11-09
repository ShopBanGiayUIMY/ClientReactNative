import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import { DotIndicator } from 'react-native-indicators';

const LoadingScreen = ({ isVisible }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => {
      }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <DotIndicator color='red' animationDuration={1200} />
      </View>
    </Modal>
  );
};

export default LoadingScreen;
