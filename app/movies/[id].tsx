import { useLocalSearchParams } from "expo-router";
import { Text, ScrollView, View ,Image, TouchableOpacity} from "react-native";
import { useEffect, useState } from "react";
import { EXPO_PUBLIC_API_KEY } from '@env';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
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
    genres: { id: number; name: string }[];
    budget: number;
    production_companies: { id: number; name: string }[];
  }

export default function MovieDetails() {
    const [data, setData] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

 const {id} = useLocalSearchParams();


 useEffect(() =>{
   const fetchData = async () =>{
   
    try{
     setLoading(true);
     const baseUrl  = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
     const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${EXPO_PUBLIC_API_KEY}`,
        },
     }
     const response = await fetch(baseUrl,options);
        const json = await response.json();
        setData(json);
    }catch(error){
        setError("Failed to fetch data");
    }finally{
        setLoading(false);
    }
     
   }
    
   fetchData();

 })

return(
    <>
       
        <View className="bg-black flex-1">

            <ScrollView>
                <View className="flex-1 w-full">
                 <Image
                    source={{uri:`https://image.tmdb.org/t/p/w500/${data?.poster_path}` }} 
                    className="w-full h-[450px]" 
                 />
                </View>
                <View className="flex-1 w-full p-4 flex-col">
                 <Text className="text-white text-xl font-bold">{data?.original_title}</Text>
                 <Text className="text-white text-[12px] mt-1">{data?.release_date}</Text>
                 <View className="flex-row items-center justify-center gap-1 mt-2 bg-white p-2 w-[60px] rounded-full">
                 <AntDesign name="star" size={13} color="yellow" />
                      <Text className="text-black text-[10px] mt-1">
                      {Math.round(data?.vote_average || 0)}/10
                      </Text>
                 </View>
                 <Text className="text-white text-[12px] mt-4">Overview</Text>
                 <Text className="text-white text-[12px] mt-2 font-bold">{data?.overview}</Text>
                 <Text className="text-white text-[12px] mt-4">Genres</Text>
                 <Text className="text-white text-[12px] mt-2 font-bold"> {data?.genres?.map((genre) => genre.name).join(" - ") || "No genres"}</Text>
                 <Text className="text-white text-[12px] mt-4">Language</Text>
                 <Text className="text-white text-[12px] mt-2 font-bold">{data?.original_language}</Text>
                <Text className="text-white text-[12px] mt-4">Budget</Text>
                <Text className="text-white text-[12px] mt-2 font-bold">${Math.round((data?.budget || 0) / 1_000_000)} million</Text>
                <Text className="text-white text-[12px] mt-4">Productin Company</Text>
                <Text className="text-white text-[12px] mt-2 font-bold">{data?.production_companies?.map((company) => company.name).join(" - ") || "No companies"}</Text>
                
                

                </View>

                <TouchableOpacity className="rounded-full w-full flex justify-center items-center" onPress={() => router.back()}>
                    <Text className="text-black bg-white text-[12px] font-bold w-[90%] text-center pt-4 pb-4 rounded-full mb-4">Go Back</Text>
                </TouchableOpacity>
                
            </ScrollView>
             

        </View>

    </>
)
        
    
}
