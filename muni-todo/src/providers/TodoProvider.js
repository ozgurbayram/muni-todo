import React, { createContext, useReducer } from 'react'

export const TodoContext = createContext()

const todoReducer = (state,action)=>{
    switch (action.type) {
        case 'GET_TODOS':
            return {
                ...state,
                todos: action.todos
            }
        case 'ADD_TODO':
            return {
                ...state,
                todos:[...state.todos,action.todo],
            }
        case 'EDIT_TODO':
            const todo = action.todo
            const updatedTodos = state.todos.map((i)=>{
                if(i.id==todo.id){
                    return todo
                }
                return i
            })
            return {
                ...state,
                todos:[...updatedTodos]
            }
        case 'DELETE_TODO':
            const newList = state.todos.filter((i)=>{
                return i.id!==action.todo.id
            })
            return {
                ...state,
                todos:[...newList]
            }
        default:
            return state
    }
}

const TodoProvider = props => {
    
    const [todoState, todoDispatch] = useReducer(todoReducer, {todos:[]})
    
    return (
        <TodoContext.Provider value={{todoState,todoDispatch}}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoProvider