import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
};

const Button = ({
  title,
  onPress,
  color,
  disabled,
  loading,
  size,
}: ButtonProps) => {
  const buttonStyle = StyleSheet.create({
    container: {
      backgroundColor: color,
      paddingHorizontal: size === 'small' ? 10 : size === 'medium' ? 15 : 20,
      paddingVertical: size === 'small' ? 4 : size === 'medium' ? 6 : 8,
      borderRadius: 10,
      margin: 10,
    },
    text: {
      color: 'white',
      fontSize: size === 'small' ? 12 : size === 'medium' ? 14 : 16,
      textAlign: 'center',
    },
  });

  if (loading) {
    return (
      <View style={buttonStyle.container}>
        <ActivityIndicator size="small" color="white" />
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={buttonStyle.container}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={buttonStyle.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
