class MenuNavegação extends HTMLElement {

    constructor(){
        super()
        const shadow = this.attachShadow({ mode:'open'} )

        const raiz = document.createElement('div')
        raiz.setAttribute('class','raiz')

        const conteudo = `        
        <nav>
            <a class="btn active" onclick="telaHome()">Home</a>
            <a class="btn" onclick="telaCircuitos()">Circuitos</a>
            <a class="btn" onclick="telaCabos()">Cabos</a>
        </nav>
        `
      
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', './MenuNavegação.css');
        raiz.innerHTML = conteudo
        shadow.appendChild(linkElem)
        shadow.appendChild(raiz)
    }
}

customElements.define('menu-navegacao',MenuNavegação)