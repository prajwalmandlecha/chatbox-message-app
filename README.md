# Chatbox

Chatbox is a real-time messaging and video calling app built with React Native with Expo, Firebase, and WebRTC. It supports user authentication, one-on-one chat, and video calls with a modern UI.

## Features

- User authentication (Sign up & Login)
- Real-time chat using Firebase Firestore
- Video calling with WebRTC
- Push notifications (setup in progress)
- User avatars and presence
- Modern, mobile-friendly UI

## Screenshots

![Chatbox Screenshot](assets/Chatbox.png)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Firebase Project](https://firebase.google.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/message-app.git
   cd message-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure Firebase:**
   - Update the `.env` file with your Firebase credentials.
   - Make sure the values in `.env` match your Firebase project.

4. **Start the app:**
   ```sh
   npm run start
   ```
   - Or for Android:
     ```sh
     npm run android
     ```
   - Or for iOS:
     ```sh
     npm run ios
     ```

## Project Structure

```
src/
  components/      # Reusable UI components
  hooks/           # Custom React hooks
  screens/         # App screens (Login, Signup, Home, Chat, Call, etc.)
  services/        # Firebase, Call, Notification services
  utils/           # Utility functions
assets/            # Images and icons
```

## Technologies Used

- React Native
- Expo
- Firebase Auth & Firestore
- WebRTC (`react-native-webrtc`)
- React Navigation


