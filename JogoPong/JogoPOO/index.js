import { Campo } from "./Classes/Campo.js"
import { Jogo } from "./Classes/Jogo.js"
//import { Bola } from "./Classes/Bola.js"
//import { Jogador } from "./Classes/Jogador.js"
//import { Placar } from "./Classes/Placar.js"


const canvas = document.getElementById('jogo') //Pega o elemento canvas criado no HTML pelo id
const ctx = canvas.getContext('2d') //Pega o contexto 2D do canvas para utilizar os métodos de renderização 2D

const campoJogo = new Campo('black',400,600)
//const bolinha = new Bola()
//const jogadorEsquerda = new Jogador()
//const jogadorDireita = new Jogador()
//const placar = new Placar()
const jogoPong = new Jogo(campoJogo)

jogoPong.desenhaJogo(ctx,jogoPong)

