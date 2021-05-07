const app = document.getElementById('app')

const conteudo = document.getElementsByClassName('conteudo')[0]
console.log(conteudo.innerHTML)

const btnHome = document.querySelector('#btnHome')
btnHome.classList.add('menuPrincipal__botao--selecionado')
btnHome.onmouseleave = () => console.log('saiu')//menuPrincSelecionar(btnHome)
btnHome.onmouseenter = () => console.log('entrou')

console.log(btnHome)


const popupProjetoTemp = `
<div class="popup" id="popupProjeto">
<div class="popup__janela">
<div class="formulario" id="formProjeto">
<legend>Criar Novo Projeto</legend>
<hr>
<label for="idProjeto">Código do projeto: </label>
<input type="text" name="idProjeto" id="idProjeto"class="formulario__textInput" placeholder="Código/id. do projeto"autofocus maxlength="20">
<br>
<label for="nomeProjeto">Nomo do projeto: </label>
<input type="text" name="nomeProjeto" id="nomeProjeto"class="formulario__textInput" placeholder="Digite o nome doprojeto">
<br>
<label for="descricaoProjeto">Descrição do projeto: </label>
<textarea name="descricaoProjeto" id="descricaoProjeto" class="formulario__textInput" placeholder="Digite uma breve descrição..." cols="30" rows="3" maxlength="90"></textarea>
<br>
<button type="submit" name="idProjeto" id="idProjeto" class="card__btn" onclick="removePopup('popupProjeto')">Criar projeto</button>
</div>
</div>
`

//Componente popup


function abrePopup(props){
    console.log(props)
    app.innerHTML += props
}
function removePopup(props){
    const popup = document.getElementById(props)
    while(popup.firstChild){
        popup.removeChild(popup.firstChild)
    }
    console.log(popup.parentNode)
    popup.parentNode.removeChild(popup)
}