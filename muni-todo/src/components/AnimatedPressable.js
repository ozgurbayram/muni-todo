import React from 'react'
import { Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)


const AnimatedPress =({backgroundColor,width,height,children,onPress,styleOvveride})=> {
    const borderValue = useSharedValue(1)
	const scaleValue = useSharedValue(1)
	const opacityValue = useSharedValue(1)
	const animatedPressStyle = useAnimatedStyle(()=>{
		return {
			transform:[
				{
					scale:scaleValue.value
				}
			],
			opacity:opacityValue.value
		}	
	})
	const pressin=()=>{ scaleValue.value = withSpring(0.7) ,opacityValue.value=withSpring(0.9) }
	const pressout=()=>{scaleValue.value = withSpring(1),opacityValue.value=withSpring(1)}
    return (
        <>
            <AnimatedPressable onPressIn={pressin} onPressOut={pressout} 
                onPress={onPress}
                style={[animatedPressStyle,{
                    width:width,
                    height:height,
                    backgroundColor:backgroundColor,
                    borderRadius:6,
                },styleOvveride]}
            >
                {children}
            </AnimatedPressable>
        </>
    )
}

export default AnimatedPress
