import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { auth, GoogleAuthProvider } from '../firebase';
import { signInWithCredential, onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';

// Zorg dat Expo auth sessies kan afronden
WebBrowser.maybeCompleteAuthSession();

// Maak hier de redirectUri aan
const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'myapp',
});
console.log('Redirect URI:', redirectUri);

export default function App() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '',
    androidClientId: '',
    webClientId: '',
    redirectUri, // ← toegevoegd
  });

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, usr => {
      setUser(usr);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (response?.type === 'success' && response.authentication) {
      const { idToken, accessToken } = response.authentication;
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      signInWithCredential(auth, credential).catch(err =>
        console.error('Firebase login error:', err)
      );
    }
  }, [response]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>Welkom, {user.displayName}!</Text>
          <Button title="Uitloggen" onPress={() => signOut(auth)} />
        </>
      ) : (
        <>
          <Text style={styles.title}>Login met Google</Text>
          <Button
            title="Login"
            disabled={!request}
            onPress={() => promptAsync()}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20 },
});
