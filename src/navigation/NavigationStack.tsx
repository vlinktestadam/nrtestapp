import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Login from '../screens/Login';
import Home from '../screens/Home';
import Detail from '../screens/Detail';

import { useAuth } from '../context/AuthContext';

export type NavigationStackParamList = {
  Login: undefined;
  Home: undefined;
  Detail: { id: number };
};

const Stack = createNativeStackNavigator<NavigationStackParamList>();

// Auth Stack - untuk user yang belum login
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

// Main Stack - untuk user yang sudah login
const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={Home}
        options={{ 
          title: 'Home',
          headerBackVisible: false
        }}
      />
      <Stack.Screen 
        name="Detail" 
        component={Detail}
        options={{ 
          title: 'Detail', 
          headerBackVisible: true,
          headerBackTitle: 'Kembali',
        }}
      />
    </Stack.Navigator>
  );
};

const NavigationStack = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default NavigationStack;