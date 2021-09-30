// import React from 'react';
// import Dashboard from './screens/Dashboard.js'
// import Chat from './screens/Chat.js'
// const App =  () => {
//   return (
//     <Dashboard />
//   );
// };
// export default App;


import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import UserProvider from './contexts/UserProvider'

import Login from './screens/Login'
import Forgot from './screens/Forgot'
import Register from './screens/Register'
import Home from './screens/Home'
import Splash from './screens/Splash'
import Dashboard from './screens/Dashboard'
import Chat from './screens/Chat'
import ContactView from './screens/ContactView'


const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen headerMode={'none'} name="Home" component={Home} />
          <Stack.Screen headerMode={'none'} name="Splash" component={Splash} />
          <Stack.Screen headerMode={'none'} name="Login" component={Login} />
          <Stack.Screen headerMode={'none'} name="Forgot" component={Forgot} />
          <Stack.Screen headerMode={'none'} name="Register" component={Register} />
          <Stack.Screen headerMode={'none'} name="Dashboard" component={Dashboard} />
          <Stack.Screen headerMode={'none'} name="Chat" component={Chat} />
          <Stack.Screen headerMode={'none'} name="ContactView" component={ContactView} />
        
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  )
}
console.disableYellowBox = true
export default App;