import React from 'react';
import ModalComponent from './Modal';
import { View, Text, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface InfoModalProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  title: string;
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const InfoModal = ({ variant, title, isOpen, onClose, message }: InfoModalProps) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'success':
        return <Icon name="check-circle" size={24} color="green" />;
      case 'error':
        return <Icon name="error" size={24} color="red" />;
      case 'warning':
        return <Icon name="warning" size={24} color="yellow" />;
      case 'info':
        return <Icon name="info" size={24} color="blue" />;
      default:
        return <Icon name="info" size={24} color="blue" />;
    }
  };
  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        {getVariantStyle()}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Button title="OK" onPress={onClose} color="blue" />
      </View>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default InfoModal;
