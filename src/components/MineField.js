import React from 'react'
import {View, StyleSheet } from 'react-native'
import Field from './Field'


export default function(props){
  const linhas  = props.tabuleiro.map((linha, l) => {
    const colunas = linha.map((field, c) => {
      return <Field {...field} key={c}
         onOpen={() => props.onOpenField(l, c)}
         onSelect={e => props.onSelectField(l, c)}
       />
    })
    return <View 
    style={{ flexDirection: 'row'}}
    key={l}>{colunas}</View>
  })
return <View style={styles.container}>{linhas}</View>
}


const styles = StyleSheet.create({
    container:{
      
      backgroundColor: '#EEE'
  }
})