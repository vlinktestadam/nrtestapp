import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationStackParamList } from '../navigation/NavigationStack'
import { Item } from '../types'

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigationStackParamList>>();

  const handlePress = () => {
    navigation.navigate('Detail', { id: item.id });
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body} numberOfLines={2}>{item.body}</Text>
      <Text style={styles.userId}>User ID: {item.userId}</Text>
    </TouchableOpacity>
  )
}

export default ItemCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  body: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  userId: {
    fontSize: 12,
    color: '#999',
  },
});