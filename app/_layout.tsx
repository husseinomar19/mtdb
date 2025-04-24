import { Stack } from "expo-router";
import "./global.css"
import Login from "../components/login"
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import {EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} from '@env';
export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache} >
      <SignedIn>

      <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
    </Stack>

      </SignedIn>

      <SignedOut>
        <Login/>
      </SignedOut>
    
    </ClerkProvider>
  );
}
