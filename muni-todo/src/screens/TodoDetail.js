import React, {  useContext, useEffect, useRef, useState } from 'react'
import {  ActivityIndicator, FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import Task from '../components/Task'
import { TodoContext } from '../providers/TodoProvider'
import { KeyboardAwareFlatList, KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FAB from '../components/FAB'
import { Feather } from '@expo/vector-icons'; 
import { updateTodo } from '../networking/todoServerMethods'
import AnimatedPress from '../components/AnimatedPressable'
import { Ionicons } from '@expo/vector-icons'; 
import AddTask from '../components/AddTask'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { ThemeContext } from '../providers/ThemeProvider'

const TodoDetail = ({route}) => {
    const [tasks, setTasks] = useState()
    const navigation = useNavigation()
    const {todo} = route.params
    const {todoState,todoDispatch} = useContext(TodoContext)
    const inputRef = useRef()
    const [taskInputStatus, setTaskInputStatus] = useState(false)
    const {themeState,themeDispatch} = useContext(ThemeContext)
    
    const todoFromState = todoState.todos.filter((i)=>{
        return i.id==todo.id
    })

    const addTodo = ()=>{
        /* todo.tasks = [...tasks,{id:tasks.length+1,name:"",is_done:false,image_path:""}]
        updateTodo(todo)
        todoDispatch({type:'EDIT_TODO',todo:todo})
         */
        setTaskInputStatus(true)
    }
    
    useEffect(() => {
        if(taskInputStatus){
            inputRef.current.focus()
        }
        
    }, [taskInputStatus])
    
    useEffect(() => {
        setTasks(todo.tasks);
    }, [todoState])
    
    const renderTask = ({item:task})=>{
        return(
            <Task key={task.id} todo={todo} task={task}/>
        )
    }
   
    return (
            <View 
                style={{
                    flex:1,
                    backgroundColor:themeState.theme.bgColor,
                    display:'flex',
                    flexDirection:'column',
                }}>
                {tasks?(
                        <FlatList
                            data={tasks}
                            renderItem={renderTask}
                            keyExtractor={(item)=>item.id}
                        />
                ):
                (
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator color="#333" size="large"/>
                    </View>
                )
            }
                {taskInputStatus?(
                    <AddTask inputRef={inputRef} tasks={tasks} setTasks={setTasks} todo={todo} setTaskInputStatus={setTaskInputStatus}/>
                ):(
                    <View style={{height:75,width:75,position:'absolute',alignItems:'center',justifyContent:'space-between',bottom:"3%",right:"3%"}}>
                        <FAB onPress={()=>addTodo()}>
                            <Feather name="plus" color="white" size={32}/>
                        </FAB>
                    </View>
                )
                }
            </View>
    )
}

export default TodoDetail