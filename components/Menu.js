import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, colorGamma } from '../Colors.js'
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'

function Menu(props) {
  const { userDetails, setUserDetails } = useContext(UserContext)
  const [menu, setmenu] = useState(props.level);
  function closet() {
    setmenu(1);
    props.closeTopMenu();
  }

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('@Passport');
      setUserDetails({})
      props.closeTopMenu();
      props.goToScreen("Login", null)
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <TouchableOpacity style={[styles.wrapper, { display: props.show === true ? "flex" : "none" }]} onPress={() => closet()}>
      {menu === 1 &&
        <View style={styles.wrap}>
          <TouchableOpacity onPress={() => props.goToScreen("ContactView", props.data)}
            style={styles.row}>
            <Text style={styles.text}>Ver contacto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Archivos, enlaces y docs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Silenciar notificaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setmenu(2)}
            style={styles.row}>
            <Text style={styles.text}>Más</Text>
            <Icon name="arrow-right" fill={colorBeta} width={20} height={20} />
          </TouchableOpacity>
        </View>
      }
      {menu === 2 &&
        <View style={styles.wrap}>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Reportar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Bloquear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Vaciar chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Exportat chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Crear acceso directo</Text>
          </TouchableOpacity>
        </View>
      }

      {menu === 3 &&
        <View style={styles.wrap}>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Nuevo grupo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Nueva difusión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Dispositivos vinculados</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Mensajes destacados</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Ajustes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => logOut()}
            style={styles.row}>
            <Text style={styles.text}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      }
      {menu === 4 &&
        <View style={styles.wrap}>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Compartir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Ver en la libreta de contactos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}>
            <Text style={styles.text}>Confirmar código de seguridad</Text>
          </TouchableOpacity>
        </View>
      }
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    zIndex: 999,
    flex: 1,
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingVertical: 20,
  },
  wrap: {
    width: "55%",
    backgroundColor: "#fff",
    paddingVertical: 20,
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 0,
    borderBottomLeftRadius: 10
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomColor: "silver",
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
  },
  text: {
    width: "90%",
    fontSize: 14,
    color: "#555",
    fontWeight: "600"
  }
});

export default React.memo(Menu);