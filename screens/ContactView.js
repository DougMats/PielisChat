import React, { useState, UseEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import LinearGradient from 'react-native-linear-gradient';
import { colorBeta } from '../Colors';

const windowWidth = Dimensions.get('window').width;
function Contactview(props) {

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  console.log("contacto: ", props.route.params.data)


  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ImageBackground source={require('../images/background_1.png')}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          resizeMode: "cover",
          width: "100%",
          height: "100%"
        }}>
        <ScrollView>
          <View style={{ backgroundColor: "rgba(255,255,255,0.5)", width: windowWidth, height: windowWidth, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
            <View style={{ position: "absolute", top: 5, width: "100%", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 10, paddingBottom: 10 }}>
              <TouchableOpacity
                onPress={() => goToScreen("Chat", props.route.params.data)}
                style={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 20, height: 40, width: 40, justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                <Icon name="arrow-back" fill={"white"} width={30} height={30} />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, lineHeight: 40, color: "white", fontWeight: "bold", paddingLeft: 10, overflow: "hidden", width: "80%" }}>{props.route.params.data.name}</Text>
              <TouchableOpacity style={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 20, height: 40, width: 40, justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                <Icon name="more-vertical" fill={"white"} width={30} height={30} />
              </TouchableOpacity>
            </View>
            <Text style={{
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 10,
              textShadowColor: '#000',
              left: 10,
              position: "absolute",
              bottom: 10,
              left: 10,
              color: "white",
              fontSize: 30,
              lineHeight: 35,
              fontWeight: "bold",
              paddingLeft: 10,
              overflow: "hidden",
              width: "80%"
            }}>{props.route.params.data.name}</Text>
            {props.route.params.data.profilePicture === "" &&
              <Icon name="person" fill={"rgba(255,255,255,0.2)"} width={200} height={200} style={{ top: 5 }} />
            }
            {
              props.route.params.data.profilePicture !== "" &&
              <View style={{ width: "100%", height: "100%", position: "absolute", zIndex: -2 }}>
                <Image
                  style={{ width: null, height: null, flex: 1, resizeMode: "cover" }}
                  source={{ uri: props.route.params.data.profilePicture }}
                />
              </View>
            }

          </View>








          <View style={styles.section}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Archivos, enlaces y docs</Text>
              <Text>314 <Icon name="arrow-ios-forward-outline" fill={"rgba(255,255,255,0.2)"} width={20} height={20} /></Text>
            </View>
            <ScrollView horizontal={true} >
              <TouchableOpacity style={{ margin: 2, width: 100, height: 100, backgroundColor: "silver" }}></TouchableOpacity>
              <TouchableOpacity style={{ margin: 2, width: 100, height: 100, backgroundColor: "silver" }}></TouchableOpacity>
              <TouchableOpacity style={{ margin: 2, width: 100, height: 100, backgroundColor: "silver" }}></TouchableOpacity>
              <TouchableOpacity style={{ margin: 2, width: 100, height: 100, backgroundColor: "silver" }}></TouchableOpacity>
              <TouchableOpacity style={{ margin: 2, width: 100, height: 100, backgroundColor: "silver" }}></TouchableOpacity>
              <TouchableOpacity style={{ margin: 2, width: 100, height: 100, backgroundColor: "silver" }}></TouchableOpacity>
              <TouchableOpacity style={{ margin: 2, width: 100, height: 100, backgroundColor: "silver" }}></TouchableOpacity>
              <TouchableOpacity style={{ margin: 2, width: 100, height: 100, backgroundColor: "silver" }}></TouchableOpacity>
              <TouchableOpacity style={{ margin: 2, width: 100, height: 100, backgroundColor: "silver" }}></TouchableOpacity>
              <TouchableOpacity style={{ margin: 2, width: 100, height: 100, backgroundColor: "silver" }}></TouchableOpacity>
            </ScrollView>
          </View>


          <View style={styles.section}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Info. y número de teléfono</Text>
            </View>

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>.</Text>
                <Text style={styles.labelName}>13 de mayo de 2021</Text>
              </View>
            </View>


            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>+57 312 4348384</Text>
                <Text style={styles.labelName}>Móvil</Text>
              </View>
            </View>
            
          </View>



















          {/*
       
         
           
          
            
   
         
       
       
     
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles.btn_options}>
            <Text style={styles.btn_options_text}>rgergre</Text>
            <Icon name="radio-button-off" fill={"silver"} width={35} height={35} style={{ top: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_options}>
            <Text style={styles.btn_options_text}>rgergre</Text>
            <Icon name="radio-button-on" fill={"#e67072"} width={35} height={35} style={{ top: 5 }} />
          </TouchableOpacity>
        </View>
       */}


        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  btn_options: {
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 5,
    paddingBottom: 15,
    borderBottomColor: "rgba(255,255,255,0.1)",
    borderBottomWidth: 1,
  },
  btn_options_text: {
    lineHeight: 30,
    width: "80%",
    fontWeight: "bold",
    fontSize: 16,
    color: "white"
  },
  section: {
    padding: 5,
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.05)",
    marginBottom: 10
  },
  sectionHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white"
  },
  row: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  column: {
    flexDirection: "column"
  },
  label: {
    fontWeight:"bold",
    fontSize: 20,
    color:"white"
  },
  labelName: {
    fontSize: 14,
    color:"white"
  }
})
export default Contactview;