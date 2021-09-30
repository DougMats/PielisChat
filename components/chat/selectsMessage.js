import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { colorBeta, colorGamma, colorDseta } from '../../Colors.js'

function SelectsMessage(props) {
  if (props.list.length >= 1) {
    return (
      <View style={{
        paddingTop: 10,
        height: 50,
        backgroundColor: colorGamma,
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        zIndex: 999999,
        top: 0,
        width: "100%"
      }}>


        <TouchableOpacity
          onPress={() => props.clearSelection()}
          style={{ width: 40, alignContent: "center", justifyContent: "center", alignItems: "center", height: 40, borderRadius: 20, marginTop: -5 }}>
          <Icon name="arrow-back" fill={"white"} width={30} height={30} />
        </TouchableOpacity>


        <Text style={{ color: colorDseta, fontSize: 20, fontWeight: "bold", width: "20%", }}>
          {props.list.length}
        </Text>


        {props.list.length === 1 &&
          <TouchableOpacity
            onPress={() => props.answer()}
            style={{ width: 40, alignContent: "center", justifyContent: "center", alignItems: "center", height: 40, borderRadius: 20, marginTop: -5 }}>
            <Icon name="undo" fill={"white"} width={30} height={30} />
          </TouchableOpacity>
        }

        <TouchableOpacity style={{ width: 40, alignContent: "center", justifyContent: "center", alignItems: "center", height: 40, borderRadius: 20, marginTop: -5 }}>
          <Icon name="star" fill={"white"} width={30} height={30} />
        </TouchableOpacity>
        <TouchableOpacity style={{ width: 40, alignContent: "center", justifyContent: "center", alignItems: "center", height: 40, borderRadius: 20, marginTop: -5 }}>
          <Icon name="trash" fill={"white"} width={30} height={30} />
        </TouchableOpacity>
        <TouchableOpacity style={{ transform: [{ rotate: '180deg' }], width: 40, alignContent: "center", justifyContent: "center", alignItems: "center", height: 40, borderRadius: 20, marginTop: -5 }}>
          <Icon name="undo" fill={"white"} width={30} height={30} />
        </TouchableOpacity>
        <TouchableOpacity style={{ width: 40, alignContent: "center", justifyContent: "center", alignItems: "center", height: 40, borderRadius: 20, marginTop: -5 }}>
          <Icon name="more-vertical-outline" fill={"white"} width={30} height={30} />
        </TouchableOpacity>
      </View>
    )
  }
  else { return (<></>) }
}



const styles = StyleSheet.create({


})
export default SelectsMessage;
