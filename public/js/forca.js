/*
 Script Java
 Site:
 Author: Rafael Passos Guimarães
 e-mail: rapassos@gmail.com
 Create: 12-02-2020
 */

let secretWord;
let secretShadow;
let history = "";
let hits = 0;
let errors = 0;
let limit = 0;

$(document).ready(() => {
  $("#btnStart").click(() => {
    newGame(getLimit(), getSecret());
    //console.log("Limite: " + getLimit());
    //console.log("Segredo: " + secretWord);
    //console.log("Sombra segredo: " + secretShadow);
  });
});

//Set o nível de dificuldade do jogo
function getLimit() {
  return $("#limite option:selected").attr("value");
}

//Seleciona randomicamente um indice no array de palavras
function getSecret() {
  secretWord = palavras[Math.floor(Math.random() * palavras.length)];
  secretShadow = "";
  for (let i = 0; i < secretWord.length; i++) {
    secretShadow += "_";
  }
  return secretWord;
}

function resetVars() {
  history = "";
  hits = 0;
  errors = 0;
}

function showShadow() {
  let underlineSpaceShadowWord = "";
  for (let i = 0; i < secretShadow.length; i++) {
    underlineSpaceShadowWord += secretShadow[i] + " ";
  }
  $("#shadowWord").empty().html(underlineSpaceShadowWord);
}

function resetGame() {
  window.location.reload();
}

function updateHistory(kick) {
  if (history.search(kick) == -1) {
    history += kick + " ";
  }
}

function updateDashboard(kick) {
  updateShadow(kick);
  updateHistory(kick);

  //Placar
  $("#placarLetras")
    .empty()
    .html(history.length / 2);
  $("#placarAcertos").empty().html(hits);
  $("#placarErros").empty().html(errors);

  //Histórico de letras
  $("#historico").empty().html(history);
}

function updateShadow(kick) {
  let valid = true;
  if (history.search(kick) == -1) {
    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i].toLowerCase() === kick) {
        secretShadow =
          secretShadow.substr(0, i) +
          secretWord[i] +
          secretShadow.substr(i + 1);
        hits++;
        valid = false;
      }
    }
    if (valid) {
      errors++;
    }
  }
  showShadow();
}

function validate(kick) {
  updateDashboard(kick);
  if (getLimit() > errors) {
    if (secretShadow === secretWord) {
      alert(
        "Você venceu!\n" +
          "Acertou a palavra: " +
          secretWord +
          "\n" +
          "com " +
          history.length / 2 +
          " letras"
      );
      resetGame();
    }
  } else {
    alert("Você foi enforcado!");
    resetGame();
  }
}

function newGame(limit, secretWord) {
  $("#niveis").css("display", "none");
  $("#playGame").css("display", "block");
  showShadow();
  resetVars();
  $(document).ready(function () {
    $(document).on("keypress", function (e) {
      if (e.keyCode == 33) {
        resetGame();
      }
      if (
        (e.keyCode > 64 && e.keyCode < 91) ||
        (e.keyCode > 96 && e.keyCode < 123)
      ) {
        validate(String.fromCharCode(e.keyCode).toLowerCase());
      }
    });
  });
}
