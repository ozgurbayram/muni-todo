import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AnimatedPress from './AnimatedPressable'

const FAB = (props) => {
    return (
        <AnimatedPress onPress={props.onPress} styleOvveride={[styles.container,props.style]}>
            {props.children}
        </AnimatedPress>
    )
}

export default FAB

const styles = StyleSheet.create({
    container:{
        width:65,
        height:65,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#064663'
    }
})
