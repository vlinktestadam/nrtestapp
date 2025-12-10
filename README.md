# React Native Test Application - Technical Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Prerequisites](#prerequisites)
4. [Installation & Setup](#installation--setup)
5. [Project Structure](#project-structure)
6. [Key Features](#key-features)
7. [Authentication System](#authentication-system)
8. [API Integration](#api-integration)
9. [Component Documentation](#component-documentation)
10. [Navigation Structure](#navigation-structure)
11. [State Management](#state-management)
12. [Development Guidelines](#development-guidelines)
13. [Testing](#testing)
14. [Troubleshooting](#troubleshooting)

---

## Project Overview

This is a React Native application built with TypeScript that demonstrates a complete authentication flow, data fetching, and navigation patterns. The application integrates with JSONPlaceholder API to display posts and user information.

### Key Capabilities

- **Authentication**: JWT-based authentication with token validation
- **Data Fetching**: RESTful API integration with loading states
- **Navigation**: Stack-based navigation with authentication guards
- **State Management**: Context API for global state
- **User Experience**: Toast notifications, skeleton loaders, and error handling

---

## Architecture & Tech Stack

### Core Technologies

- **React Native**: `0.82.1` - Cross-platform mobile framework
- **React**: `19.1.1` - UI library
- **TypeScript**: `5.8.3` - Type-safe JavaScript
- **Node.js**: `>=20` - Runtime environment

### Key Dependencies

#### Navigation
- `@react-navigation/native`: `^7.1.25` - Navigation library
- `@react-navigation/native-stack`: `^7.8.6` - Stack navigator
- `react-native-screens`: `^4.18.0` - Native screen components
- `react-native-safe-area-context`: `^5.5.2` - Safe area handling
- `react-native-gesture-handler`: `^2.29.1` - Gesture recognition

#### State & Storage
- `@react-native-async-storage/async-storage`: `^2.2.0` - Persistent storage

#### Networking
- `axios`: `^1.13.2` - HTTP client

#### Authentication
- `expo-jwt`: `^1.8.2` - JWT token generation and validation

#### UI Components
- `react-native-vector-icons`: `^10.3.0` - Icon library

### Development Tools

- **Metro**: JavaScript bundler for React Native
- **ESLint**: Code linting
- **Jest**: Testing framework
- **TypeScript**: Type checking

---

## Prerequisites

Before you begin, ensure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide.

### Required Software

- **Node.js**: Version 20 or higher
- **npm** or **yarn**: Package manager
- **React Native CLI**: `@react-native-community/cli`
- **Xcode** (macOS only): For iOS development
- **Android Studio**: For Android development
- **Java Development Kit (JDK)**: Version 17 or higher

### Platform-Specific Requirements

#### iOS (macOS only)
- Xcode 14 or higher
- CocoaPods
- Ruby bundler

#### Android
- Android Studio
- Android SDK (API level 33 or higher)
- Android Emulator or physical device

---

## Installation & Setup

### Step 1: Clone and Install Dependencies

```sh
# Navigate to project directory
cd nrtestapp

# Install dependencies
npm install
# OR
yarn install
```

### Step 2: iOS Setup (macOS only)

Install CocoaPods dependencies:

```sh
# First time setup - install Ruby bundler
bundle install

# Install CocoaPods dependencies
cd ios
bundle exec pod install
cd ..
```

For more information, visit the [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

### Step 3: Start Metro Bundler

Start the Metro development server:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

Metro will start on port 8081 by default. Keep this terminal window open.

### Step 4: Run the Application

#### Android

Open a new terminal window and run:

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### iOS (macOS only)

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

The application will launch in the Android Emulator, iOS Simulator, or your connected device.

### Alternative: Build from IDE

You can also build and run the app directly from:
- **Android Studio**: Open `android/` folder
- **Xcode**: Open `ios/nrtestapp.xcworkspace`

---

## Project Structure

```
nrtestapp/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── ConfirmModal.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── InfoModal.tsx
│   │   ├── ItemCard.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── LogoutButton.tsx
│   │   ├── Modal.tsx
│   │   ├── SkeletonCard.tsx
│   │   └── Toast.tsx
│   ├── context/              # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ToastContext.tsx
│   ├── navigation/           # Navigation configuration
│   │   └── NavigationStack.tsx
│   ├── screens/             # Screen components
│   │   ├── Detail.tsx
│   │   ├── Home.tsx
│   │   └── Login.tsx
│   ├── services/            # API and business logic
│   │   ├── api.ts
│   │   └── auth.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   └── utils/               # Utility functions
│       ├── storage.ts
│       └── validation.ts
├── android/                 # Android native code
├── ios/                     # iOS native code
├── App.tsx                  # Root component
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

---

## Key Features

### 1. Authentication Flow

- **Login Screen**: Email/password authentication with validation
- **JWT Token Management**: Token generation, storage, and validation
- **Auto-logout**: Automatic logout on token expiration
- **Session Persistence**: Tokens stored in AsyncStorage

**Default Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

### 2. Data Display

- **Home Screen**: Lists posts from JSONPlaceholder API
- **Detail Screen**: Shows post details and associated user information
- **Pull-to-Refresh**: Refresh data by pulling down
- **Skeleton Loading**: Loading states with skeleton placeholders

### 3. User Experience

- **Toast Notifications**: Success and error messages
- **Error Handling**: Comprehensive error handling throughout the app
- **Loading States**: Visual feedback during async operations
- **Form Validation**: Client-side validation for login form

### 4. Navigation

- **Protected Routes**: Authentication-based navigation
- **Stack Navigation**: Native stack navigator with header customization
- **Deep Linking**: Support for navigation with parameters

---

## Authentication System

### Overview

The application uses JWT (JSON Web Tokens) for authentication. Tokens are generated client-side using `expo-jwt` and stored securely in AsyncStorage.

### Token Configuration

- **Algorithm**: HS256
- **Expiration**: 1 hour (3600 seconds)
- **Secret Key**: `s3cr3tK3yF0rJWT` (should be moved to environment variables in production)

### Authentication Flow

1. **Login Process**:
   ```
   User enters credentials → Validation → Token generation → Storage → Navigation to Home
   ```

2. **Token Validation**:
   - On app launch, `AuthContext` checks for valid token
   - Token expiration is validated before allowing access
   - Expired tokens are automatically removed

3. **Logout Process**:
   ```
   User clicks logout → Token removal → Navigation to Login
   ```

### Key Files

- `src/services/auth.ts`: JWT token generation and validation
- `src/utils/storage.ts`: Token storage and retrieval
- `src/context/AuthContext.tsx`: Authentication state management

### Security Considerations

⚠️ **Important**: The current implementation uses a hardcoded secret key. In production:
- Move secret key to environment variables
- Use secure token storage (e.g., Keychain/Keystore)
- Implement refresh token mechanism
- Add token refresh logic before expiration

---

## API Integration

### Base Configuration

The application integrates with [JSONPlaceholder](https://jsonplaceholder.typicode.com), a fake REST API for testing.

**Base URL**: `https://jsonplaceholder.typicode.com`

### API Service

Located in `src/services/api.ts`, the `restAPI` function provides a generic wrapper for API calls:

```typescript
restAPI<T>(url: string, method: string, body: any): Promise<T>
```

### Endpoints Used

1. **Get Posts**: `GET /posts`
   - Returns: Array of `Item` objects
   - Used in: Home screen

2. **Get Post Detail**: `GET /posts/{id}`
   - Returns: Single `Item` object
   - Used in: Detail screen

3. **Get User**: `GET /users/{id}`
   - Returns: Single `User` object
   - Used in: Detail screen

### Error Handling

API errors are caught and logged. The application displays user-friendly error messages via toast notifications.

---

## Component Documentation

### Core Components

#### Button (`src/components/Button.tsx`)
Reusable button component with loading state support.

**Props:**
- `title`: string - Button text
- `onPress`: () => void - Press handler
- `loading?`: boolean - Loading state
- `color?`: string - Button color theme

#### ItemCard (`src/components/ItemCard.tsx`)
Displays a post item in a card format.

**Props:**
- `item`: Item - Post data object

#### SkeletonCard (`src/components/SkeletonCard.tsx`)
Loading placeholder component that mimics card layout.

#### LogoutButton (`src/components/LogoutButton.tsx`)
Header button component for logout functionality.

**Features:**
- Confirmation modal before logout
- Integrated with AuthContext

#### Toast (`src/components/Toast.tsx`)
Toast notification component for user feedback.

**Types:**
- `success`: Green toast for success messages
- `error`: Red toast for error messages

#### Modal (`src/components/Modal.tsx`)
Reusable modal component with backdrop.

**Props:**
- `visible`: boolean - Visibility state
- `onClose`: () => void - Close handler
- `children`: ReactNode - Modal content

### Context Components

#### AuthContext (`src/context/AuthContext.tsx`)
Manages authentication state across the application.

**Methods:**
- `isAuthenticated`: boolean - Current auth status
- `setIsAuthenticated`: (value: boolean) => void - Update auth status
- `checkAuthStatus`: () => Promise<void> - Validate token
- `logout`: () => Promise<void> - Logout user

**Usage:**
```typescript
const { isAuthenticated, logout } = useAuth();
```

#### ToastContext (`src/context/ToastContext.tsx`)
Manages toast notifications globally.

**Methods:**
- `showToast`: (message: string, type: 'success' | 'error') => void

**Usage:**
```typescript
const { showToast } = useToast();
showToast('Login successful!', 'success');
```

---

## Navigation Structure

### Navigation Stack

The application uses React Navigation's native stack navigator with conditional rendering based on authentication status.

### Route Types

```typescript
type NavigationStackParamList = {
  Login: undefined;
  Home: undefined;
  Detail: { id: number };
};
```

### Navigation Flow

```
┌─────────┐
│  Login  │ (Unauthenticated)
└────┬────┘
     │ (Login Success)
     ▼
┌─────────┐
│  Home   │ (Authenticated)
└────┬────┘
     │ (Select Item)
     ▼
┌─────────┐
│ Detail  │ (Authenticated)
└─────────┘
```

### Navigation Guards

- **AuthStack**: Shown when `isAuthenticated === false`
  - Contains only Login screen

- **MainStack**: Shown when `isAuthenticated === true`
  - Contains Home and Detail screens
  - Header back button disabled on Home screen

### Header Configuration

- **Home Screen**: 
  - Title: "Home"
  - Back button: Hidden
  - Right: LogoutButton

- **Detail Screen**:
  - Title: "Detail"
  - Back button: Visible with "Kembali" label
  - Right: LogoutButton

---

## State Management

### Context API

The application uses React Context API for global state management:

1. **AuthContext**: Authentication state
2. **ToastContext**: Toast notification state

### Local State

Components use React hooks (`useState`, `useEffect`) for local state management:

- Form inputs
- Loading states
- Error messages
- Data fetching

### Data Flow

```
User Action → Component Handler → Context/API Call → State Update → UI Re-render
```

---

## Development Guidelines

### Code Style

- **TypeScript**: Strict typing throughout the codebase
- **ESLint**: Follow ESLint rules (run `npm run lint`)
- **Naming Conventions**:
  - Components: PascalCase (e.g., `ItemCard.tsx`)
  - Functions: camelCase (e.g., `fetchItems`)
  - Constants: UPPER_SNAKE_CASE (e.g., `TOKEN_KEY`)

### File Organization

- **Components**: Reusable UI components in `src/components/`
- **Screens**: Full-screen components in `src/screens/`
- **Services**: API and business logic in `src/services/`
- **Utils**: Helper functions in `src/utils/`
- **Types**: TypeScript interfaces in `src/types/`

### Best Practices

1. **Error Handling**: Always wrap async operations in try-catch
2. **Loading States**: Show loading indicators for async operations
3. **Type Safety**: Use TypeScript types for all props and functions
4. **Component Reusability**: Extract reusable logic into components
5. **Context Usage**: Use context for truly global state only

### Adding New Features

1. Create component/service in appropriate directory
2. Add TypeScript types if needed
3. Integrate with existing navigation/context
4. Add error handling and loading states
5. Test on both iOS and Android

---

## Testing

### Running Tests

```sh
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure

Tests are located in `__tests__/` directory. The project uses Jest and React Native Testing Library.

### Example Test

```typescript
import { render, screen } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
    // Add assertions
  });
});
```

---

## Troubleshooting

### Common Issues

#### Metro Bundler Issues

**Problem**: Metro bundler not starting or cache issues

**Solution**:
```sh
# Clear Metro cache
npm start -- --reset-cache

# Clear watchman
watchman watch-del-all

# Clear node modules and reinstall
rm -rf node_modules
npm install
```

#### iOS Build Issues

**Problem**: CocoaPods or Xcode build errors

**Solution**:
```sh
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
cd ..
```

#### Android Build Issues

**Problem**: Gradle build errors or SDK issues

**Solution**:
```sh
cd android
./gradlew clean
cd ..
```

#### TypeScript Errors

**Problem**: Type errors or missing types

**Solution**:
```sh
# Check TypeScript configuration
npx tsc --noEmit

# Reinstall type definitions
npm install --save-dev @types/react @types/react-native
```

### Debugging

#### React Native Debugger

1. Enable Debug Menu: `Cmd + M` (iOS) or `Ctrl + M` (Android)
2. Select "Debug"
3. Use Chrome DevTools or React Native Debugger

#### Console Logs

Use `console.log()` for debugging. Logs appear in:
- Metro bundler terminal
- Chrome DevTools console (when debugging)
- React Native Debugger

#### Network Debugging

- Use React Native Debugger's Network tab
- Check Metro bundler logs for API calls
- Verify API endpoints are accessible

### Performance Optimization

1. **Image Optimization**: Use optimized image formats and sizes
2. **List Optimization**: Use `FlatList` with proper `keyExtractor`
3. **Memoization**: Use `React.memo` and `useMemo` for expensive operations
4. **Lazy Loading**: Implement pagination for large lists

---

## Additional Resources

### Official Documentation

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Community Resources

- [React Native Community](https://github.com/react-native-community)
- [React Native Directory](https://reactnative.directory/)

### Development Tools

- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [Flipper](https://fbflipper.com/) - Platform debugging tool

---

## License

This project is private and proprietary.

---

## Support

For issues and questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review React Native [documentation](https://reactnative.dev/docs/troubleshooting)
3. Check project issues and discussions

---

**Last Updated**: 2024
