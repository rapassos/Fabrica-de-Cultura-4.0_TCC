/*
 Script Java
 Site:
 Author: Rafael Passos Guimarães
 e-mail: rapassos@gmail.com
 Create: 12-02-2020
 */

$(document).ready(function () {
    var nivelId;
    var limite;
    var palavra;
    var palavraSombra;

    var historico;
    var letras;
    var acertos;
    var erros;

    function novoJogo() {
        function showSombra() {
            var palavraSombraEspacada = "";
            for (var i = 0; i < palavraSombra.length; i++) {
                palavraSombraEspacada += palavraSombra[i] + " ";
            }
            $("#palavraSombra").empty().html(palavraSombraEspacada);
        }

        function initVars() {
            historico = "";
            letras = 0;
            acertos = 0;
            erros = 0;
            palavraSombra = "";
            for (var i = 0; i < palavra.length; i++) {
                palavraSombra += "_";
            }
        }

        function updateDisplay() {
            showSombra();
        }

        $("#niveis").css('display', 'none');
        $("#playGame").css('display', 'block');
        initVars();
        updateDisplay();
    }


    //Função para determinar a palavra e o níveis de dificuldade do jogo
    $(".btnNivel").click(function () {
        limite = $("#limite option:selected").attr("value");
        //Seleciona randomicamente um indice no array de palavras
        rand = Math.floor(Math.random() * (palavras[$(this).attr("value")].length));
        palavra = palavras[$(this).attr("value")][rand];
        //console.log(palavra);

        novoJogo();
    });


});




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
    if (ac > 0) {
        acertos++;
    } else {
        erros++;
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

    verificaResultados();
}

//Inicializa o jogo
function startGame() {
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
                    updateGame();
                }
            }
        })
    })
}