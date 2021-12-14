import { AntDesign, Entypo, Feather, Ionicons } from '@expo/vector-icons'
import React,{useEffect, useState,useContext} from 'react'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import AnimatedPress from '../components/AnimatedPressable'
import FAB from '../components/FAB'
import { updateTodo } from '../networking/todoServerMethods'
import {ThemeContext} from '../providers/ThemeProvider'
import { TodoContext } from '../providers/TodoProvider'
import * as ImagePicker from 'expo-image-picker';


const EditTask = (props) => {
    const [taskName, setTaskName] = useState(props.route.params.task.name)
    const [imagePath, setImagePath] = useState()
    const {themeState,themeDispatch} = useContext(ThemeContext)    
    const {todoState,todoDispatch} = useContext(TodoContext)
    const todo = props.route.params.todo
    const task = todo.tasks.filter((i)=>{
        return i.id == props.route.params.task.id
    })
    const taskDone = ()=>{
        task[0].is_done = !task[0].is_done
        const newTasks = todo.tasks.map((i)=>{
            if(i.id==task[0].id){
                return task[0]
            }
            return i
        })
        todo.tasks = newTasks
        updateTodo(todo)
        todoDispatch({type:'EDIT_TODO',todo:todo})
    }
    let openImagePickerAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        setImagePath(result.uri)
    }
    useEffect(() => {
        if(taskName!=props.route.params.task.name){
            console.log("changed");
            task[0].name = taskName
            const newTasks = todo.tasks.map((i)=>{
                if(i.id==task[0].id){
                    return task[0]
                }
                return i
            })
            todo.tasks = newTasks
            updateTodo(todo)
            todoDispatch({type:'EDIT_TODO',todo:todo})
        }
    }, [taskName])
    useEffect(() => {
        if(imagePath){
            task[0].image_path = imagePath
            const newTasks = todo.tasks.map((i)=>{
                if(i.id==task[0].id){
                    return task[0]
                }
                return i
            })
            todo.tasks = newTasks
            updateTodo(todo)
            todoDispatch({type:'EDIT_TODO',todo:todo})
        }
    }, [imagePath])
    return (
        <View style={[{backgroundColor:themeState.theme.bgColor,flex:1}]}>
            <View 
                style={{
                    paddingHorizontal:10,
                    display:'flex',
                    backgroundColor:themeState.theme.bgColor,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}>
                <AnimatedPress onPress={taskDone} styleOvveride={{marginRight:20,padding:10}}>
                    {props.route.params.task.is_done?(
                        <Ionicons name="checkmark-done-circle" size={24} color={themeState.theme.text100} />
                    ):(
                        <Entypo name="circle" size={24} color={themeState.theme.text100} />
                    )}
                </AnimatedPress>
                <TextInput
                    value={taskName}
                    style={{
                        fontSize:28,
                        width:"80%",
                        textDecorationLine:'underline',
                        color:themeState.theme.text100
                    }}
                    onChangeText={(e)=>setTaskName(e)}
                />
            </View>
            {props.route.params.task.image_path!=''&&(
                <Image source={{uri:props.route.params.task.image_path}} style={{ width: "100%", height: 200 }} />
            )}
            {props.route.params.task.image_path==''&&(
                <View 
                    style={{
                        position:'absolute',
                        bottom:"5%",
                        right:"5%"
                    }}>
                    <FAB onPress={()=>{
                        openImagePickerAsync()
                    }}>
                        <Feather name="image" size={24} color="#eee" />
                    </FAB>
                </View>
            )}
        </View>
    )
}

export default EditTask

