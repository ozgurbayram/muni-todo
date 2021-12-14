import React, { useReducer, useState } from 'react'
import { createContext } from 'react'
import { DarkTheme,LightTheme } from '../constants/Theme'

export const ThemeContext = createContext()

const themeReducer = (state,action)=>{
    switch (action.type) {
        case 'CHANGE_THEME':
            return {
                ...state,
                theme:state.theme.mode=='dark'?LightTheme:DarkTheme
            }
        default:
            return state
    }
}

const ThemeProvider = (props) => {

    const [themeState, themeDispatch] = useReducer(themeReducer,{theme:LightTheme})

    return (
        <ThemeContext.Provider value={{themeState,themeDispatch}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider