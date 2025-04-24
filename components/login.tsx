import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, View ,Image} from "react-native";
import * as WebBrowser from 'expo-web-browser'
import React, { useCallback, useEffect } from 'react'
import * as AuthSession from 'expo-auth-session'
import { useSSO ,useAuth } from '@clerk/clerk-expo'

export const useWarmUpBrowser = () => {
    useEffect(() => {
      // Preloads the browser for Android devices to reduce authentication load time
      // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync()
      return () => {
        // Cleanup: closes browser when component unmounts
        void WebBrowser.coolDownAsync()
      }
    }, [])
  }
WebBrowser.maybeCompleteAuthSession()


export function useSignOutHandler() {
    
    const { signOut } = useAuth();
  
    const onPressSignOut = useCallback(async () => {
      try {
        await signOut();
        // Hier kun je navigatie of state‑reset doen
      } catch (err) {
        console.error('Error signing out:', err);
      }
    }, [signOut]);
  
    return onPressSignOut;
  }
export default function Login() {
    useWarmUpBrowser()
     
    const { startSSOFlow } = useSSO()

    
    
    const onPress = useCallback(async () => {
        try {
          // Start the authentication process by calling `startSSOFlow()`
          const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
            strategy: 'oauth_google',
            // For web, defaults to current path
            // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
            // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
            redirectUrl: AuthSession.makeRedirectUri(),
          })
    
          // If sign in was successful, set the active session
          if (createdSessionId) {
            setActive!({ session: createdSessionId })
          } else {
            // If there is no `createdSessionId`,
            // there are missing requirements, such as MFA
            // Use the `signIn` or `signUp` returned from `startSSOFlow`
            // to handle next steps
          }
        } catch (err) {
          // See https://clerk.com/docs/custom-flows/error-handling
          // for more info on error handling
          console.error(JSON.stringify(err, null, 2))
        }
      }, [])

    

    return(
        <>
        <SafeAreaView className="flex-1 bg-black justify-center items-center p-2">

                <Image
                source={require('../assets/images/mtdb.png')}
                />
                <Pressable className="bg-white rounded-full" onPress={onPress} style={{ width: 300, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text className="text-black p-5">Login with Google</Text>
                </Pressable>

            
        </SafeAreaView>
        </>
    )
}