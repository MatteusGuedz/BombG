import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';





import Home from './Pages/Home';
import HomeGame from './Pages/HomeGame';

export const AppStack = createStackNavigator();

function Routes(){

return (
  <NavigationContainer>
     <AppStack.Navigator screenOptions={{headerShown: false}}>
          <AppStack.Screen  name="Home" component={Home}/>
          <AppStack.Screen  name="HomeGame" component={HomeGame}/>
   </AppStack.Navigator>
   </NavigationContainer>
   
) }

export default Routes;