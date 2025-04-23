import { Link } from "expo-router";
import { SafeAreaView, Text, View, Image, ActivityIndicator, TextInput, Pressable, ScrollView ,Platform } from "react-native";



export default function Index() {



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
            
            
      </View>
    </SafeAreaView>
  );
}
