import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import { saveEmail, saveToken } from '../utils/storage';
import { generateToken } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const { setIsAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validationFields = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!emailValidate(email)) {
      setError('Invalid email');
      return false;
    } else if (!password) {
      setError('Password is required');
      return false;
    }
    setError('');
    return true;
  };

  const emailValidate = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async () => {
    if (!validationFields()) {
      return;
    }
    setLoading(true);
    try {
      // Simulasi validasi login (ganti dengan API call jika ada backend)
      setTimeout(async () => {
        if (email === 'admin@example.com' && password === 'admin123') {
          const token = generateToken(email);
          await saveToken(token);
          await saveEmail(email);
          setIsAuthenticated(true);
          showToast('Login successful!', 'success');
        } else {
          setError('Invalid email or password');
          showToast('Invalid email or password', 'error');
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Login failed. Please try again.');
      showToast('Login failed. Please try again.', 'error');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email: </Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
          autoFocus={true}
          autoCapitalize="none"
          returnKeyType="next"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="Password"
            autoCapitalize="none"
            returnKeyType="done"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
          >
            <Icon 
              name={showPassword ? 'visibility' : 'visibility-off'} 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        color="blue"
        title="Login"
        onPress={handleLogin}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Login;