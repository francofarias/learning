export class Jogo{
    #campo
    #bola
    #jogadorEsquerda
    #jogadorDireita
    #placar
    constructor(campo, bola, jogadorEsquerda, jogadorDireita, placar){
        this.#campo = campo
        this.#bola = bola
        this.#jogadorEsquerda = jogadorEsquerda
        this.#jogadorDireita = jogadorDireita
        this.#placar = placar
    }
    desenhaJogo(contexto){
        const objsParaDesenhar = [this.#campo]//, this.#bola, this.jogadorEsquerda, this.#jogadorDireita, this.#placar]
        for (let valor of objsParaDesenhar){
            if(valor !== this.#placar){
                console.log(valor)
                contexto.fillStyle = valor.cor
                contexto.fillRect(0,0,valor.largura,valor.altura)
            } else{
                contexto.fillText(this.#jogadorEsquerda.pontos,this.#placar.x1,this.#placar.y)
                contexto.fillText(this.#jogadorDireita.pontos,this.#placar.x2,this.#placar.y)
            }
        }
        
    }
}