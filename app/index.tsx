import { router } from "expo-router";
import { SafeAreaView, Text, View, Image, Pressable, TextInput, ScrollView , ActivityIndicator} from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 👈 loading state
  const [isRegistering, setIsRegistering] = useState(false); // 👈 toggle tussen login/register

  const handleSubmit = async () => {
    setError(""); // Reset error message
    setIsLoading(true); // Set loading state to true
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.replace("/(tabs)/home");
    } catch (e: any) {
      setError("Fout: " + e.message);
      console.log(e);
    }finally{
    setIsLoading(false); // Set loading state to false after the operation
    }
  };

  return (
    <SafeAreaView className="bg-black flex-1 px-2 pt-4 justify-center items-center">
      <ScrollView className="w-full">
        <View className="flex-1 justify-center items-center w-full h-full">
          <Image
            source={require("../assets/images/mtdb.png")}
            className="w-[120px] h-[120px]"
            resizeMode="contain"
            alt="Logo"
          />

          <Text className="text-white text-[20px] mt-2">Welcome to the Movie Database</Text>

          {/* FORM */}
          <View style={{ padding: 20 }} className="w-full">
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              className="bg-white rounded-[50px] pt-4 pb-4 pr-11 pl-4 w-full mb-4"
            />
            <TextInput
              placeholder="Wachtwoord"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="bg-white rounded-[50px] pt-4 pb-4 pr-11 pl-4 w-full mb-4"
            />
            <Pressable
              className="bg-white pt-4 pb-4 pr-11 pl-4 rounded-[50px]"
              onPress={handleSubmit}
            >
              <Text className="text-center font-medium">
                {isRegistering ? "Registreren" : "Inloggen"}
              </Text>
            </Pressable>
           
            {/* Error message */}
            {error ? <Text style={{ color: "red", marginTop: 10 }}>{error}</Text> : null}

            
          </View>

          {/* TOGGLE BUTTON */}
          <Pressable onPress={() => setIsRegistering(!isRegistering)} className="mt-4">
            <Text className="text-white underline">
              {isRegistering
                ? "Heb je al een account? Log hier in"
                : "Nog geen account? Registreer hier"}
            </Text>
          </Pressable>
        </View>
       

       {isLoading ? (
          <View className="flex-1 justify-center items-center w-full h-full">
            <ActivityIndicator size="large" color="#fff" />
          </View>
          ) : null}
        
      </ScrollView>
    </SafeAreaView>
  );
}
