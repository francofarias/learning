//Jogo ponto feito por Franco F. Farias para fins de estudo
//Referências: curso Alura, MDN, canal Youtube: Veslasoft - Filipe Alves

//O sistema de coordenadas no canvas começa do ponto x,y = 0,0 que fica no alto do canvas
//a esquerda, e seu valor de x aumenta enquanto andamos para a direita e seu valor de
//y aumenta enquanto andamos para baixo

const canvas = document.getElementById('jogo') //Pega o elemento canvas criado no HTML pelo id
const ctx = canvas.getContext('2d') //Pega o contexto 2D do canvas para utilizar os métodos de renderização 2D


//Objeto bolinha
var bolinha = {
    xBolinha: 300,
    yBolinha: 200,
    raioBolinha: 10,
    velXBolinha: 1,
    velYBolinha: 1,

    desenha: function(){
        //cria a bolinha (que na verdade é um quadrado pra simplificar a renderização do jogo)
        ctx.fillStyle = "white"
        ctx.fillRect(this.xBolinha, this.yBolinha, this.raioBolinha, this.raioBolinha)
    },
    moveIa: function(){
        //Move a bolinha no eixo X e Y com a velocidade definida
        this.xBolinha += this.velXBolinha
        this.yBolinha += this.velYBolinha
    },
    colisão: function(){
        //Verifica colisão com as bordas do canvas
        if(this.xBolinha + this.raioBolinha >= canvas.width || this.xBolinha < 0){
            this.velXBolinha *= -1
        }
        if(this.yBolinha + this.raioBolinha >= canvas.height || this.yBolinha < 0){
            this.velYBolinha *= -1
        }
    }
}

//Objeto raquete
var raquete = {
    xRaquete: 0,
    yRaquete: 150,
    larguraRaquete: 6,
    alturaRaquete: 100,

    desenha: function(){
        //Desenha a raquete de acordo com as coordenadas e dimensões definidas
        ctx.fillStyle = "white"
        ctx.fillRect(this.xRaquete, this.yRaquete, this.larguraRaquete, this.alturaRaquete)
    }
}

//Cria as raqutes dos jogares
var raquete1 = Object.create(raquete) //jogador da esquerda
var raquete2 = Object.create(raquete) //jogador da direita

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
    bolinha.colisão()

    raquete1.desenha()
    raquete2.desenha()


    requestAnimationFrame(rodaJogo) //função que gera o loop para o jogo
}

