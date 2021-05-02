//Jogo ponto feito por Franco F. Farias para fins de estudo
//Referências: curso Alura, MDN, canal Youtube: Veslasoft - Filipe Alves

//O sistema de coordenadas no canvas começa do ponto x,y = 0,0 que fica no alto do canvas
//a esquerda, e seu valor de x aumenta enquanto andamos para a direita e seu valor de
//y aumenta enquanto andamos para baixo

const canvas = document.getElementById('jogo') //Pega o elemento canvas criado no HTML pelo id
const ctx = canvas.getContext('2d') //Pega o contexto 2D do canvas para utilizar os métodos de renderização 2D

/**
 * Cria o objeto bolinha
 */
var bolinha = {
    xBolinha: 300,
    yBolinha: 200,
    raioBolinha: 10,
    velXBolinha: 6,
    velYBolinha: 6,
    
/**
 * cria a bolinha (que na verdade é um quadrado pra simplificar a renderização do jogo)
 */
    desenha: function(){
        ctx.fillStyle = "white"
        ctx.fillRect(this.xBolinha, this.yBolinha, this.raioBolinha, this.raioBolinha)
    },
    moveIa: function(){
        //Move a bolinha no eixo X e Y com a velocidade definida
        this.colisão()
        this.xBolinha += this.velXBolinha
        this.yBolinha += this.velYBolinha
    },
    /**
     * Verifica a colisão com as bordas do canvas (área/campo de jogo), compara
     * a posição da bolinha se está dentro das dimensões do canvas, quando observa
     * que o valor excedeu inverte a direção da bolinha
     * 
     * Verifica a colisão com as raquetes, compara a posição da bolinha e das
     * raquetes, invertendo a direção da bolinha quando determina a colição,
     * a colisão com as raquetes só é valida pela frente delas, sendo feita uma
     * verificação adicional da direção da bolinha pra determinar se ela colidiu
     * pela frente da raquete (valido) ou pela parte de trás (invalido)
     */
    colisão: function(){
        //Verifica colisão com as bordas do canvas
        if(this.xBolinha + this.raioBolinha >= canvas.width){
            this.velXBolinha *= -1
            raquete1.pontos += 1
        }
        if(this.xBolinha <= 0){
            this.velXBolinha *= -1
            raquete2.pontos += 1
        }
        if(this.yBolinha + this.raioBolinha >= canvas.height || this.yBolinha <= 0){
            this.velYBolinha *= -1
        }
        
        //Verifica a colição com as raquetes
        if(this.xBolinha + this.raioBolinha >= raquete2.xRaquete && this.yBolinha >= raquete2.yRaquete && this.yBolinha <= raquete2.yRaquete + raquete2.alturaRaquete && this.velXBolinha > 0){
            this.velXBolinha *= -1
        }
        if(this.xBolinha <= raquete1.xRaquete + raquete1.larguraRaquete && this.yBolinha >= raquete1.yRaquete && this.yBolinha <= raquete1.yRaquete + raquete1.alturaRaquete && this.velXBolinha < 0){
            this.velXBolinha *= -1
        }
    }
}

/**
 * Cria objeto raquete
 */
var raquete = {
    xRaquete: 0,
    yRaquete: 150,
    larguraRaquete: 6,
    alturaRaquete: 100,
    velRaquete: 0,
    chanceErro: 0,
    contador:0.1,
    pontos:0,

    /**
     * Método para desenhar as raquetes, posição x utilizada para definir o lado do campo
     */
    desenha: function(){
        ctx.fillStyle = "white"
        ctx.fillRect(this.xRaquete, this.yRaquete, this.larguraRaquete, this.alturaRaquete)
    },

    /**
     * Move a raquete seguindo a bolinha de forma automática, adiciona um erro para o jogador poder ganhar.
     * @param {number} yBolinha 
     */
    moveIa: function(yBolinha){
        if (this.chanceErro < -60){
            this.contador *= -1
        }
        if (this.chanceErro > 60){
            this.contador *= -1
        }

        -60 < erro < 60
        //O contator incrimenta e decrementa a chance da raquete errar a bolinha com o tempo
        this.chanceErro += this.contador
        //Para determinar a velocidade que a raquete vai seguir a bolinha subtraimos a posição y da bolinha da da raquete com a correção para a posição do meio da raqueta e adicionamos o erro
        this.velRaquete = yBolinha - this.yRaquete - 50 - this.chanceErro
        this.yRaquete += this.velRaquete
    },
    moveJogador: function(tecla){
        if(tecla === 'ArrowUp'){
            this.yRaquete += -50
        }
        if(tecla === 'ArrowDown'){
            this.yRaquete += 50
        }
    }
}

//Cria as raquetes dos jogares
var raquete1 = Object.create(raquete) //jogador da esquerda
var raquete2 = Object.create(raquete) //jogador da direita

var teclaJogador

//Observa as teclas precionadas e chama a função teclaPrecionada
document.addEventListener('keydown', teclaPrecionada)
/**
 * @param {string} event 
 */
function teclaPrecionada(event){
    teclaJogador = event.key

    raquete1.moveJogador(teclaJogador)
}



iniciaJogo();

function iniciaJogo() {
//Inicia o jogo colocando os atores nas suas posições iniciais de definindo o valor inicial
//das variáveis de controle

    //Desenha o campo de jogo
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    bolinha.desenha()

    //Define a posição das raquetes no canvas (campo de jogo)
    raquete1.xRaquete = 10 //jogador da esquerda
    raquete2.xRaquete = 584 //jogador da direita

    raquete1.desenha()
    raquete2.desenha()

    rodaJogo()
}

function rodaJogo(){
// Função recursiva que desenha todos os elementos do jogo e atualiza a posição dos atores,
// verifica colisões e computa as demais regras do jogo

    //Desenha o campo de jogo sobreescrevendo tudo que foi desenhado antes, limpa a tela para
    //um novo frame/quadro do jogo
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,canvas.width,canvas.height)


    bolinha.desenha()
    bolinha.moveIa()

    raquete1.desenha()
    raquete2.desenha()
    raquete2.moveIa(bolinha.yBolinha)

    ctx.fillText(raquete1.pontos,250,30)
    ctx.fillText(raquete2.pontos,350,30)

    requestAnimationFrame(rodaJogo) //função que gera o loop para o jogo
}

