import { Text, SafeAreaView, ScrollView, View } from "react-native";
import {  useLocalSearchParams } from 'expo-router';
export default function Search() {
    

    const { query } =  useLocalSearchParams();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-black text-xl font-bold p-4">Search</Text>

      <ScrollView
      showsVerticalScrollIndicator={false} className="px-4">
        <View className="bg-slate-300 p-4 rounded-md">
            <Text className="text-black text-base font-bold">Search query: {query}</Text>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
