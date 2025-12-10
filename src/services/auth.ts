import jwt, { SupportedAlgorithms } from 'expo-jwt';

// Secret key untuk sign JWT (dalam production, simpan di environment variable)
const JWT_SECRET = 's3cr3tK3yF0rJWT';

interface JWTPayload {
  email: string;
  iat: number; // issued at
  exp: number; // expiration
}

/**
 * Generate JWT token berdasarkan email dengan expired time 1 jam
 */
export const generateToken = (email: string): string => {
  const now = Math.floor(Date.now() / 1000);
  const payload: JWTPayload = {
    email,
    iat: now,
    exp: now + 3600, // 1 jam = 3600 detik
  };

  return jwt.encode(payload, JWT_SECRET, { algorithm: 'HS256' as SupportedAlgorithms });
};

/**
 * Validate dan decode JWT token
 * Returns email jika valid, null jika expired atau invalid
 */
export const validateToken = (token: string): string | null => {
  try {
    const decoded = jwt.decode(token, JWT_SECRET) as JWTPayload;
    
    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
      console.log('Token expired');
      return null;
    }

    return decoded.email;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

/**
 * Check apakah token masih valid (belum expired)
 */
export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token, JWT_SECRET) as JWTPayload;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp >= now;
  } catch (error) {
    return false;
  }
};