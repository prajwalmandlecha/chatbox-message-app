# Chatbox

Chatbox is a real-time mobile application built with React Native and Expo, offering users chat and video/audio calling features powered by Firebase and WebRTC.

## Core Features

-   User authentication (signup and login).
-   Real-time one-on-one messaging.
-   Video and audio calling functionality using WebRTC.
-   User presence and listing (viewing other registered users).
-   Call management (handling incoming calls, making outgoing calls, missed call notifications).

## Technology Stack

-   **Frontend:** React, React Native, Expo
-   **Navigation:** React Navigation (@react-navigation/native, @react-navigation/stack)
-   **Chat UI:** react-native-gifted-chat
-   **Calling:** react-native-webrtc, react-native-incall-manager
-   **Backend & Real-time Communication:** Firebase (Firebase Authentication, Firestore)
-   **Utility/Other:** AsyncStorage, UUID, Expo Notifications, react-native-nice-avatar / @zamplyy/react-native-nice-avatar

## Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Node.js:** (LTS version recommended) - JavaScript runtime environment.
-   **npm** (comes with Node.js) or **yarn:** Package managers for JavaScript.
-   **Expo CLI:** Command-line tool for Expo. Install globally using `npm install -g expo-cli` or `yarn global add expo-cli`.
-   **Git:** Version control system for cloning the repository.
-   **(Optional but Recommended) Watchman:** For better file watching performance on macOS and Linux (`brew install watchman`).
-   **(Optional but Recommended) A mobile device or emulator/simulator:** For running and testing the application (e.g., Android Studio for Android Emulator, Xcode for iOS Simulator).

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/prajwalmandlecha/chatbox-message-app
    ```

2.  **Navigate to the project directory:**
    The project directory is named `message-app`.
    ```bash
    cd message-app
    ```

3.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or, if you prefer yarn:
    ```bash
    yarn install
    ```

### Firebase Configuration

This project uses Firebase for backend services (Authentication, Firestore). You will need to create your own Firebase project and configure it.

1.  **Create a Firebase Project:**
    -   Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
    -   Set up **Authentication** (enable Email/Password sign-in).
    -   Set up **Firestore Database** (start in test mode for development, but implement proper security rules for production).

2.  **Update Application Configuration:**
    -   The Firebase configuration is located in `src/services/firebase.js`.
    -   Obtain your Firebase project's configuration credentials (apiKey, authDomain, etc.) from the Firebase console (Project settings > Your apps > Web app).
    -   Replace the placeholder configuration or environment variable calls in `src/services/firebase.js` with your Firebase project's credentials. The project currently loads these from environment variables like `process.env.EXPO_PUBLIC_API_KEY`.

3.  **Important Security Note:**
    -   **Never commit your Firebase API keys or sensitive credentials directly to a public repository.**
    -   The current project is set up to load Firebase credentials from environment variables (e.g., `process.env.EXPO_PUBLIC_API_KEY`). Ensure these variables are correctly set up in your local development environment (e.g., via a `.env` file if your Expo setup supports it, though this project doesn't explicitly include one) or in your CI/CD system for builds.
    -   For local testing, you might temporarily insert your credentials directly into `src/services/firebase.js`, but be extremely cautious and do not commit these changes.

4.  **Firestore Security Rules:**
    -   Ensure your Firestore database has appropriate security rules set up to protect user data. The default "test mode" rules are not secure for a production environment.

### Running the Application

Once dependencies are installed and Firebase is configured:

1.  **Start the Expo development server:**
    ```bash
    npm start 
    ```
    or
    ```bash
    yarn start
    ```
    (This runs `expo start --dev-client`)

2.  **Open the app:**
    -   The Expo development server will output a QR code.
    -   On your mobile device, open your development build of the app.
    -   Scan the QR code to open the app.
    -   Alternatively, you can press `a` in the terminal to attempt to open on an Android emulator/device, or `i` for an iOS simulator/device (if connected and configured).
    -   You can also use `npm run android` or `npm run ios` (or their yarn equivalents) to build and run directly on emulators/devices.

## Available Scripts

-   **`npm start`** or **`yarn start`**:
    -   Command: `expo start --dev-client`
    -   Description: Runs the app in development mode using the Expo development client.
-   **`npm run android`** or **`yarn android`**:
    -   Command: `expo run:android`
    -   Description: Builds and runs the app on a connected Android device or emulator.
-   **`npm run ios`** or **`yarn ios`**:
    -   Command: `expo run:ios`
    -   Description: Builds and runs the app on an iOS simulator or connected device (requires macOS and Xcode).
-   **`npm run web`** or **`yarn web`**:
    -   Command: `expo start --web`
    -   Description: Bundles the app and runs it in a web browser (if web support is fully configured).
-   **`npm run postinstall`** or **`yarn postinstall`**:
    -   Command: `patch-package`
    -   Description: Applies patches to `node_modules` after installation. This is often used for specific fixes to dependencies.

## Project Structure

-   **`src/`**: Contains the main source code of the application.
    -   **`components/`**: Reusable UI components used across different screens.
    -   **`hooks/`**: Custom React hooks for reusable logic and stateful operations.
    -   **`screens/`**: Main views/pages of the application (e.g., LoginScreen, HomeScreen, ChatScreen).
    -   **`services/`**: Modules for interacting with external services like Firebase, WebRTC, and InCallManager.
    -   **`utils/`**: Utility functions and helpers.
-   **`assets/` (root level)**: Global static assets for the application, often used by Expo for icons, splash screens, and background images.
-   **`App.js`**: The main entry point of the application, initializes navigation.
-   **`app.json`**: Expo configuration file for project metadata, build settings, plugins, environment variables, etc.
-   **`package.json`**: Lists project dependencies, scripts, and metadata.
-   **`index.js`**: The initial JavaScript file loaded by React Native, which then typically imports and runs `App.js`.
-   **`metro.config.js`**: Configuration for the Metro JavaScript bundler used by React Native.
-   **`eas.json`**: Configuration file for Expo Application Services (EAS) Build and Submit.

This `README.md` provides a comprehensive overview of the Chatbox application.
