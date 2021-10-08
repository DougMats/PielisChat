import React, { useState, UseEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import LinearGradient from 'react-native-linear-gradient';
import { colorBeta } from '../Colors';
import { WhatsAppService } from '../src/services'

const windowWidth = Dimensions.get('window').width;
function Contactview(props) {
  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  const [LEFT, setLEFT] = useState(10);
  const [SIZE, setSIZE] = useState(33);

  function resizeName(Y) {
    let resize = Math.trunc(Y)
    if (resize > 10) { setLEFT(10); setSIZE(30) }
    if (resize > 30) { setLEFT(13); setSIZE(29) }
    if (resize > 60) { setLEFT(16); setSIZE(28) }
    if (resize > 90) { setLEFT(19); setSIZE(27) }
    if (resize > 120) { setLEFT(22); setSIZE(26) }
    if (resize > 150) { setLEFT(25); setSIZE(24) }
    if (resize > 180) { setLEFT(28); setSIZE(22) }
    if (resize > 210) { setLEFT(31); setSIZE(20) }
    if (resize > 240) { setLEFT(34); setSIZE(18) }
    if (resize > 270) { setLEFT(41); setSIZE(16) }
    if (resize > 300) { setLEFT(44); setSIZE(15) }
    if (resize > 330) { setLEFT(47); setSIZE(14) }
    if (resize > 360) { setLEFT(50); setSIZE(14) }
  }


console.log("???", props)



  return (
    <SafeAreaView style={{ flex: 1, }}>
      {/* 
<View>
      <Text>Compartir</Text>
      <Text>Editar</Text>
      <Text>Ver en la libreta de contactos</Text>
      <Text>Confirmar código de seguridad</Text>
</View> */}

      <ImageBackground source={require('../images/background_1.png')}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          resizeMode: "cover",
          width: "100%",
          height: "100%"
        }}>
        <View style={{ position: "absolute", zIndex: 999, top: 5, width: "100%", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 10, paddingBottom: 10 }}>
       
       
       
          <TouchableOpacity onPress={() => props.navigation.goBack()}
           //</View> onPress={() => goToScreen("Chat", props.route.params.data)}
            style={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 20, height: 40, width: 40, justifyContent: "center", alignItems: "center", alignContent: "center" }}>
            <Icon name="arrow-back" fill={"white"} width={30} height={30} />
          </TouchableOpacity>




          <TouchableOpacity style={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 20, height: 40, width: 40, justifyContent: "center", alignItems: "center", alignContent: "center" }}>
            <Icon name="more-vertical" fill={"white"} width={30} height={30} />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal={false}
          stickyHeaderIndices={[1]}
          onScroll={event => {
            const y = event.nativeEvent.contentOffset.y;
            resizeName(y)
          }}
        >
          <View style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            width: windowWidth,
            height: windowWidth,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}>
            {props.route.params.data.profilePicture === "" || props.route.params.data.profilePicture === "Null" &&
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
          <View style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            width: "100%",
            height: 50,
            top: -50
          }}>
            <Text style={[{ left: LEFT, fontSize: SIZE }, styles.nameTitle]}>
              {props.route.params.data.name}
            </Text>
          </View>








          <View style={styles.section}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Archivos, enlaces y docs</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "white" }}>314 </Text>
                <Icon name="arrow-ios-forward-outline" fill={"rgba(255,255,255,0.5)"} width={20} height={20} />
              </View>
            </View>



            <ScrollView horizontal={true} >
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
          <TouchableOpacity style={{
            padding: 5,
            flexDirection: "row",
            backgroundColor: "rgba(0,0,0,0.05)",
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center"
          }}>
            <View style={{
              width: "15%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: 5,
              margin: 0.5
            }}>
              <Icon name="trash-2-outline" fill={colorBeta} width={30} height={30} />
            </View>

            <View style={{
              width: "60%",
              height: 50,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 8,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 8,
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: 5,
              paddingHorizontal: 15,
              margin: 0.5
            }}>
              <Text style={{ fontSize: 20, lineHeight: 35, fontWeight: "bold", color: colorBeta }}>Eliminar </Text>
            </View>
          </TouchableOpacity> */}



{filler()} 


        


















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
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
  },
  labelName: {
    fontSize: 14,
    color: "white"
  },
  nameTitle: {
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    textShadowColor: '#000',
    position: "absolute",
    bottom: 10,
    color: "white",
    lineHeight: 35,
    fontWeight: "bold",
    paddingLeft: 10,
    overflow: "hidden",
    width: "80%",
  }
})
export default Contactview;


function filler (){
  return(
    <>
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

    </>
  )
}




