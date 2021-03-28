requestAnimationFrame(desenhaCanvas)
const canvas = document.getElementById('jogo')
const ctx = canvas.getContext('2d')

//Parametros da Bolinha
var xBolinha = 300
var yBolinha = 200
var raioBolinha = 10
var velXBolinha = 1
var velYBolinha = velXBolinha
var xMoveBolinha = xBolinha
var yMoveBolinha = yBolinha


function desenhaCanvas(){
// Função recursiva que desenha todos os elementos do jogo na tela usando o elamento canvas do
//html

    //limpa a tela dos retangulos
    ctx.clearRect(0,0,canvas.width,canvas.height)

    //cria a bolinha (que na verdade é um quadrado pra simplificar a renderização do jogo)
    ctx.fillRect(xBolinha,yBolinha,raioBolinha,raioBolinha)
    ctx.fillStyle = "white"
    ctx.fill()

    //Move a bolinha no eixo X e Y com a velocidade definida
    xBolinha += velXBolinha
    yBolinha += velYBolinha

    //Verifica colisão com as bordas do canvas
    if(xBolinha+raioBolinha >= canvas.width || xBolinha < 0){
        velXBolinha *= -1
    }
    if(yBolinha+raioBolinha >= canvas.height || yBolinha < 0){
        velYBolinha *= -1
    }


    requestAnimationFrame(desenhaCanvas) //função que gera o loop para o jogo
}

