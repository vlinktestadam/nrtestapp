import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import LogoutButton from '../components/LogoutButton'
import { NavigationStackParamList } from '../navigation/NavigationStack'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { restAPI } from '../services/api'
import { Item, User } from '../types'
import SkeletonCard from '../components/SkeletonCard'

const Detail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigationStackParamList>>();
  const { id } = useRoute<RouteProp<NavigationStackParamList, 'Detail'>>().params;
  const [item, setItem] = useState<Item | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutButton />,
    });
    fetchItemDetail();
  }, [navigation]);
  
  React.useEffect(() => {
    if (item?.userId) {
      fetchUserDetail();
    }
  }, [item?.userId]);

  const fetchItemDetail = async () => {
    try {
      const item = await restAPI<Item>(`/posts/${id}`, 'GET', {}) as Item;
      setItem(item);
    } catch (error) {
      console.error('Error fetching item detail:', error);
    }
  };

  const fetchUserDetail = async () => {
    try {
      setLoading(true);
      setTimeout(async () => {
        const user = await restAPI<User>(`/users/${item?.userId}`, 'GET', {}) as User;
        setUser(user);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error fetching user detail:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item?.title}</Text>
      <Text style={styles.body}>{item?.body}</Text>
      {
        loading ? (
          <SkeletonCard />
        ) : (
          <View style={styles.userContainer}>
            <Text style={styles.userName}>{user?.name}</Text>
            <View style={styles.userInfoContainer}>
              <Text style={styles.userInfo}>{user?.email}</Text>
              <Text style={styles.userInfo}>{user?.website}</Text>
            </View>
            <View style={styles.userInfoContainer}>
            <Text style={styles.userInfo}>{user?.phone}</Text>
              <Text style={styles.userInfo}>{user?.company.name}</Text>
            </View>
          </View>
        )
      }
    </View>
  )
}

export default Detail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    gap: 10,
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
  userContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  userInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});