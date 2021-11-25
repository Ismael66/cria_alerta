function criaCss(objeto) {
    const style = document.createElement('style');
    style.innerHTML = `
    .containerReset{
        display: flex;
        position: fixed;
        flex-direction: column;
        align-items: center;
        width:${objeto["largura"]}px;
        height:${objeto["altura"]}px;
        background-color: rgba(255, 255, 255, 0.74);
        border-radius: 15px;
        border: 1px solid black;
        box-shadow: rgb(0, 0, 0) 0px 20px 30px -10px; 
        top: calc(50% - (${objeto["altura"]}px / 2));
        left: calc(50% - (${objeto["largura"]}px / 2));
        z-index: 2;
    }
    .containerReset p{
        text-align: center;
        padding-top: 20px;
    }
    // .containerAlert{
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     width: 100%;
    //     height: 100%;
    //     background-color: blue;
    // }
    .botao {
        display: inline-block;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        background-color: transparent;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        border-radius: 0.25rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
    .botao-vermelho {
        color: #fff;
        background-color: #dc3545;
        border-color: #dc3545;
    }
    .botao-vermelho:hover {
        color: #fff;
        background-color: #bb2d3b;
        border-color: #b02a37;
    }
    .hidden{
        visibility: hidden;
    }`
    document.body.insertAdjacentElement("afterbegin", style);
}
function criaHtml(objeto) {
    const divContainer = document.createElement("div");
    divContainer.setAttribute("class", "containerAlert");
    divContainer.innerHTML = `
    <div class="containerReset hidden">
        <p></p>
        <input type="button" class="botao botao-vermelho" id="btnReset" value="${objeto["valueBtn"]}">
    </div>`;
    document.body.appendChild(divContainer);
}
export function alerta(objeto = new Object) {
    objeto.titulo = typeof objeto.titulo !== "undefined" ? objeto.titulo : "Alerta";
    objeto.mensagem = typeof objeto.mensagem !== "undefined" ? objeto.mensagem : "Erro";
    objeto.valueBtn = typeof objeto.valueBtn !== "undefined" ? objeto.valueBtn : "Ok";
    objeto.largura = typeof objeto.largura !== "undefined" ? objeto.largura : 300;
    objeto.altura = typeof objeto.altura !== "undefined" ? objeto.altura : 150;
    objeto.funcao = typeof objeto.funcao === "function" ? objeto.funcao : () => { };
    criaHtml(objeto);
    criaCss(objeto);
    exibeAlerta(objeto);
}
const exibeAlerta = function (objeto) {
    const container = document.querySelector(".containerReset");
    if (container.classList.contains("hidden")) {
        container.classList.remove("hidden");
    }
    container.children[0].innerHTML = objeto["mensagem"];
    const btnReset = document.getElementById("btnReset");
    btnReset.value = objeto.valueBtn;
    btnReset.onclick = () => {
        objeto.funcao();
        if (!container.classList.contains("hidden")) {
            container.classList.add("hidden");
        }
    }
}
