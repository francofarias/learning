'use strict'
/**Contexto do canvas, para acesso aos metodos de renderização 2D  */
const ctx = document.getElementById('jogo').getContext('2d')

/**
 * Vetor contendo os personagems do jogo e suas propriedades internas
 * @property {object} campo     - Campo/senário onde o jogo acontece
 * @property {object} bolinha   - Bola, anda de um lado ao outro do campo
 * @property {object} jogador1  - Barra vertical esquerda, move-se de cima para baixo tentando evitar com que a bolinha passe
 * @property {object} jogador2  - Mesmo que o jogador 1 mas a direita
 */
const estado = [
    {id:'campo', x:0,y:0,altura:400,largura:600, cor: 'black'},
    {id:'bolinha', x:300,y:200,altura:10,largura:10, cor: 'white', velX:0, velY:0},
    {id:'jogador1', x:10,y:150,altura:100,largura:6, cor: 'white', velX:0, velY:0},
    {id:'jogador2', x:584,y:150,altura:100,largura:6, cor: 'white', velX:0, velY:0}
]

//Inicializa o jogo
reenderizaTela(estado, ctx)
let comandos
let comandosIA
comandosJogador()

//Começa o loop do jogo
loopJogo()

function loopJogo(){

    atualizaVelocidade(2,comandos)
    comandosIA = jogadorIA(estado,3)
    atualizaVelocidade(3,comandosIA)
    movePersonagem(estado)
    reenderizaTela(estado, ctx)
    requestAnimationFrame(loopJogo) //função que gera o loop para o jogo
}

//
/**
 * Não Pura.
 * Desenha no canvas os objetos dentro de um objeto conteiner
 * @param {object} props Objeto contendo os personagens e estados do jogo
 * @param {object} contexto Contexto do canvas, para acesso aos metodos de renderização 2D
 */
function reenderizaTela(props,contexto){
    props.map(el => {
        contexto.fillStyle = el.cor
        contexto.fillRect(el.x, el.y, el.largura, el.altura)
    })
}

/**
 * Não Pura.
 * Altera o estado global do jogo.
 * Atualiza o valor da posição dos personagens incrementando sua velocidade
 * @param {object} props Objeto contendo os personagens e estados do jogo
 */
function movePersonagem(props){
     props.map( el => el.x += el.velX ? el.velX : 0)
     props.map( el => el.y += el.velY ? el.velY : 0)
}

/**
 * Não Pura.
 * Altera o estado global dos comandos.
 * Cria um evendo a cada tecla precionada e liberada e coloca dentro da variavel comandos.
 * @example 
 * Quando a tecla W é precionada coloca dentro de comando a string 'keyWPrecionada' e quando ela é liberada atribui a comando 'keyWLiberada'
 */
function comandosJogador(){
    //Observa as teclas precionadas e chama a função teclaPrecionada
    document.addEventListener('keydown', comandos = teclaPrecionada)
    //Observa as teclas precionadas e chama a função teclaLiberada
    document.addEventListener('keyup', teclaLiberada)

    function teclaPrecionada(evento){
        comandos = `${evento.code}Precionada`
    }
    function teclaLiberada(evento){
        comandos = `${evento.code}Liberada`
    }
}

function atualizaVelocidade(idNum, comando){
    const velPadrão = 10
    const comandosAceitos = {
        ArrowUpPrecionada(idNum){
            estado[idNum].velY = -velPadrão
        },
        ArrowUpLiberada(idNum){
            estado[idNum].velY = 0
        },
        ArrowDownPrecionada(idNum){
            estado[idNum].velY = velPadrão
        },
        ArrowDownLiberada(idNum){
            estado[idNum].velY = 0
        },
        keyWPrecionada(idNum){
            estado[idNum].velY = -velPadrão
        },
        keyWLiberada(idNum){
            estado[idNum].velY = 0
        },
        keySPrecionada(idNum){
            estado[idNum].velY = velPadrão
        },
        keySLiberada(idNum){
            estado[idNum].velY = 0
        },
    }
    const minhaFunção = comandosAceitos[comando]
    if(minhaFunção){
        minhaFunção(idNum)
    }

}

function jogadorIA(estado,idNum){
    let comandoIA
    if(estado[idNum].y + estado[idNum].altura/2 > estado[1].y){
        comandoIA = 'ArrowUpPrecionada'
    }
    if(estado[idNum].y + estado[idNum].altura/2 < estado[1].y){
        comandoIA = 'ArrowDownPrecionada'
    }
    return comandoIA
}