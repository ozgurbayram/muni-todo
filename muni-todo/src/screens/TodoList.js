import React, { useContext, useEffect, useState } from 'react'
import {  StyleSheet, Text, View,FlatList,TextInput, StatusBar } from 'react-native'
import AnimatedPress from '../components/AnimatedPressable'
import FAB from '../components/FAB'
import { Feather } from '@expo/vector-icons'; 
import { TodoContext } from '../providers/TodoProvider'
import { createTodo, getTodos } from '../networking/todoServerMethods'
import { ThemeContext } from '../providers/ThemeProvider'

const TodoList = ({navigation}) => {
    const {todoState,todoDispatch} = useContext(TodoContext)
    const {themeState,themeDispatch} = useContext(ThemeContext)

    useEffect(() => {
        getTodos().then((res)=>{
            todoDispatch({type:'GET_TODOS',todos:res})
        })
    }, [])

    const createNewTodo = ()=>{
        createTodo().then((res)=>{
            todoDispatch({type:'ADD_TODO',todo:{id:res.data.id,name:'',tasks:[]}})
            navigation.navigate('TodoDetail',{todo:res.data})
        })
    }

    const RenderTodo = ({item})=>{
        return(
            <AnimatedPress 
                styleOvveride={styles.todoItem}
                onPress={()=>{
                    navigation.navigate('TodoDetail',{todo:item})
                }}
                backgroundColor={themeState.theme.bgSecond} 
                width={175} 
                height={100} 
                key={item.id}
            >
                    <Text style={{color:themeState.theme.text100,fontSize:21}}>{item.name}</Text>
            </AnimatedPress>
        )
    }
    return (
        <View style={{flex:1}}>
                <StatusBar backgroundColor={"#121212"} barStyle="light-content"/>
                <View style={[styles.todos,{backgroundColor:themeState.theme.bgColor}]}>
                <View 
                    style={{
                        width:"100%",
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        padding:10
                    }}>
                 
                </View>
                    <FlatList
                        data={todoState.todos}
                        horizontal={false}
                        renderItem={RenderTodo}
                        key={'_'}
                        keyExtractor={item => "_" + item.id}
                        style={{
                            margin:10
                        }}
                    />
                </View>
                <View style={{height:75,width:75,position:'absolute',alignItems:'center',justifyContent:'space-between',bottom:"3%",right:"5%"}}>
                    <FAB onPress={createNewTodo} 
                        styleOvveride={{
                            backgroundColor:themeState.theme.bgSecond,
                            width:"100%",
                            height:"100%",
                        }}>
                        <Feather name="plus" color="white" size={32}/>
                    </FAB>
                </View>
        </View>
    )
}

export default TodoList

const styles = StyleSheet.create({
    todos:{
        display:'flex',
        height:"100%",
        flexDirection:'column',
    },
    todoItem:{
        width:"100%",
        justifyContent:'center',
        paddingHorizontal:10,
        marginTop:20
    }
})
