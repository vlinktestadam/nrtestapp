import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from './ConfirmModal';
import { useToast } from '../context/ToastContext';

interface LogoutButtonProps {
  iconSize?: number;
  iconColor?: string;
}

const LogoutButton = ({
  iconSize = 24,
  iconColor = '#007AFF',
}: LogoutButtonProps) => {
  const { logout } = useAuth();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handlePress = async () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        await logout();
        setIsConfirmModalOpen(false);
        setIsLoading(false);
        showToast('Logout successful!', 'success');
      }, 2000);
    } catch (error) {
      console.error('Error logging out:', error);
      showToast('Logout failed. Please try again.', 'error');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        style={styles.logoutButton}
        activeOpacity={0.7}
      >
        <Icon name="logout" size={iconSize} color={iconColor} />
      </TouchableOpacity>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        message="Are you sure you want to logout?"
        loading={isLoading}
      />
    </>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    padding: 4,
  },
});

export default LogoutButton;
