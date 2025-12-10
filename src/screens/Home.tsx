import React, { useMemo, useState } from 'react'
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ItemCard from '../components/ItemCard'
import SkeletonCard from '../components/SkeletonCard'
import LogoutButton from '../components/LogoutButton'
import { getEmailFromToken } from '../utils/storage'
import { restAPI } from '../services/api'
import { Item } from '../types'

const Home = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutButton />,
    });
    fetchItems();
  }, [navigation]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      // Simulasi delay 2 detik untuk skeleton loading
      await new Promise((resolve) => setTimeout(() => resolve(true), 2000));
      const items = await restAPI<Item[]>('/posts', 'GET', {}) as Item[];
      setItems(items);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchItems();
    } catch (error) {
      console.error('Error refreshing items:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const email = useMemo(() => getEmailFromToken(), []);

  const skeletonData = Array.from({ length: 5 }, (_, i) => ({ id: `skeleton-${i}`, userId: 0, title: '', body: '' }) as unknown as Item);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome, </Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <FlatList
        data={loading && !refreshing ? skeletonData : items}
        renderItem={({ item }) => 
          loading && !refreshing ? (
            <SkeletonCard />
          ) : (
            <ItemCard item={item as Item} />
          )
        }
        ListEmptyComponent={
          !loading ? <Text style={styles.emptyText}>No items found</Text> : null
        }
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
  },
  email: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 10,
  },
  itemsContainer: {
    flex: 1,
    width: '100%',
  },
  item: {
    width: '100%',
    height: 100,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
});