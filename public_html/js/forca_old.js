/*
 Script Java
 Site:
 Author: Rafael Passos Guimarães
 e-mail: rapassos@gmail.com
 Create: 12-02-2020
 */

var nivel;
var nivelId;
var limite;

var palavras;
var palavra;
var palavraSombra;

var historico;
var letras;
var acertos;
var erros;

function resetVariaveis() {
    nivel = "";
    nivelId = 0;
    limite = 0;

    //palavras = "";
    //palavra = "";
    //palavraSombra = "";

    historico = "";
    letras = 0;
    acertos = 0;
    erros = 0;
}

//Define o nível do jogo e chama a função startGame()
function setNivel(n) {
    //console.log(n);
    //Preenche as variáveis nivel 
    switch (n) {
        case "facil":
            nivel = "Fácil";
            nivelId = 0;
            limite = 10;
            break;
        case "medio":
            nivel = "Médio";
            nivelId = 1;
            limite = 7;
            break;
        default:
            nivel = "Difícil";
            nivelId = 2;
            limite = 4;
            break;
    }
    //console.log(nivel);
    //console.log(nivelId);

    //Atribui o Array de palavras do nível selecionado a variável palavras
    palavras = niveis[nivelId];
    //console.log(nivel);


    //Seleciona randomicamente um indice no array de palavras
    rand = Math.floor(Math.random() * (palavras.length));
    //console.log(rand);

    //Atribui a palavra selecionada a variável palavra
    palavra = palavras[rand];
    //console.log(palavra);

    startGame();
}

function initSombra() {
    palavraSombra = "";
    for (var i = 0; i < palavra.length; i++) {
        palavraSombra += "_";
        //console.log(palavra[i]+" - "+palavraSombra[i]);
    }
}

function showSombra() {
    var palavraSombraEspacada = "";
    for (var i = 0; i < palavraSombra.length; i++) {
        palavraSombraEspacada += palavraSombra[i] + " ";
    }
    $("#palavraSombra").empty().html(palavraSombraEspacada);
}

function updateSombra(letra) {
    var ac = 0;
    for (var i = 0; i < palavra.length; i++) {
        if (palavra[i].toLowerCase() === letra.toLowerCase()) {
            if (i == 0) {
                palavraSombra = palavra[i] + palavraSombra.substr(i + 1);
            } else if (i != palavra.length) {
                palavraSombra = palavraSombra.substr(0, i) + palavra[i] + palavraSombra.substr(i + 1);
            } else {
                //console.log(palavraSombra.substr(0,i)+palavra[i]+palavraSombra.substr(i+1));
                palavraSombra = palavraSombra.substr(0, i) + palavra[i];
            }
            ac++;
        }
        //console.log(palavra + " - " + palavraSombra);
    }
    if (letras.length > 0) {
        if (ac > 0) {
            acertos++;
        } else {
            erros++;
        }
    }
}

function verificaResultados() {
    var restart = 0;
    if (erros > limite) {
        alert("Você foi enforcado!!!\nA palavra correta era: " + palavra);
        restart++;
    }
    if (palavra === palavraSombra) {
        alert("Parabéns!!!\nVocê venceu com " + letras + " letras");
        restart++;
    }
    if (restart > 0) {
        $("#niveis").css('display', 'block');
        $("#playGame").css('display', 'none');
        resetVariaveis();
        updateGame();
    }
}


function updateGame() {
    updateSombra(letra);
    showSombra();

    //Placar
    $("#placarLetras").empty().html(letras);
    $("#placarAcertos").empty().html(acertos);
    $("#placarErros").empty().html(erros);

    //Histórico de letras
    $("#historico").empty().html(historico);
}

//Inicializa o jogo
function startGame() {
    $("#niveis").css('display', 'none');
    $("#playGame").css('display', 'block');
    resetVariaveis();
    initSombra();
    //console.log(palavraSombra);
    showSombra();
    $(document).ready(function () {
        $(document).keypress(function (e) {
            if (((e.keyCode > 64) && (e.keyCode < 91)) || ((e.keyCode > 96) && (e.keyCode < 123))) {
                letra = String.fromCharCode(e.keyCode).toLowerCase();
                //console.log(letra);
                if (historico.search(letra) == -1) {
                    historico += letra + " ";
                    letras++;
                }
                updateGame();
                verificaResultados();
            }
        })
    })
}