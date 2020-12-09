/*
 Script Java
 Site:
 Author: Rafael Passos Guimarães
 e-mail: rapassos@gmail.com
 Create: 12-02-2020
 */

var nivel;
var nivelId;
var palavras;
var palavra;

var letras;
var acertos;
var erros;


//Define o nível do jogo e popula as variáveis (nivel, nivelId, palavras e palavra)
function setNivel(n) {
    //console.log(n);
    //Preenche as variáveis nivel 
    switch (n) {
        case "facil":
            nivel = "Fácil";
            nivelId = 0;
            break;
        case "medio":
            nivel = "Médio";
            nivelId = 1;
            break;
        default:
            nivel = "Difícil";
            nivelId = 2;
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
}

function novoJogo(){
    
    
}