import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet,TextInput, Text, View, Alert, Platform } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'; 
import { TodoContext } from '../providers/TodoProvider';
import { updateTodo } from '../networking/todoServerMethods';
import AnimatedPress from './AnimatedPressable';
import { ThemeContext } from '../providers/ThemeProvider';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const AddTask = ({tasks,setTasks,todo,inputRef,setTaskInputStatus}) => {
    const [text, setText] = useState()
    const [imagePath, setImagePath] = useState("")
    const {todoState,todoDispatch} = useContext(TodoContext)
    const {themeState,themeDispatch} = useContext(ThemeContext)
    const [type, setType] = useState(Camera.Constants.Type.back);

    const submit = () =>{
        todo.tasks = [{id:tasks.length+1,name:text,is_done:false,image_path:imagePath},...tasks]
        updateTodo(todo)
        todoDispatch({type:'EDIT_TODO',todo:todo})
        setText('')
        setImagePath('')
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
        (async () => {
            if (Platform.OS !== 'web') {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
              }
            }
          })();
    }, [])
    return (
        <View
            style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                backgroundColor:'rgba(0,0,0,0.2)',
                justifyContent:'space-between',
            }}
        >
            <AnimatedPress
                onPress={openImagePickerAsync}
                styleOvveride={{width:"10%",alignItems:'center'}}>
                <Feather name="image" size={24} color={themeState.theme.text100} />
            </AnimatedPress>
            <TextInput
                ref={inputRef}
                value={text}
                placeholder="Add Task"
                style={{
                    alignItems:'center',
                    paddingVertical:10,
                    paddingHorizontal:10,
                    width:"80%",
                    fontSize:18,
                    color:themeState.theme.text100
                }}
                placeholderTextColor={
                    themeState.theme.text100
                }
                onChangeText={(e)=>{setText(e)}}
            />
            <AnimatedPress onPress={submit} width={"10%"} styleOvveride={styles.send}>
                <Ionicons name="send" size={24} color={themeState.theme.text100} />
            </AnimatedPress>
        </View>
    )
}

export default AddTask

const styles = StyleSheet.create({
})
