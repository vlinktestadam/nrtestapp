import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <View style={styles.container}>
      <Text>ErrorMessage</Text>
      <Text>{errorMessage}</Text>
      <Button title="Retry" onPress={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
});

export default ErrorMessage