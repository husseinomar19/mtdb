import { useEffect, useState } from "react";
import { EXPO_PUBLIC_API_KEY } from '@env';
import { View , Text ,FlatList , Image ,ActivityIndicator} from "react-native";
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

interface TriendProps {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    release_date: string;
    first_air_date: string;
    vote_average: number;
    original_name: string;
}


export default function Triend() {
    const [data, setData] = useState<TriendProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() =>{
      const fetchData = async () =>{
        setLoading(true);
        try{

         const baseUrl  = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"
         const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${EXPO_PUBLIC_API_KEY}`,
            },
         }

        const res = await fetch(baseUrl, options)
        const json = await res.json();
        setData(json.results);

        }catch(error){
            setError("Failed to fetch data");
        }finally{
            setLoading(false);
        }
      }
      fetchData();
    },[])
    return (
        <>
        <View className="flex-1 w-full p-4">
          <Text className="text-white text-xl font-bold"> Top Triend TV Show</Text>
          {loading && (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          {error && (
            <View className="flex-1 justify-center items-center">
              <Text className="text-red-500">{error}</Text>
            </View>
          )}
        <FlatList
         data={data}
         keyExtractor={(item) => item.id.toLocaleString()}
         horizontal={true}
         showsHorizontalScrollIndicator={false}
         
         contentContainerStyle={{marginBottom : 60}}
         renderItem={({item}) => 
         <>
         <Link href={`/movies/${item.id}`} className="flex justify-center items-center mb-4 gap-5">
          <View className="m-1 p-1">
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              className="w-[116px] h-[220px] rounded-md"
              resizeMode="cover"
              alt={item.name}
            />
            <Text className="text-white text-[12px] mt-1 w-[116px]" numberOfLines={1}>
              {item.original_name}
            </Text>
            <View className="flex-row items-center justify-between mt-1">
              <Text className="text-white text-[10px] mt-1">
                {item.first_air_date?.split("-")[0]}
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
         </>} />
        </View>

        </>
    )
}