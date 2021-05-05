const conteudo = document.getElementsByClassName('conteudo')[0]
console.log(conteudo.innerHTML)

const btnHome = document.querySelector('#btnHome')
btnHome.classList.add('menuPrincipal__botao--selecionado')
btnHome.onmouseleave = () => console.log('saiu')//menuPrincSelecionar(btnHome)
btnHome.onmouseenter = () => console.log('entrou')

console.log(btnHome)