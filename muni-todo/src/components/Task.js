import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { updateTodo } from '../networking/todoServerMethods'
import { TodoContext } from '../providers/TodoProvider'
import AnimatedPress from './AnimatedPressable'
import { Entypo } from '@expo/vector-icons'; 
import Animated,{ FadeInRight, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'; 
import { ThemeContext } from '../providers/ThemeProvider'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'; 

const AnimatedView = Animated.createAnimatedComponent(View)

const Task = ({task,todo,inputRef}) => {
    const [taskName, setTaskName] = useState(task.name)
    const {themeState,themeDispatch} = useContext(ThemeContext)
    const {todoState,todoDispatch} = useContext(TodoContext)
    const navigation = useNavigation()
    const transformValue = useSharedValue(500)
	const animatedStyle = useAnimatedStyle(()=>{
		return {
			transform:[
				{
                    translateY:transformValue.value
				}
			],
		}	
	})
    const taskDone = ()=>{
        task.is_done = !task.is_done
        const newTasks = todo.tasks.map((i)=>{
            if(i.id==task.id){
                return task
            }
            return i
        })
        todo.tasks = newTasks
        updateTodo(todo)
        todoDispatch({type:'EDIT_TODO',todo:todo})
    }
    useEffect(() => {
        transformValue.value = withTiming(0,{duration:500})
    }, [])

    return (
        <AnimatedView
            style={[animatedStyle,{
                display:'flex',
                borderRadius:10,
                flexDirection:'row',
                backgroundColor:task.is_done?'rgba(0,0,0,0.1)':'rgba(0,0,0,0.2)',
                alignItems:'center',
                marginBottom:20,
                marginHorizontal:15,
            }]}>
                <AnimatedPress onPress={taskDone} styleOvveride={{marginRight:20,padding:10}}>
                    {task.is_done?(
                        <Ionicons name="checkmark-done-circle" size={25} color={themeState.theme.text100} />
                    ):(
                        <Entypo name="circle" size={25} color={themeState.theme.text100} />
                    )}
                </AnimatedPress>
                <Pressable
                onPress={()=>{navigation.navigate('EditTask',{task:task,todo:todo})}}
                style={{paddingVertical:20,width:"80%" }}>
                    <Text style={{
                        color:task.is_done?themeState.theme.text300:themeState.theme.text100,
                        fontSize:18,
                        fontWeight:'bold',
                        textDecorationLine:task.is_done?'line-through':'none',
                        textDecorationStyle:"solid"
                    }}>
                            {task.name}</Text>
                    {task.image_path!=''&&(
                        <Image source={{uri:task.image_path}} style={{opacity:task.is_done?0.3:1,width:200,height:50,borderRadius:6,marginTop:10}}/>
                    )}
                </Pressable>
        </AnimatedView>
    )
}

export default Task

const styles = StyleSheet.create({})
