import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, ImageBackground, Image, StatusBar, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, colorGamma, colorEpsilon, colorDseta, colorEta, colorZeta, colorIota, colorKappa, colorLambda, colorMi, colorNi, colorXi, colorΟmicron, colorPi, colorRo, colorSigma, colorΤau, colorIpsilon, colorFi, colorJi, colorPsi, colorOmega }
  from '../Colors.js'
import _ from 'lodash';
function ContactList(props) {
  const [count, setcount] = useState(34);
  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(),data })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colorGamma} barStyle="light-content" />
      <ImageBackground source={require('../images/background_1.png')}
        style={{

          flex: 1,
          justifyContent: "flex-start",
          resizeMode: "cover",
          width: "100%",
          height: "100%"
        }}>

        <View style={styles.wrap}>
          <View style={styles.head}>
            <Icon name="arrow-back" fill={colorDseta} width={30} height={30} />
            <View style={{ flexDirection: "column", width: "50%" }}>
              <Text style={styles.title}>Contactos</Text>
              <Text style={styles.subtitle}>{count} Contactos</Text>
            </View>
            <Icon name="search" fill={colorDseta} width={30} height={30} />
            <Icon name="more-vertical" fill={colorDseta} width={30} height={30} />
          </View>
          <ScrollView>
            <View style={styles.body}>

              {
                [
                  {
                    advisor: "60dcaa764b1f05d5a5e41e8e",
                    count: 0,
                    jid: "573203033242@s.whatsapp.net",
                    message: "true",
                    modify_tag: "649052",
                    mute: "0",
                    name: "Carlos Cardenas",
                    profilePicture: "https://pps.whatsapp.net/v/t61.24694-24/212885386_345797030397396_1404430475101662916_n.jpg?ccb=11-4&oh=33beacbf016da9d229dda83f4b697161&oe=6132FBA0",
                    spam: "false",
                    t: 1630439903,
                    messages: []}
                ].map((i, key) => {
                  return (
                    <Contact key={key} data={i} goToScreen={goToScreen} />
                  )
                })
              }


            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  wrap: {},
  head: { flexDirection: "row", height: 60, backgroundColor: colorGamma, alignContent: "center", alignItems: "center", justifyContent: "space-around" },
  title: { color: "white", fontSize: 20, fontWeight: "bold" },
  subtitle: { color: "white", fontSize: 16 },
  body: {
    padding: 10,
    marginBottom: 100

  }
})

function Contact(props) {
  return (
    <TouchableOpacity
      onPress={() => props.goToScreen("Chat",props.data)}

      style={{
        borderBottomColor: "rgba(255,255,255,0.5)",
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "center",
        alignContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 20
      }}>
      <View style={{ width: "20%" }}>
        <View style={{ width: 60, height: 60, borderRadius: 30, overflow: "hidden", backgroundColor: "white" }}>
          <Image
            style={{ width: null, height: null, flex: 1, resizeMode: "cover" }}
            source={{ uri: 'https://www.shaadidukaan.com/vogue/wp-content/uploads/2019/08/hug-kiss-images.jpg' }} />
        </View>
      </View>
      <View style={{ width: "80%" }}>
        <Text style={{ color: "white", fontSize: 24 }}>{props.data.name}</Text>
        <Text style={{ color: "white", fontSize: 14 }}>.</Text>
      </View>
    </TouchableOpacity>
  );
}


export default ContactList;