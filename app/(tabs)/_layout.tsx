
import { Tabs } from "expo-router";
import { Pressable, View} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function RootLayout() {
  return (
    <Tabs 
    screenOptions={{
    tabBarShowLabel:true,
    tabBarLabelStyle: {
      color: '#000',
    },
    tabBarItemStyle:{
      width: '100%',
      height: '100%',
      
    },
    tabBarStyle: {
      backgroundColor: '#fff',
      borderColor: '#000',
      height: 60,
      borderRadius: 50,
      margin: 10,
      position: 'absolute',
      bottom: 20, 
      zIndex: 100,    

    }
  }}
  >
    <Tabs.Screen name="search" options={
    {title: "Settings",
      tabBarIconStyle: {
        marginLeft:5,
        opacity: 0.5,
      },
      tabBarLabelStyle: {
        opacity: 0.5,
      },

      headerShown: false,
      tabBarIcon: ({focused}: {focused : boolean}) =>(
        <>
        <AntDesign name="user" size={24} color={focused ? '#000' : '#999'} />
        </>
      ),
      tabBarButton: (props) => (
        <Pressable disabled={true} style={props.style}>
          <View>{props.children}</View>
        </Pressable>
      ),
    }
  } />

  <Tabs.Screen name="index" options={
    {title: "Home",
    headerShown: false,
    
    tabBarIcon: ({focused}: {focused : boolean}) => (
      <>
      <Feather name="home" size={24} color={focused ? '#000' : '#999'} />
      </>
    )
      
    }
  } />
   
  <Tabs.Screen name="save" options={
    {title: "save",
      tabBarIconStyle: {
        marginLeft:5,
        opacity: 0.5,
      },
      tabBarLabelStyle: {
        opacity: 0.5,
      },
      headerShown: false,
      tabBarIcon: ({focused}: {focused : boolean}) =>(
        <>
        <Octicons name="checklist" size={24} color={focused ? '#000' : '#999'} /> 
        </>
      ),
      tabBarButton: (props) => (
        <Pressable disabled={true} style={props.style}>
          <View>{props.children}</View>
        </Pressable>
      ),
      
    }
  } />
 </Tabs>
  )
}