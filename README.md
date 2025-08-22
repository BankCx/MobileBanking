# Bank of Checkmarx - Mobile Banking

This is the React Native mobile banking application for the intentionally vulnerable Bank of Checkmarx demo application. It provides a cross-platform mobile interface for banking operations on iOS and Android devices.

## Technology Stack
- **Framework**: React Native 0.71.0
- **Platform**: Expo ~48.0.0
- **Navigation**: React Navigation 6
- **HTTP Client**: Axios
- **Security**: React Native Keychain
- **Storage**: AsyncStorage
- **Crypto**: React Native Crypto JS

## Features
- User authentication and biometric login
- Account summary and balance display
- Secure fund transfers
- Transaction history
- Document upload and management
- Push notifications
- Offline data synchronization
- Multi-factor authentication

## Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (macOS) or Android Studio
- Access to Bank API and Core Backend services

### Installation
```bash
# Install dependencies
npm install

# Start Expo development server
npm start
# or
expo start

# Run on iOS simulator
npm run ios
# or
expo start --ios

# Run on Android emulator
npm run android
# or
expo start --android

# Run on web browser
npm run web
# or
expo start --web
```

### Development Setup
1. Install Expo CLI globally: `npm install -g @expo/cli`
2. Install dependencies: `npm install`
3. Start the development server: `expo start`
4. Scan QR code with Expo Go app on your device

## Environment Configuration
Create a `.env` file in the root directory:
```bash
EXPO_PUBLIC_API_BASE_URL=http://your-api-host:8000
EXPO_PUBLIC_CORE_API_URL=http://your-core-host:8080
EXPO_PUBLIC_API_KEY=your_api_key_here
```

## Docker Deployment

### Build Docker Image
```bash
docker build -t bank-mobile-banking .
```

### Run Container
```bash
docker run -p 19006:19006 bank-mobile-banking
```

### Using Docker Compose
```bash
# From project root
docker-compose up mobile-banking
```

## API Integration
The application integrates with:
- **Bank API** (port 8000) - Authentication, file operations
- **Core Backend** (port 8080) - Account management, transactions
- **Fraud Detection** (port 5000) - Transaction risk assessment

## Development

### Project Structure
```
src/
├── components/         # Reusable UI components
│   └── AccountSummary.js
├── screens/           # Screen components
│   ├── LoginScreen.js
│   └── TransferScreen.js
├── navigation/        # Navigation configuration
│   └── AppNavigator.js
├── services/          # API service layer
│   └── api.js
├── hooks/             # Custom React hooks
│   └── useSession.js
└── utils/             # Utility functions
    ├── crypto.js
    ├── sanitizer.js
    └── storage.js
```

### Available Scripts
- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web browser

### Building for Production

#### iOS Build
```bash
# Build for iOS App Store
expo build:ios --type app-store

# Build for iOS Enterprise
expo build:ios --type enterprise
```

#### Android Build
```bash
# Build APK
expo build:android --type apk

# Build AAB for Google Play
expo build:android --type app-bundle
```

## Security Features
- Biometric authentication (Touch ID/Face ID/Fingerprint)
- Secure keychain storage for sensitive data
- Certificate pinning for API calls
- Data encryption at rest
- Session management with automatic logout

## Security Notes

⚠️ **This is an intentionally vulnerable demo application.** Do not use in production.

Known vulnerabilities include:
- Hardcoded API keys and secrets
- Insecure data storage practices
- Insufficient certificate validation
- Client-side security controls
- Weak encryption implementations
- SQL injection in API calls
- Command injection vulnerabilities

## Platform-Specific Notes

### iOS
- Requires Xcode for building
- CocoaPods for native dependencies
- iOS 11.0+ supported

### Android
- Requires Android Studio
- Gradle build system
- Android API 21+ (Android 5.0+) supported

## Troubleshooting

### Common Issues
1. **Metro bundler issues**: Clear cache with `expo start -c`
2. **Native dependency issues**: Run `expo install` to ensure compatibility
3. **Simulator not connecting**: Check network configuration and firewall settings

## Recommended Checkmarx One Configuration
- Criticality: 5
- Cloud Insights: Yes
- Internet-facing: Yes
