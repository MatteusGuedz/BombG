import React, {Component}from 'react'
import params from '../../params'
import { StyleSheet, Text, View, Alert } from 'react-native'
import MineField from '../../components/MineField'
import Header from '../../components/Header'
import LevelSelect from '../../components/LevelSelect'
import {
  criaMinasInTabuleiro,
  clonarTabuleiro,
  AbrirRecursiva,
  seTaExplodido,
  GanhouJogo,
  showMines,
  InverterBandeira,
  BandeirasUsadas
} from '../../logic'


export default class Game extends Component{

    constructor(props){
      super(props)
        this.state = this.createState()
      
    }



  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      tabuleiro: criaMinasInTabuleiro(rows, cols, this.minesAmount()),
      ganhou:false,
      lost:false,
      showLevelSelect: false,
    }
  }

  onOpenField = (row, column) => {
    const tabuleiro = clonarTabuleiro(this.state.tabuleiro)
    AbrirRecursiva(tabuleiro, row, column)
    const lost = seTaExplodido(tabuleiro)
    const won = GanhouJogo(tabuleiro)


    if(lost){
      showMines(tabuleiro)
      Alert.alert('Perdeuuuu!', 'Que Buuuuurro!')
    }

    if(won){ 
      Alert.alert('Parabéns', 'Você ganhou')
    }

    this.setState({ tabuleiro, lost, won})
  }

  onSelectField = (row, column) => {
    const tabuleiro = clonarTabuleiro(this.state.tabuleiro)
    InverterBandeira(tabuleiro, row, column)
    const won = GanhouJogo(tabuleiro)

    if(won) {
      Alert.alert('Parabéns', 'Você Venceu!')
    }

    this.setState({tabuleiro, won})
  }


   onLevelSelected = level => {
     params.difficultLevel = level
     this.setState(this.createState())
   }


  render(){
    return (
      <View style={styles.container}>
        <LevelSelect isVisible={this.state.showLevelSelect}
          onCancel={() => this.setState({ showLevelSelect: false})}
          onLevelSelected={this.onLevelSelected}/>
      <Header 
      flagsLeft={this.minesAmount() - BandeirasUsadas(this.state.tabuleiro)}
      onNewGame={() => this.setState(this.createState())}
      onFlagPress={() => {this.setState({showLevelSelect: true})}}
      />
        
     
    <View style={styles.board}>
      <MineField  tabuleiro={this.state.tabuleiro}
      onOpenField={this.onOpenField}
      onSelectField={this.onSelectField}
      />
    </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board:{
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});
