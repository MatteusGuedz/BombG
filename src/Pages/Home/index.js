import React from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';
import Logo from '../../assets/BomHome.png'
import Start from '../../assets/Start.png'
import { useNavigation} from '@react-navigation/native';

// import { Container } from './styles';

const Home = () => {

  const navigation = useNavigation();

  return (
  <View style={styles.container}>
    <View style={styles.BoxMain}>
        <Image style={styles.Logo} source={Logo} resizeMode="contain"/>
<TouchableNativeFeedback onPress={()=> navigation.navigate('HomeGame')}>
        <Image style={styles.Start} source={Start} resizeMode="cover"/>
 </TouchableNativeFeedback>       
     </View>
    <Text style={styles.info}> Developed by Matteus Guedz in 2020 </Text>
  </View>
  )
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingBottom: 5,
    backgroundColor: '#222224'

  },

  BoxMain:{
    padding:10,
    alignItems: "center"
  },
  Logo:{
    width:230,
    height: 320,
    marginBottom: 30,
  },
  Start:{
    width:250,
    height: 100
  },
  info:{
    fontSize: 14,
    color: '#e7dfdd',
    fontWeight: 'bold'
  }
})
export default Home;