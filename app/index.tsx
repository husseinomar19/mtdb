import { Link, router } from "expo-router";
import { SafeAreaView, Text, View, Image, Pressable, TextInput} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {provider , auth} from "../firebase"
import { useState } from "react";

export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const register = async () => {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          router.replace("/(tabs)/home");
        } catch (e) {
          setError("Fout bij registreren: " + e);
          console.log(e);
        }
      };


  return (
    <SafeAreaView className="bg-black flex-1 px-2 pt-4 justify-center items-center ">
      <View className="flex-1 justify-center items-center w-full h-full">
      <Image
              source={require("../assets/images/mtdb.png")}
              className="w-[120px] h-[120px]"
              resizeMode="contain"
              alt="Logo"
            />

            <Text className="text-white text-[20px] mt-2">Welcome to the Movie Database</Text>
            
    <View style={{ padding: 20 }} className="w-full ">
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ marginBottom: 10 }}
        className="bg-white rounded-[50px] pt-4 pb-4 pr-11 pl-4 w-full"
      />
      <TextInput
        placeholder="Wachtwoord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10 }}
        className="bg-white rounded-[50px] pt-4 pb-4 pr-11 pl-4 w-full"
      />
      <Pressable className="bg-white pt-4 pb-4 pr-11 pl-4 rounded-[50px] text-center" onPress={register}>
        <Text className="text-center font-medium">Inloggen</Text>
      </Pressable>
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
    </View>


           {error && (
            <Text className="text-red-500 text-[16px] mt-2">{error}</Text>
            )}
      </View>
    </SafeAreaView>
  );
}
