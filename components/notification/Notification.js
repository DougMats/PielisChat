import React, { useCallback, useRef, useEffect, useState, useContext } from 'react'
import { Animated, StyleSheet, View, Text, TouchableOpacity, Image, } from 'react-native'
import { colorAlfa, colorBeta } from '../../Colors.js';
import { Icon } from 'react-native-eva-icons';
import UserContext from '../../contexts/UserContext'

function Notification(props) {
  const [user, setuser] = useState(false);
  //const [user, setuser] = useState({ jid: "" });
  const animated = new Animated.Value(-200);
  const [print, setprint] = useState(false);
  const themeUI = "message" //message //default
  const { userDetails, setUserDetails } = useContext(UserContext)
  const userNumber = props.Body.split(" ")[2]


  console.log("______________________________________________________________________________ component notification ")


  useEffect(() => {
    if (props.Body !== "" && props.Title !== "") {

      for (var i in userDetails.chats) {
        if (userDetails.chats[i] !== null) {
          if (userDetails.chats[i].jid === userNumber) {
            //console.log("conseguido")
            let data = userDetails.chats[i]
            setuser(data)
          }
        }
      }

      setprint(true)
    }
    else {
      console.log("nothing to print notification")
    }
  }, [props.Body]);



  useEffect(() => {
    console.log("print its true .....")
    if (print === true) {
      Animations()
      PushStorage()
      
    }
  }, [print]);



//   useEffect(() => {
//     (async function() {
//         try {
//             const response = await fetch(
//                 `https://www.reddit.com/r/${subreddit}.json`
//             );
//             const json = await response.json();
//             setPosts(json.data.children.map(it => it.data));
//         } catch (e) {
//             console.error(e);
//         }
//     })();
// }, []);




  async function PushStorage() {
    console.log("PushStorage")
    let newMessage = [JSON.parse(props.Message)]
    newMessage.status = "NOTREAD"

    console.log("before: ", userDetails.chats.length)



    if (user === false) {
      console.log("______________________________________________________________________________ new contact")
      let contact = {
        advisor: "default",
        back: "red",
        count: 1,
        jid: props.Body.split(" ")[2],
        message: true,
        messages: newMessage,
        mute: 0,
        name: "",
        profilePicture: "",
        selected: false,
        spam: false,
        t: Math.round(new Date().getTime() / 1000)
      }
      let chat = [contact, ...userDetails.chats]
      let user = userDetails
      user.chats = chat
      console.log("updating context......")
      await setUserDetails({ ...user })
    }
    else {
      console.log("-------------------------------------------------------- betta user: ", user)
      //   console.log("aqui se supone que se actualiza ")
      //   for (var i in userDetails.chats) {
      //     if (userDetails.chats[i] !== null) {
      //       if (userDetails.chats[i].jid === userNumber) {
      //         console.log("conseguido otra vez ")
      //         let contact = userDetails.chats[i]
      //         let mssgsAll = contact.messages
      //         let mssgsPlus = [props.Message, ...mssgsAll]
      //         contact.messages = mssgsPlus
      //         const contactsNotNull = await userDetails.chats.filter(obj => obj !== null);
      //         const contacts = await contactsNotNull.filter(obj => obj.jid !== userNumber);
      //         let updated = [{ ...contact, ...contacts }]
      //         let user = {
      //           _id: userDetails._id,
      //           id_user: userDetails.id_user,
      //           name: userDetails.name,
      //           password: userDetails.password,
      //           phone: userDetails.phone,
      //           queue: userDetails.queue,
      //           rol: userDetails.rol,
      //           chats: updated
      //         }
      //         await setUserDetails({ ...user })
      //       }
      //     }
      //   }
    }



    console.log("after: ", userDetails.chats.length)
    // console.log("to update");
    // console.log("tercer: ", userDetails.chats.length)
    props.update();
  }





  function Animations() {
    Animated.sequence([
      Animated.timing(animated, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animated, {
        toValue: -200,
        duration: 350,
        useNativeDriver: true,
        delay: 10000
      }),
    ]).start();
  }



  function reemplazar(n, body) {
    if (body !== "" && body !== undefined && body !== null) {
      let user = body.split(" ")[2]
      let number = user.split("@")[0]
      if (n === 1) { return number }
      if (n === 2) { return body.replace(user, number); }
    }
  }

  function letterCounter(text, max) {
    return ((text.length > max) ? ((text.substring(0, max - 3)) + '...') : text)
  }

  function typeMessage(string) {
    const data = JSON.parse(string);
    if (data.message.conversation) {
      return letterCounter(data.message.conversation, 46)
    }
    else {
      if (data.message.extendedTextMessage) {
        return "Ha respondido a tu mensaje"
      }
      else {
        if (data.message.audioMessage) {
          return "te ha enviao un audio"
        }
        else {
          if (data.message.videoMessage) {
            return "te ha enviao un mensaje"
          }
          else {
            if (data.message.videoMessage) {
              return "te ha enviao un video"
            }
            else {
              if (data.message.documentMessage) {
                return "te ha enviao un documento"
              }
              else {
                console.log("...")
              }
            }
          }
        }
      }
    }
  }

  if (themeUI === "message") {
    return (
      <Animated.View style={[{ backgroundColor: "red", transform: [{ translateY: animated }] }]}>
        <View style={styles.wrap}>
          <View style={
            {
              width: "95%",
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: 8,
              flexDirection: "column",
              overflow: "hidden"
            }}>
            <View style={{
              paddingVertical: 5,
              paddingHorizontal: 15,
              flexDirection: "row",
              backgroundColor: "rgba(255,255,255,0.8",
              borderBottomColor: "#ccc",
              borderBottomWidth: 0.5
            }}>
              <Text style={{ fontWeight: "bold", fontSize: 16, color: colorBeta }}>Pielis · Ahora</Text>
            </View>
            <View style={{ flexDirection: "row", padding: 10 }}>
              <View style={{ justifyContent: "center", flexDirection: "column", width: "80%", }}>
                <Text style={{ fontWeight: "bold" }}>
                  {user !== false ? user.name : reemplazar(1, props.Body)}
                </Text>
                <Text style={{ color: "black" }}>{typeMessage(props.Message)}</Text>
              </View>
              <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", width: "20%", }}>
                <View style={{ width: 50, height: 50, overflow: "hidden", borderRadius: 50 }}>
                  {/* <View style={{ zIndex: 2, position: "absolute", width: "100%", height: "100%" }}><Image style={{ width: null, height: null, resizeMode: "cover", flex: 1 }} source={{ uri: user.profilePicture }} /></View> */}
                  <View style={{ zIndex: 1, position: "absolute", width: "100%", height: "100%" }}><Image style={{ width: null, height: null, resizeMode: "cover", flex: 1 }} source={require("../../images/isotype2.png")} /></View>
                </View>
              </View>
            </View>
            <View style={{
              display: "none",
              flexDirection: "row",
              backgroundColor: "rgba(255,255,255,0.8",
              borderTopColor: "#ccc",
              borderTopWidth: 0.5,
              justifyContent: "space-around",
              paddingTop: 5,
              paddingBottom: 10,
              paddingHorizontal: 15,
            }}>
              <Text style={{ color: colorBeta, fontWeight: "bold" }}>Responder</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    )
  }
  //default
  else {
    return (
      <Animated.View style={[{ backgroundColor: "red", transform: [{ translateY: animated }] }]}>
        <View style={styles.wrap}>
          {user !== false ?
            <View style={styles.notification}>
              <View style={styles.left}>
                <View style={styles.container}>
                  {/* <Image style={styles.img} source={{ uri: user.profilePicture }} /> */}
                </View>
              </View>
              <View style={styles.right}>
                <Text style={styles.title}>{props.Title}</Text>
                <Text style={styles.body}>{user.message}</Text>
              </View>
              <View style={styles.shadow}></View>
            </View>
            :
            <View style={styles.notification}>
              <View style={styles.left}>
                <View style={styles.container}>
                  <Image style={styles.img} source={require("../../images/isotype2.png")} />
                </View>
              </View>
              <View style={styles.right}>
                <Text style={styles.title}>{props.Title}</Text>
                <Text style={styles.body}>{reemplazar(2, props.Body)}</Text>
              </View>
              <View style={styles.shadow}></View>
            </View>
          }
        </View>
      </Animated.View>
    )
  }
}

const circle = 60
const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    top: 10,
    position: "absolute",
    zIndex: 9999,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  notification: {
    width: "95%",
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: "row",
    overflow: "hidden"
  },
  left: {
    alignItems: "center",
    alignContent: "center",
    width: "20%",
    justifyContent: "center"
  },
  container: {
    width: circle,
    height: circle,
    borderRadius: circle,
    overflow: "hidden",
    backgroundColor: "red",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },
  right: {
    justifyContent: "space-around",
    width: "80%",
    opacity: 0.8,
    flexDirection: "column",
  },
  title: {
    lineHeight: 30,
    fontSize: 18,
    fontWeight: "bold"
  },
  body: {
    lineHeight: 30,
    width: "100%",
    fontWeight: "400",
    color: "black",
  },
  shadow: {
    position: "absolute",
    zIndex: -1,
    backgroundColor: "rgba(255,255,255,0.5)",
    width: "200%",
    height: 200,
    marginTop: 50,
    marginLeft: -60,
    transform: [
      { rotateZ: "8deg" }
    ]
  }
})

export default Notification;

