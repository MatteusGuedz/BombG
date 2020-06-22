import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal  
} from 'react-native'

export default props => {
  return (
    <Modal 
      visible={props.isVisible} 
      animationType='slide'
      transparent={true}   
      onRequestClose={props.onCancel}>

       <View style={styles.frame}>
         <View style={styles.container}>
           <Text style={styles.title}>Selecione o Nivel</Text>

           <TouchableOpacity 
              onPress={() => props.onLevelSelected(0.1)}
              style={[styles.button, styles.bgEasy]}>
              <Text style={styles.buttonLabel}> Fácil </Text>
           </TouchableOpacity>

           <TouchableOpacity 
              onPress={() => props.onLevelSelected(0.2)}
              style={[styles.button, styles.bgNormal]}>
              <Text style={styles.buttonLabel}> Intermediário </Text>
           </TouchableOpacity>

           <TouchableOpacity 
              onPress={() => props.onLevelSelected(0.3)}
              style={[styles.button, styles.bgHard]}>
              <Text style={styles.buttonLabel}> Dificil </Text>
           </TouchableOpacity>
       
         </View>
       </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  frame:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },

  container:{
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    padding:15,
  },

  title:{
    fontSize: 25,
    fontWeight: 'bold'
  },

  button:{
    marginTop: 10,
    padding:5,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  buttonLabel:{
    fontSize:20,
    color: '#EEE',
    fontWeight: 'bold'
  },

  bgEasy:{
    backgroundColor:'#49b65d'
  },
  bgNormal:{
    backgroundColor:'#2765f7'
  },
  bgHard:{
    backgroundColor:'#f26337'
  }

  
})