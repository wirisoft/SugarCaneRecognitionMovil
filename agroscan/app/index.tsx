// app/index.tsx
import { Redirect } from 'expo-router';

export default function AppIndex() {
  // Redirect to the Login screen by default
  return <Redirect href="./Login/LoginScreen" />;
}