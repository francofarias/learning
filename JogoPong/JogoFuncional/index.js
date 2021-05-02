'use strict'
/**
 * Jogo ponto feito por Franco F. Farias para fins de estudo
 * Referências: curso Alura, MDN, canal Youtube: Veslasoft - Filipe Alves
 * O sistema de coordenadas no canvas começa do ponto x,y = 0,0 que fica no alto do canvas
 * a esquerda, e seu valor de x aumenta enquanto andamos para a direita e seu valor de
 * y aumenta enquanto andamos para baixo
 */

/**Contexto do canvas, para acesso aos metodos de renderização 2D  */
const ctx = document.getElementById('jogo').getContext('2d')

/**
 * Vetor contendo os personagems do jogo e suas propriedades internas
 * @property {object} campo     - Campo/senário onde o jogo acontece
 * @property {object} bolinha   - Bola, anda de um lado ao outro do campo
 * @property {object} jogador1  - Barra vertical esquerda, move-se de cima para baixo tentando evitar com que a bolinha passe
 * @property {object} jogador2  - Mesmo que o jogador 1 mas a direita
 */
const estado = {
    campo: {x:0,y:0,altura:400,largura:600, cor: 'black'},
    bolinha: {x:300,y:200,altura:10,largura:10, cor: 'white', velX:6, velY:6},
    jogador1: {x:10,y:150,altura:100,largura:6, cor: 'white', velX:0, velY:0},
    jogador2: {x:584,y:150,altura:100,largura:6, cor: 'white', velX:0, velY:0, contador:0.1, chanceErro:0},
    placar: {x1:250, x2:350, y:30, j1:0, j2:0}
}

//Inicializa o jogo
reenderizaTela(estado, ctx)
let comandos
let comandosIA
comandosJogador()

//Começa o loop do jogo
loopJogo()

function loopJogo(){

    atualizaVelocidade('jogador1',comandos)
    comandosIA = jogadorIA(estado, 'jogador2')
    atualizaVelocidade('jogador2',comandosIA)
    movePersonagem(estado)
    colisãoEPontos(estado)
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
    for(const indice in props){
        if(indice !== 'placar'){
            contexto.fillStyle = props[indice].cor
            contexto.fillRect(props[indice].x, props[indice].y, props[indice].largura, props[indice].altura)
        } else{
            contexto.font = '20px Arial'
            contexto.fillText(props[indice].j1, props[indice].x1, props[indice].y)
            contexto.fillText(props[indice].j2, props[indice].x2, props[indice].y)
        }
    }
}

/**
 * Não Pura.
 * Altera o estado global do jogo.
 * Atualiza o valor da posição dos personagens incrementando sua velocidade
 * @param {object} props Objeto contendo os personagens e estados do jogo
 */
function movePersonagem(props){
    for(const indice in props){
     props[indice].x += props[indice].velX ? props[indice].velX : 0
     props[indice].y += props[indice].velY ? props[indice].velY : 0
    }
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

function atualizaVelocidade(id, comando){
    const velPadrão = 10
    const comandosAceitos = {
        ArrowUpPrecionada(id){
            estado[id].velY = -velPadrão
        },
        ArrowUpLiberada(id){
            estado[id].velY = 0
        },
        ArrowDownPrecionada(id){
            estado[id].velY = velPadrão
        },
        ArrowDownLiberada(id){
            estado[id].velY = 0
        },
        keyWPrecionada(id){
            estado[id].velY = -velPadrão
        },
        keyWLiberada(id){
            estado[id].velY = 0
        },
        keySPrecionada(id){
            estado[idNum].velY = velPadrão
        },
        keySLiberada(id){
            estado[id].velY = 0
        },
    }
    const minhaFunção = comandosAceitos[comando]
    if(minhaFunção){
        minhaFunção(id)
    }

}

function jogadorIA(estado,id){
    let comandoIA
    const maxErro = 60
    if(-maxErro < estado[id].chanceErro && estado[id].chanceErro < maxErro){
        estado[id].chanceErro += estado[id].contador
    } else{
        estado[id].contador *= -1
        estado[id].chanceErro += estado[id].contador
    }

    if(estado[id].y + estado[id].altura/2 + estado[id].chanceErro > estado.bolinha.y){
        comandoIA = 'ArrowUpPrecionada'
    }
    if(estado[id].y + estado[id].altura/2 + estado[id].chanceErro < estado.bolinha.y){
        comandoIA = 'ArrowDownPrecionada'
    }
    return comandoIA
}

function colisãoEPontos(props){
    //Verifica colisão com as bordas do canvas
    if(props.bolinha.x + props.bolinha.largura >= props.campo.largura){
        props.bolinha.velX *= -1
        props.placar.j1 += 1
    }
    if(props.bolinha.x <= 0){
        props.bolinha.velX *= -1
        props.placar.j2 += 1
    }
    if(props.bolinha.y + props.bolinha.altura >= props.campo.altura || props.bolinha.y <= 0){
        props.bolinha.velY *= -1
    }

    //Verifica a colição com as raquetes
    if(props.bolinha.x + props.bolinha.largura >= props.jogador2.x && props.bolinha.y >= props.jogador2.y && props.bolinha.y <= props.jogador2.y + props.jogador2.altura && props.bolinha.velX > 0){
        props.bolinha.velX *= -1
    }
    if(props.bolinha.x <= props.jogador1.x + props.jogador1.largura && props.bolinha.y >= props.jogador1.y && props.bolinha.y <= props.jogador1.y + props.jogador1.altura && props.bolinha.velX < 0){
        props.bolinha.velX *= -1
    }
}