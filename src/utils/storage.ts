import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateToken, isTokenValid } from '../services/auth';

const TOKEN_KEY = '@auth_token';
const EMAIL_KEY = '@user_email';

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving token:', error);
    throw error;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(EMAIL_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
    throw error;
  }
};

export const saveEmail = async (email: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(EMAIL_KEY, email);
  } catch (error) {
    console.error('Error saving email:', error);
    throw error;
  }
};

export const getEmail = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(EMAIL_KEY);
  } catch (error) {
    console.error('Error getting email:', error);
    return null;
  }
};

/**
 * Get valid token - returns token jika masih valid, null jika expired
 */
export const getValidToken = async (): Promise<string | null> => {
  try {
    const token = await getToken();
    if (!token) {
      return null;
    }

    // Validate token expiry
    if (isTokenValid(token)) {
      return token;
    } else {
      // Token expired, remove it
      await removeToken();
      return null;
    }
  } catch (error) {
    console.error('Error getting valid token:', error);
    return null;
  }
};

/**
 * Get email from token jika token valid
 */
export const getEmailFromToken = async (): Promise<string | null> => {
  try {
    const token = await getToken();
    if (!token) {
      return null;
    }

    return validateToken(token);
  } catch (error) {
    console.error('Error getting email from token:', error);
    return null;
  }
};