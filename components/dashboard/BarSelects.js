import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, } from 'react-native'
import { Icon } from 'react-native-eva-icons';
 import { colorBeta, colorGamma, colorEpsilon, colorDseta } from '../../Colors.js'


function BarSelects(props) {
  
  return (
    <View style={{ height: 88, flexDirection: "row", backgroundColor: colorGamma, width: "85%", position: "absolute", zIndex: 99, justifyContent: "space-around", paddingTop: 30, }}>
              <TouchableOpacity onPress={() => props.clear()}>
                <Icon name="arrow-back" fill={colorDseta} width={30} height={30} />
              </TouchableOpacity>
              <Text style={{ color: colorDseta, fontSize: 20, fontWeight: "bold" }}>{props.selectList.length}</Text>
              <TouchableOpacity>
                <Icon name="trash" fill={colorDseta} width={30} height={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="attach-2" fill={colorDseta} width={30} height={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="volume-off" fill={colorDseta} width={30} height={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="inbox" fill={colorDseta} width={30} height={30} />
              </TouchableOpacity>
            </View>
  )
}

const styles = StyleSheet.create({
 
})
export default BarSelects;