import { Text, SafeAreaView, ScrollView, View ,Image} from "react-native";
import {  useLocalSearchParams } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
 

export default function Search() {
  const { user  ,isLoaded} = useUser();

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }
  if (!user) {
    return null; 
  }


  const avatarUrl = user.imageUrl; 
  
    const { query } =  useLocalSearchParams();
  return (
    <SafeAreaView className="flex-1 bg-black">
    

      <ScrollView
      showsVerticalScrollIndicator={false} className="px-4">
        

      <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
      {avatarUrl && (
        <Image
          source={{ uri: avatarUrl }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      )}
      <Text className="text-white text-[30px] font-bold mt-4">
        {user.fullName}
      </Text>
      <Text className="text-white mt-1">{user.primaryEmailAddress?.emailAddress}</Text>
      


      
      
      
    </View>
          
       
      </ScrollView>
    </SafeAreaView>
  );
}
