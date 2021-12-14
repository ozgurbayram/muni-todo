import React, { useContext } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import TodoList from '../screens/TodoList';
import TodoDetail from '../screens/TodoDetail';
import Header from '../components/Header';
import EditTask from '../screens/EditTask';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { View } from 'react-native';
import AnimatedPress from '../components/AnimatedPressable';
import { ThemeContext } from '../providers/ThemeProvider';

const RootStack = createNativeStackNavigator()

const Navigation = () => {
    const {themeState,themeDispatch} = useContext(ThemeContext)
    return (
        <NavigationContainer>
            <RootStack.Navigator
                screenOptions={{
                    headerShadowVisible:false
                }}
            >
                <RootStack.Group>
                    <RootStack.Screen
                    options={{
                        headerRight:()=>{
                            return(
                                <View 
                                    style={{
                                        flexDirection:'row',
                                        display:'flex',
                                        justifyContent:'space-between'
                                    }}>
                                   
                                    <AnimatedPress
                                        onPress={()=>{
                                            themeDispatch({type:'CHANGE_THEME'})
                                        }}
                                    >
                                        <Entypo name={themeState.theme.mode=='dark'?'light-up':'moon'} color={themeState.theme.text100} size={24}/>
                                    </AnimatedPress>
                                </View>
                            )
                        },
                        headerTitle:"Muni Todo",
                        headerStyle:{
                            backgroundColor:themeState.theme.bgColor,
                        },
                        headerTintColor:themeState.theme.text100
                    }}
                    name="TodoList" component={TodoList}/>
                    <RootStack.Screen
                        options={{
                            header:(props)=>{return(<Header props={props}/>)},
                            headerShown:true,
                            animation:'slide_from_right'
                        }} 
                        name="TodoDetail" 
                        component={TodoDetail}/>
                </RootStack.Group>
                <RootStack.Group screenOptions={{presentation:'modal'}}>
                    <RootStack.Screen
                        name="EditTask"
                        options={{
                            animation:'slide_from_bottom',
                            presentation:'fullScreenModal',
                            gestureEnabled:true,
                            headerStyle:{
                                backgroundColor:themeState.theme.bgColor
                            },
                            headerTitle:'',
                            headerTintColor:themeState.theme.text100
                        }}
                        component={EditTask}
                    />
               </RootStack.Group>
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
