// index.tsx

import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { auth, GoogleAuthProvider } from '../firebase';
import { signInWithCredential, onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '509748891458-f3c4bo0inoomme50nl7v7rhsl73o6qc4.apps.googleusercontent.com',
    androidClientId: '509748891458-d65hpklbmenb38334r7u35p0d58v0e5p.apps.googleusercontent.com',
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
