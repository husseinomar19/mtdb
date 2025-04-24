
import { Tabs } from "expo-router";
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
      height	: '100%',
      width: '100%',
    },
    tabBarStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 55,
      backgroundColor: '#fff',
      borderColor: '#000',
      position: 'absolute',
      borderRadius: 50,
      margin: 20,
      bottom: 10, 
      zIndex: 100,    
    }
  }}
  >
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

<Tabs.Screen name="search" options={
    {title: "Profile",
    headerShown: false,
    tabBarIcon: ({focused}: {focused : boolean}) => (
      <>
      <AntDesign name="user" size={24} color={focused ? '#000' : '#999'} />
      </>
    )
      
    }
  } />

<Tabs.Screen name="save" options={
    {title: "Save",
    headerShown: false,
    tabBarIcon: ({focused}: {focused : boolean}) => (
      <>
      <Octicons name="checklist" size={24} color={focused ? '#000' : '#999'} /> 
      </>
    )   
    }
  } />
    
 </Tabs>
  )
}