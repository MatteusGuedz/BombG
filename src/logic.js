const criaTabuleiro = (linhas, colunas) => {
  return Array(linhas).fill(0).map((_, linha) => {
    return Array(colunas).fill(0).map((_, coluna) =>{
      return {
        linha,
        coluna,
        opened:false,
        flagged:false,
        mined:false,
        exploded:false,
        nearMines:0
      }
    })
  })
}

const EspalhaMinas = (tabuleiro, TantoDeMinas) => {
  //pega as linhas no tabuleiro
  const linhas = tabuleiro.length 
  //pega as colunas dentro das linhas
  const colunas = tabuleiro[0].length 

  let minasPlantadas = 0

  while (minasPlantadas < TantoDeMinas){
    //gera  linha e coluna aleatoria no tabuleiro
    const rowSel = parseInt(Math.random() * linhas, 10)
    const columnSel = parseInt(Math.random() * colunas, 10)


    //se não tiver minada, pois mine
    if(!tabuleiro[rowSel][columnSel].mined){
      tabuleiro[rowSel][columnSel].mined = true
      minasPlantadas++
    }
  }

}

const criaMinasInTabuleiro = (linhas, colunas, TantoDeMinas) => {
  const tabuleiro = criaTabuleiro(linhas, colunas)
  EspalhaMinas(tabuleiro, TantoDeMinas)
  return tabuleiro
}

const clonarTabuleiro = tabuleiro => {
  return tabuleiro.map(linhas => {
    return linhas.map(field => {
      return {...field}
    })
  })
}

const PegarVizinhanca = (tabuleiro, linha, coluna) => {
  const vizinhos = []
  const linhas = [linha - 1, linha, linha + 1]
  const colunas = [coluna - 1, coluna, coluna + 1]

  linhas.forEach(l => {
    colunas.forEach( c => {
      const diferente = l !== linha || c !== coluna
      const LinhaValida = l >= 0 && l < tabuleiro.length 
      const ColunaValida = c >= 0 && c < tabuleiro[0].length 
      if( diferente && LinhaValida && ColunaValida){
        vizinhos.push(tabuleiro[l][c])
      }
    })
  })
  return vizinhos
}

const VizinhancaSegura = (tabuleiro, linha, coluna) => {
  const Seguros = (resultado, vizinhos) => resultado && !vizinhos.mined
  return PegarVizinhanca(tabuleiro, linha, coluna).reduce(Seguros, true)
}

const AbrirRecursiva = (tabuleiro, linha, coluna) => {
  const field = tabuleiro[linha][coluna]
  if(!field.opened){
    field.opened = true
     if(field.mined){
       field.exploded = true
     }else if (VizinhancaSegura(tabuleiro, linha, coluna)){
       PegarVizinhanca(tabuleiro, linha, coluna)
        .forEach( v => AbrirRecursiva(tabuleiro, v.linha, v.coluna))
     } else {
       const vizinhos = PegarVizinhanca(tabuleiro, linha, coluna)
       field.nearMines = vizinhos.filter(v => v.mined).length
     }
  }
}

const fields = tabuleiro => [].concat(...tabuleiro)

const seTaExplodido = tabuleiro => fields(tabuleiro)
  .filter(field => field.exploded).length > 0

const Pendente = field  => (field.mined && !field.flagged)
  || (!field.mined && !field.opened)
  
const GanhouJogo = tabuleiro => fields(tabuleiro)
  .filter(Pendente).length === 0  


const showMines = tabuleiro => fields(tabuleiro).filter(field => field.mined).forEach(field => field.opened = true)

const InverterBandeira = (tabuleiro, linha, coluna) => {
  const field = tabuleiro[linha][coluna]
  field.flagged = !field.flagged
}

const BandeirasUsadas = tabuleiro => fields(tabuleiro)
    .filter(field => field.flagged).length


export {
  criaMinasInTabuleiro,
  clonarTabuleiro,
  AbrirRecursiva,
  seTaExplodido,
  GanhouJogo,
  showMines,
  InverterBandeira,
  BandeirasUsadas

}