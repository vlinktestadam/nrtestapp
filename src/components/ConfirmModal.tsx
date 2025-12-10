import React from 'react';
import ModalComponent from './Modal';
import Button from './Button';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  loading: boolean;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  loading,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>ConfirmModal</Text>
        <Text style={styles.message}>{message}</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="blue" />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} color="red" />
            <Button title="Confirm" onPress={onConfirm} color="green" />
          </View>
        )}
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
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default ConfirmModal;
