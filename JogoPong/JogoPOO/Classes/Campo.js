export class Campo{
    #cor
    #altura
    #largura
    constructor(cor,altura,largura){
        this.#cor = cor
        this.#altura = altura
        this.#largura = largura
    }

    get cor(){
        return this.#cor
    }
    get altura(){
        return this.#altura
    }
    get largura(){
        return this.#largura
    }
}