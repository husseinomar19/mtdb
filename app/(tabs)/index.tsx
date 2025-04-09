import { Link } from "expo-router";
import { SafeAreaView, Text, View, FlatList ,Image, ScrollView , Dimensions, TextInput } from "react-native";
import { useState, useEffect } from "react";
import {EXPO_PUBLIC_API_KEY} from '@env';
interface Movie {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  adult: boolean;
  video: boolean;
}

export default function Index() {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${EXPO_PUBLIC_API_KEY}`,
          },
        };

        const res = await fetch(url, options);
        const json = await res.json();
        setData(json.results);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <SafeAreaView className="bg-black flex-1 px-2 pt-4">
      <View className="flex-row items-start justify-start w-full">
        <Image
          source={require("../../assets/images/mtdb.png")}
          className="w-[100px] h-[100px]"
          resizeMode="contain"
          alt="Logo"
        />
      </View>
      <View className="w-full pl-3 pr-5 mt-2">
       <TextInput
       className="bg-white rounded-[50px] p-3"
       placeholder="Search" 
       placeholderTextColor={'#000'}/>
       
      </View>
    {loading ? (
      <Text className="text-white text-center">Loading...</Text>
    ) : (
     <>
     <Text className="text-white text-[20px] font-bold mb-2 ml-2 mt-4">Popular TV Shows</Text>
     <View className="flex-1 justify-center items-center p-2">
      <FlatList
        data={data}
        numColumns={3}
        className="w-full"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ alignItems: "flex-start", justifyContent: "center", }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Link
            href={`/save`}
            className="flex justify-center items-center mb-4 gap-5"
          >
            <View className="m-1 p-1">
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                className="w-[116px] h-[220px] rounded-md"
                resizeMode="cover"
                alt={item.name}
              />
              <Text
                className="text-white text-[12px] mt-1 w-[116px]"
                numberOfLines={1}
              >
                {item.name}
              </Text>
            </View>
          </Link>
        )}
      />
       </View>
     </>
    )}
    {error && <Text className="text-red-500">{error}</Text>}
  </SafeAreaView>
  );
}
