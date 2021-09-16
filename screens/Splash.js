import React, { useState, useRef, useEffect } from 'react';
import { StatusBar, Animated, Text, View, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';




// const AnimationUp = (props) => {
//   const MoveToLeft = useRef(new Animated.Value(250)).current
//   useEffect(() => {
//     Animated.timing(
//       MoveToLeft,
//       {
//         toValue: 0,
//         duration: 10000,
//       },
//     ).start();
//   }, [MoveToLeft])
//   return (
//     <Animated.View
//       style={{
//        // ...props.style,

//        //transform: [{ translateX: MoveToLeft }]
//       }}
//     >
//       {props.children}
//     </Animated.View>
//   );
//}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height + 50;


const AnimationUP = (props) => {
  const MoveToLeft = useRef(new Animated.Value(windowHeight)).current
  React.useEffect(() => {
    Animated.timing(
      MoveToLeft,
      {
        toValue: 0,
        duration: 2000,
      },
    ).start();
  }, [MoveToLeft])
  return (
    <Animated.View
      style={{
        ...props.style,
        transform: [{ translateY: MoveToLeft }]
      }}
    >
      {props.children}
    </Animated.View>
  );
}



const AnimationDOWN = (props) => {
  const MoveToLeft = useRef(new Animated.Value(-windowHeight)).current
  React.useEffect(() => {
    Animated.timing(
      MoveToLeft,
      {
        toValue: 0,
        duration: 2000,
      },
    ).start();
  }, [MoveToLeft])
  return (
    <Animated.View
      style={{
        ...props.style,
        transform: [{ translateY: MoveToLeft }]
      }}
    >
      {props.children}
    </Animated.View>
  );
}




const LOGO = (props) => {
  const MoveToLeft = useRef(new Animated.Value(0)).current
  React.useEffect(() => {
    Animated.timing(
      MoveToLeft,
      {
        toValue: 1,
        duration: 2500,
      },
    ).start();
  }, [MoveToLeft])
  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: MoveToLeft
      }}
    >
      {props.children}
    </Animated.View>
  );
}



function Index(props) {
  return (
    <View style={{ flex: 1,  justifyContent: "center", alignContent: "center", alignItems: "center" }}>
      <StatusBar backgroundColor="transparent" translucent />



      <LOGO>
        <Image
          source={require('../images/logo-white.png')}
          style={{ width: 220, height: 75 }} />
      </LOGO>


      <AnimationUP style={{zIndex:-1, position: "absolute", flex: 1, width: "100%", height: "100%", }}>

        <ImageBackground
          source={require("../images/up.png")}
          style={{ position: "absolute", flex: 1, width: "100%", height: "100%", }}
        />
      </AnimationUP>


      <AnimationDOWN style={{zIndex:-1, position: "absolute", flex: 1, width: "100%", height: "100%", }}>
        <ImageBackground
          source={require("../images/down.png")}
          style={{ position: "absolute", flex: 1, width: "100%", height: "100%", }}
        />
      </AnimationDOWN>

    </View>
  )
}

const styles = StyleSheet.create({

});

export default Index;