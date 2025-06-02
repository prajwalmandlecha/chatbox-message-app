# Chatbox Application Setup Instructions

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Node.js:** (LTS version recommended) - JavaScript runtime environment.
-   **npm** (comes with Node.js) or **yarn:** Package managers for JavaScript.
-   **Expo CLI:** Command-line tool for Expo. Install globally using `npm install -g expo-cli` or `yarn global add expo-cli`.
-   **Git:** Version control system for cloning the repository.
-   **(Optional but Recommended) Watchman:** For better file watching performance on macOS and Linux (`brew install watchman`).
-   **(Optional but Recommended) A mobile device or emulator/simulator:** For running and testing the application (e.g., Android Studio for Android Emulator, Xcode for iOS Simulator).

## Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url-here>
    ```
    (Replace `<your-repository-url-here>` with the actual URL of the Git repository.)

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

## Firebase Configuration

This project uses Firebase for backend services, including:
-   Firebase Authentication (for user sign-up and login)
-   Firestore (as a real-time database for messages and call signaling)

You will need to create your own Firebase project and configure the application to use it.

1.  **Create a Firebase Project:**
    -   Go to the [Firebase Console](https://console.firebase.google.com/).
    -   Click on "Add project" and follow the on-screen instructions to create a new project.

2.  **Set up Firebase Authentication:**
    -   In your Firebase project console, navigate to "Authentication" (under Build).
    -   Click on the "Sign-in method" tab.
    -   Enable the "Email/Password" provider (and any other providers you wish to support).

3.  **Set up Firestore Database:**
    -   In your Firebase project console, navigate to "Firestore Database" (under Build).
    -   Click "Create database."
    -   Choose to start in **test mode** for initial development (which allows open access).
        -   **Important:** For production, or even for more secure development, you **must** set up proper [Security Rules](https://firebase.google.com/docs/firestore/security/get-started) to protect your data.
    -   Select a Firestore location.

4.  **Get Firebase Configuration for your Web App:**
    -   In your Firebase project console, go to "Project settings" (click the gear icon next to "Project Overview").
    -   Under the "General" tab, scroll down to "Your apps."
    -   If you haven't already, click the web icon (`</>`) to "Add an app" and register a new web application. You don't need to set up Firebase Hosting.
    -   After registering, Firebase will provide you with a `firebaseConfig` object containing your project's credentials (apiKey, authDomain, projectId, etc.). Copy this object.

5.  **Update Application Configuration:**
    -   The Firebase configuration for this application is located in `src/services/firebase.js`.
    -   Open this file. You will see a `firebaseConfig` object that likely uses `process.env.EXPO_PUBLIC_...` variables or might have placeholder values.
    -   You need to replace these with the actual configuration values from your Firebase project (obtained in the previous step).

    Example of where to put your config in `src/services/firebase.js`:
    ```javascript
    // const firebaseConfig = {
    //   apiKey: process.env.EXPO_PUBLIC_API_KEY, // Replace with your apiKey
    //   authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN, // Replace with your authDomain
    //   projectId: process.env.EXPO_PUBLIC_PROJECT_ID, // Replace with your projectId
    //   storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET, // Replace with your storageBucket
    //   messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID, // Replace with your messagingSenderId
    //   appId: process.env.EXPO_PUBLIC_APP_ID, // Replace with your appId
    //   measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID, // Optional: Replace with your measurementId
    // };

    // ---- REPLACE THE ABOVE WITH YOUR ACTUAL CONFIGURATION ----
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID" // Optional
    };
    ```

6.  **Important Security Note:**
    -   **Never commit your actual Firebase API keys or sensitive credentials to a public Git repository.**
    -   The current project structure in `src/services/firebase.js` appears to load credentials directly or via `process.env.EXPO_PUBLIC_*`. If you are directly pasting your keys, be extremely careful.
    -   For production builds, and even for more secure development, it is highly recommended to use environment variables (e.g., via a `.env` file that is gitignored, and then loaded using `expo-constants` or a similar mechanism) or a secure configuration management service. The `EXPO_PUBLIC_` prefix for environment variables is specifically for Expo applications to make them accessible in client-side code. Ensure these are not exposed unintentionally.

7.  **Firestore Security Rules:**
    -   As mentioned above, ensure your Firestore database has appropriate security rules set up. The default "test mode" rules (`allow read, write: if true;`) are insecure for production.
    -   You should define rules that restrict access to data based on user authentication and your application's logic. For example, users should only be able to read/write their own messages or data they are authorized to access.

## Running the Application

Once dependencies are installed and Firebase is configured:

1.  **Start the Expo development server:**
    ```bash
    npm start
    ```
    or
    ```bash
    yarn start
    ```
    or (if you want to run directly on a connected device/emulator, and assuming native code changes might be involved or you prefer dev client builds):
    ```bash
    expo run:android
    ```
    or
    ```bash
    expo run:ios
    ```

2.  **Open the app:**
    -   The Expo development server will output a QR code.
    -   On your mobile device, open the Expo Go app (for managed workflow projects) or your development build (for dev client projects like this one seems to be, given the `expo run:*` scripts and `expo-dev-client` dependency).
    -   Scan the QR code to open the app.
    -   Alternatively, you can press `a` in the terminal to attempt to open on an Android emulator/device, or `i` for an iOS simulator/device.

This should get you up and running with the Chatbox application!
