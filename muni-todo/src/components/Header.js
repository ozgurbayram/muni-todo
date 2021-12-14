import React,{useContext, useEffect, useRef, useState} from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'; 
import AnimatedPressable from './AnimatedPressable'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TodoContext } from '../providers/TodoProvider';
import BaseURL from '../networking/axiosBase';
import { removeTodo, updateTodo } from '../networking/todoServerMethods';
import { ThemeContext } from '../providers/ThemeProvider';

const Header = (props) => {
    const [title, setTitle] = useState(props.props.route.params['todo'].name)
    const [todo,setTodo] = useState(props.props.route.params['todo'])
    const titleRef = useRef()
    
    const {todoState,todoDispatch} = useContext(TodoContext)
    const {themeState,themeDispatch} = useContext(ThemeContext)

    useEffect(() => {
        if(title==''){
            titleRef.current.focus()
        }
    }, [])
    useEffect(() => {
        todo.name = title        
        setTodo(todo)
    }, [title])
  
    const delteTodo = ()=>{
        removeTodo(todo.id).then(()=>{
            todoDispatch({type:'DELETE_TODO',todo:todo})
        })
        props.props.navigation.goBack()
    }
    return (
        <SafeAreaView>
            <View style={[styles.container,{backgroundColor:themeState.theme.bgColor}]}>
                <AnimatedPressable 
                    onPress={()=>{
                        props.props.navigation.goBack()
                    }} 
                    styleOvveride={{padding:5}}
                    >
                    <AntDesign name="close" size={24} color={themeState.theme.text100} />
                </AnimatedPressable>
                <View>
                    <TextInput 
                        style={{
                            fontSize:21,
                            color:themeState.theme.text100
                        }}
                        ref={titleRef}
                        onChangeText={(e)=>{setTitle(e)}} 
                        onEndEditing={()=>{
                            updateTodo(todo).then(()=>{
                                todoDispatch({type:'EDIT_TODO',todo:todo})
                            })
                        }}
                        value={title}/>
                </View>
                <AnimatedPressable onPress={delteTodo} styleOvveride={{padding:5}} >
                    <MaterialCommunityIcons name="delete" size={24} color={themeState.theme.text100} />
                </AnimatedPressable>
            </View>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
        width:"100%",
        display:'flex',
        paddingVertical:20,
        paddingHorizontal:10,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row'
    }
})