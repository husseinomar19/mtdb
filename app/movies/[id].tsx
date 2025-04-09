import { Text, SafeAreaView, ScrollView, View } from "react-native";
export default function MovieDetails() {

<SafeAreaView>
        <Text className="text-black text-xl font-bold p-4">Movie Details</Text>

        <ScrollView
        showsVerticalScrollIndicator={false} className="px-4">
            <View className="bg-slate-300 p-4 rounded-md">
                <Text className="text-black text-base font-bold">Movie Details</Text>
              
            </View>
        </ScrollView>
</SafeAreaView>
        
    
}
