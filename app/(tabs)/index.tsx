import { Link } from "expo-router";
import { SafeAreaView, Text, View, FlatList ,Image, ActivityIndicator, TextInput, Pressable } from "react-native";
import { useState, useEffect } from "react";
import {EXPO_PUBLIC_API_KEY} from '@env';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useRouter } from "expo-router";
interface Movie {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  release_date: string;
  first_air_date: string;
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
  const [page, setPage] = useState(1);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
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
  }, [page]);


  return (
    <SafeAreaView className="bg-black flex-1 px-2 pt-4">
      <View className="flex-row items-center justify-between w-full pl-4 pr-5">
        <Text className="text-white text-[30px] font-bold">Movie</Text>
        <Image
          source={require("../../assets/images/mtdb.png")}
          className="w-[60px] h-[60px]"
          resizeMode="contain"
          alt="Logo"
        />
         
      </View>
      <View className="w-full pl-3 pr-5 mt-2">
       <TextInput
       onPress={() => router.push("/search")}
       className="bg-white rounded-[50px] pt-4 pb-4 pr-11 pl-4 relative"
       placeholder="Search" 
       placeholderTextColor={'#000'}/>
       <EvilIcons className="absolute top-3 right-8" name="search" size={30} color="black" />
      </View>
    {loading ? (
       <ActivityIndicator color={"white"} />
    ) : (
     <>
     <Text className="text-white text-[20px] font-bold mb-2 ml-2 mt-4">Top trending movies</Text>
     <View className="flex-1 justify-center items-center p-2">
      <FlatList
        data={data}
        numColumns={3}
        className="w-full "
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
                {item.original_title}
              </Text>
              <View className="flex-row items-center justify-between mt-1">
                <Text className="text-white text-[10px] mt-1 ">
                  {item.release_date?.split("-")[0]}
                </Text>
                <View className="flex-row items-center justify-between gap-2">
                  <AntDesign name="star" size={13} color="yellow" />
                  <Text className="text-white text-[10px] mt-1">
                    {Math.round(item.vote_average / 2)}/5
                  </Text>
                </View>
              </View>
            </View>
          </Link>
        )}
        
      />
       </View>

       <View className="w-full flex-row justify-center items-center gap-2 px-4 mb-[65px] mt-2">
        <Pressable onPress={() => setPage(() => page - 1)}
        disabled={page === 1}
        style={{ opacity: page === 1 ? 0.5 : 1 } }>
          <Text className="p-2">
          <MaterialIcons name="navigate-before" size={30} color="white" />
         
          </Text>
        </Pressable>
        <Pressable onPress={() => setPage(() => page + 1)}
        >
          <Text className="p-2">
          <MaterialIcons name="navigate-next" size={30} color="white" />
          </Text>
        </Pressable>
       </View>

      
     </>
    )}
    {error && <Text className="text-red-500 absolute top-2/4 text-center p-3">{error}</Text>}
  </SafeAreaView>
  );
}
