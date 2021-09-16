import React, { useState, useEffect, } from 'react';
import { RefreshControl, SafeAreaView, StatusBar, StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { chats } from '../json.js';
import { Icon } from 'react-native-eva-icons';
import Menu from '../components/Menu.js';
import TopSearch from '../components/TopSearch.js';
import TopMenuFirst from '../components/TopMenuFirst.js';
import TopMenuSecund from '../components/TopMenuSecund.js';
import { colorBeta, colorGamma, colorEpsilon, colorDseta } from '../Colors.js'
import ChatSmall from '../components/ChatSmall.js';
import _ from 'lodash';
import Swiper from 'react-native-swiper'
import UserContext from '../contexts/UserContext'
import axios from 'axios';
import { base_url, ApiCrm, ApiWhatsapp } from '../Env';
const windowWidth = Dimensions.get('window').width;

function Dashboard(props) {
  const [Load, setLoad] = useState(true);
  const [firstMenu, setfirstMenu] = useState(true); // header
  const [TopMenu, setTopMenu] = useState(false); // menu
  const [TopMenuSearch, setTopMenuSearch] = useState(false); //search
  const [selectList, setselectList] = useState([]);
  const userDetails = React.useContext(UserContext)
  //const [data, setdata] = useState([]);
  const [section, setsection] = useState("chats");
  const [paginate, setpaginate] = useState(1);

//  console.log("dashboard")


  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    //console.log("effect dasboard")
    //setdata(userDetails.userDetails.chats)
    //setdata(chats)
    //Get();
  }, [randomCode]);


  // async function Get() {
  //   let data = { id_user: userDetails.userDetails._id, rol: userDetails.userDetails.rol }
  //   await axios.post(base_url(ApiWhatsapp, `whatsapp/get/chats`), data)
  //     .then(function (response) {
  //       setdata(response.data);
  //     })
  //     .catch(function (error) { console.log(error, "???") });
  // }

  // useEffect(() => {
  //   setLoad(false)
  // }, [data]);

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }
  function openTopMenu() {
    setTopMenu(true);
  }
  function closeTopMenu() {
    setTopMenu(false);
  }
  function openTopMenuSearch() {
    setTopMenuSearch(true);
  }
  function closeTopMenuSearch() {
    setTopMenuSearch(false)
  }

  function clear() {
    setselectList([]);
  }

  function changeSection(e) {
    if (e === 0) { setpaginate(e); setsection("camera") }
    if (e === 1) { setpaginate(e); setsection("chats") }
    if (e === 2) { setpaginate(e); setsection("states") }
    if (e === 3) { setpaginate(e); setsection("calls") }
  }

  useEffect(() => {
    //console.log("setting....")
  }, [TopMenu, TopMenuSearch]);

  function SelectMany(value) {
    let array = { "id": value }
   // console.log("selecting on", array)
    if (selectList.length === 0) {
      setselectList([...selectList, array]);
    }
    else {
      let Updating = selectList.find(id => id.id == value)
      if (Updating === undefined) {
      //  console.log("no existe");
        setselectList([...selectList, array]);
      }
      else {
       // console.log("si existe");
        const update = selectList.filter(id => id.id !== value)
        setselectList(update)
      }
    }
  }

  function search(text) {
    if (text !== "") {
      let newData = _.filter(userDetails.userDetails.chats, { 'name': text });
     // console.log("resultados :", newData.length);
    }
    else {
     // console.log("vacio")
    }
  }


  const [refreshing, setRefreshing] = useState(false);


  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);


  const onRefresh = () => {
   //console.log("refresh");
    // wait(2000).then(() => setRefreshing(false));
  }




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colorGamma} barStyle="light-content" />
      <TopSearch show={TopMenuSearch} closeTopMenuSearch={closeTopMenuSearch} search={search} />
      <ImageBackground 
      source={require('../images/background_1.png')}
      style={StyleSheet.absoluteFillObject}
      blurRadius={0}
      //style={{ flex: 1, justifyContent: "flex-start", resizeMode: "cover", width: "100%", height: "100%" }}
      >
        <View style={{ backgroundColor: colorGamma, position: "absolute", zIndex: 999, top: 0, width: "100%", }}>
          {selectList.length > 0 &&
            <View style={{ height: 88, flexDirection: "row", backgroundColor: colorGamma, width: "85%", position: "absolute", zIndex: 99, justifyContent: "space-around", paddingTop: 30, }}>
              <TouchableOpacity onPress={() => clear()}>
                <Icon name="arrow-back" fill={colorDseta} width={30} height={30} />
              </TouchableOpacity>
              <Text style={{ color: colorDseta, fontSize: 20, fontWeight: "bold" }}>{selectList.length}</Text>
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
          }
          {firstMenu === true &&
            <TopMenuFirst openTopMenu={openTopMenu} openTopMenuSearch={openTopMenuSearch} />
          }
          {/* {firstMenu === true &&
            <TopMenuSecund section={section} changeSection={changeSection} data={userDetails.userDetails.chats} />
          } */}
        </View>

        <Swiper showsButtons={true} showsButtons={false} onIndexChanged={changeSection} showsPagination={false} index={paginate} style={{ marginTop: 90 /* 145 */ }} loop={false}>
          <View style={{
            position: "absolute",
            zIndex: 9,
            width: windowWidth,
            backgroundColor: "black",
            height: "100%"
          }}>
          </View>
          <View style={{ width: windowWidth }}>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            >
              {userDetails.userDetails.chats.length > 0 && userDetails.userDetails.chats.map((i, key) => {
                if (i !== null) {
                  // console.log("map data", key)
                  if (selectList.length === 0) {
                    i.selected = false
                    i.back = "red"
                  }
                  else {
                    selectList.map((s, key) => {
                      if (s.id === i.jid) {
                        //console.log(s.id, "=== ", i.jid)
                        i.selected = true;
                      }
                      else {
                        i.selected = false;
                      }
                    })
                  }
                  if (!i.name) { i.name = i.jid.split("@")[0] }
                  if (i.name === ".") { i.name = i.jid.split("@")[0] }
                  return (
                    <ChatSmall
                      key={key}
                      data={i}
                      goToScreen={goToScreen}
                      SelectMany={SelectMany}
                      selectList={selectList.length}
                    />
                  )
                }
                //else {console.log(key, " null")}
              })
              }
            </ScrollView>

            {/* {!Load && data.length === 0 &&
                <View style={{ width: "100%", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                <View style={{ width: 300, height: 300, justifyContent: "center" }}>
                  <Text style={{ fontSize: 24, position: "absolute", zIndex: 999, textAlign: "center", width: 300, height: 90, fontWeight: "bold", paddingHorizontal: 40 }}>
                    Aun no tienes chats con tus contactos</Text>
                  <Image style={{ width: null, height: null, resizeMode: "center", flex: 1 }} source={require('../images/info.png')} />
                </View> 
                </View>
              } */}

          </View>
          <View style={{ width: windowWidth, height: 200, backgroundColor: "orange" }}><Text>states</Text></View>
          <View style={{ width: windowWidth, height: 200, backgroundColor: "yellow" }}><Text> calls</Text></View>
        </Swiper>
        <TouchableOpacity onPress={() => goToScreen("ContactList", userDetails.userDetails.chats)} style={{ position: "absolute", right: 15, bottom: 10, backgroundColor: colorBeta, borderRadius: 30, width: 60, height: 60, alignItems: "center", alignContent: "center", justifyContent: "center" }}>
          <Icon name="message-square" fill={colorDseta} width={30} height={30} />
        </TouchableOpacity>
      </ImageBackground>
      <Menu level={3} show={TopMenu} closeTopMenu={closeTopMenu} goToScreen={goToScreen} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
export default React.memo(Dashboard);