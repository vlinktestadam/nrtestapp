import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  )
}

export default LoadingSpinner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});