SNAKECELLS = new Array(100);
LADDERCELLS = new Array(100);
CURRENTPLAYER = 0;
MAXPLAYER = 2;
class PLAYER {
  #_playerName;
  #_autoPlayer;
  #_diceCount;
  #_score;
  #_totalScore;
  #_lastScore;
  #_image;

  constructor(name, autoplayer, image) {
    this.#_playerName = name;
    this.#_autoPlayer = autoplayer;
    this.#_image = image;
  }

  #_playSound(slw) {
    let src;
    if (slw == "S") {
      src = "../audio/snake.mp3";
    } else if (slw == "L") {
      src = "../audio/plane.mp3";
    } else {
      src = "../audio/applause.mp3";
    }
    let ele = document.createElement("audio");
    ele.type = "audio/mpeg";
    ele.src = src;
    ele.play();
  }

  #_checkScore() {
    let cell = this.#_totalScore - 1;
    if (SNAKECELLS[cell] !== undefined && SNAKECELLS[cell] !== null) {
      this.#_totalScore = SNAKECELLS[cell];
      this.#_playSound("S");
    }

    // for ladder
    if (LADDERCELLS[cell] !== undefined && LADDERCELLS[cell] !== null) {
      this.#_totalScore = LADDERCELLS[cell];
      this.#_playSound("L");
    }

    if (this.#_totalScore == 100) {
      this.#_playSound("W");
    }
  }
  // add the dice value
  addDice(value) {
    this.#_score = value;
    this.#_diceCount++;
    if (this.#_totalScore + value <= 100) {
      this.#_lastScore = this.#_totalScore;
      this.#_totalScore += value;
    }
    this.#_checkScore();
  }

  reset() {
    this.#_diceCount = 0;
    this.#_score = 0;
    this.#_totalScore = 0;
    this.#_lastScore = 0;
  }

  getName() {
    return this.#_playerName;
  }

  getAutoPlayer() {
    return this.#_autoPlayer;
  }

  getDiceCount() {
    return this.#_diceCount;
  }

  getScore() {
    return this.#_score;
  }

  getTotalScore() {
    return this.#_totalScore;
  }

  getLastScore() {
    return this.#_lastScore;
  }

  getImage() {
    return this.#_image;
  }
}

PLAYERS = new Array(MAXPLAYER);

// eof global
// Start Logic
window.onload = function () {
  initSnakeLAddrCell();
  initPLayer();
  resetGame();
};

function resetGame() {
  resetPlayers();
  paintGame();
  
  toggleButtons(true, false);
}

function paintGame() {
  paintTable();
  paintSnakeLadder();
  paintPlayerScore();
}

// once when uou load a page
function initSnakeLAddrCell() {
  SNAKECELLS[98] = 21;
  SNAKECELLS[96] = 72;
  SNAKECELLS[93] = 30;
  SNAKECELLS[78] = 62;
  SNAKECELLS[74] = 52;
  SNAKECELLS[69] = 44;
  SNAKECELLS[63] = 33;
  SNAKECELLS[49] = 29;
  SNAKECELLS[40] = 23;
  SNAKECELLS[18] = 6;

  LADDERCELLS[67] = 72;
  LADDERCELLS[54] = 69;
  LADDERCELLS[42] = 60;
  LADDERCELLS[24] = 76;
  LADDERCELLS[31] = 82;
  LADDERCELLS[12] = 22;
}

function paintTable() {
  var table = document.getElementById("gameTable");
  table.innerHTML = "";
  var count = 100;
  for (i = 0; i < 10; i++) {
    let row = document.createElement("tr");
    row.id = "row" + (i + 1);
    row.className = "tableRow";
    // add columne
    for (let c = 0; c < 10; c++) {
      let col = document.createElement("td");
      let colno = count;
      let clasname = "tableCol";
      //   chnaging the order of the count
      if (i % 2 != 0) {
        colno = count - 9 + c + c;
      }

      if (i % 2 == 0) {
        if (count % 2 == 0) {
          clasname = clasname + " colColor";
        }
      } else {
        if (count % 2 != 0) {
          clasname = clasname + " colColor";
        }
      }
      col.id = "col" + colno;
      col.className = clasname;
      let span = document.createElement("span");
      span.innerHTML = colno;
      col.appendChild(span);
      // adding col to row
      row.appendChild(col);
      count--;
    }
    //   adoing the row to table
    table.appendChild(row);
  }
}

function toggleButtons(resetflag, rollflag) {
  // reset flag
  let ele = document.getElementById("restBtn");
  if (ele != null) {
    ele.disabled = resetflag;
  }
  // roll flag
  ele = document.getElementById("rollBtn");
  if (ele != null) {
    ele.disabled = rollflag;
  }
}

function paintSnakeLadder() {
  for (let i = 0; i < 100; i++) {
    let no = i + 1;
    let cell = "col" + no;
    // snake cell
    if (SNAKECELLS[i] != undefined && SNAKECELLS[i] != null) {
      let ele = document.getElementById(cell);
      if (ele != null) {
        let img = document.createElement("img");
        img.src = "../images/snake.png";
        img.height = 35;
        let span = document.createElement("span");
        span.innerHTML = " ==> " + SNAKECELLS[i];
        ele.appendChild(img);
        ele.appendChild(span);
        ele.className = "redBG";
      }
    }
    // ladder

    if (LADDERCELLS[i] != undefined && LADDERCELLS[i] != null) {
      let ele = document.getElementById(cell);
      if (ele != null) {
        let img = document.createElement("img");
        img.src = "../images/ladder.png";
        img.height = 35;
        let span = document.createElement("span");
        span.innerHTML = " ==> " + LADDERCELLS[i];
        ele.appendChild(img);
        ele.appendChild(span);
        ele.className = "greenBG";
      }
    }
  }

  paintStartEnd();
}

function paintStartEnd() {
  // start
  let ele = document.getElementById("col1");
  if (ele != null) {
    let img = document.createElement("img");
    img.src = "../images/start.jpeg";
    img.height = 40;
    ele.appendChild(img);
  }

  // end
  ele = document.getElementById("col100");
  if (ele != null) {
    let img = document.createElement("img");
    img.src = "../images/cup.jpeg";
    img.height = 40;
    ele.appendChild(img);
  }
}

// player logic

function resetPlayers() {
  for (let i = 0; i < MAXPLAYER; i++) {
    PLAYERS[i].reset();
  }
}

function initPLayer() {
  for (let i = 0; i < MAXPLAYER; i++) {
    let image;
    let name;
    let autoplayer;
    switch (i) {
      case 0:
        name = "Tilak";
        autoplayer = false;
        image = "../images/tilak.jpg";
        break;
      case 1:
        name = "Robo";
        autoplayer = true;
        image = "../images/robo.jpeg";
        break;

      default:
        name = "Unknown";
        autoplayer = false;
        image = "../images/dice.jpeg";
    }
    // create obj from class
    PLAYERS[i] = new PLAYER(name, autoplayer, image);
    PLAYERS[i].reset();
  }
}

function paintPlayerScore() {
  for (let i = 0; i < MAXPLAYER; i++) {
    let player = PLAYERS[i];
    // dice
    let id = i + "Dice";
    let ele = document.getElementById(id);
    if (ele != null) {
      ele.value = player.getScore();
    }

    // count
    id = i + "Count";
    ele = document.getElementById(id);
    if (ele != null) {
      ele.value = player.getDiceCount();
    }
    //pscore
    id = i + "PScore";
    ele = document.getElementById(id);
    if (ele != null) {
      ele.value = player.getLastScore();
    }
    //
    id = i + "CScore";
    ele = document.getElementById(id);
    if (ele != null) {
      ele.value = player.getTotalScore();
    }
  }
  /// displya player name
  displayPLayerName();
  paintPlayer();
}

// display current player name
function displayPLayerName() {
  if (PLAYERS[CURRENTPLAYER] != undefined) {
    try {
      let ele = document.getElementById("playerName");
      if (ele != null) {
        ele.innerHTML = PLAYERS[CURRENTPLAYER].getName();
      }
    } catch (e) {
      alert(e);
    }
  }
}

function paintPlayer() {
  // clean the columns
  for (let i = 0; i < MAXPLAYER; i++) {
    let player = PLAYERS[i];
    // this temprory to test seting the image, u can un ci=omment to test
    //player.addDice(5);
    if (player != null) {
      let score = player.getTotalScore();
      if (score > 0) {
        let ele = document.getElementById("col" + score);
        if (ele != null) {
          ele.innerHTML = "";
        }
      }
    }
  }

  for (let i = 0; i < MAXPLAYER; i++) {
    let player = PLAYERS[i];

    if (player != null) {
      let name = player.getName();
      let score = player.getTotalScore();
      let image = player.getImage();
      let id = "col" + score;
      if (score > 0 && score <= 100) {
        let ele = document.getElementById(id);
        if (ele != null) {
          if (image != null) {
            // ******** this is fixed, used createelement instead of getelement
            let img = document.createElement("img");
            img.src = image;
            img.height = 60;
            ele.appendChild(img);
          } else {
            let span = document.createElement("span");
            span.innerHTML = name;
            ele.appendChild(span);
          }
        }
      }
    }
  }
}

//  Playing Game

function setPlayerScore(score) {
  let player = PLAYERS[CURRENTPLAYER];
  if (player != null) {
    player.addDice(score);
  }
  paintGame();
}

function nextPlayer() {
  // is the curent player is winner
  let player = PLAYERS[CURRENTPLAYER];
  if (player != null) {
    if (player.getTotalScore() == 100) {
      toggleButtons(false, true);
      return;
    }
  }
  CURRENTPLAYER++;
  if (CURRENTPLAYER >= MAXPLAYER) {
    CURRENTPLAYER = 0;
  }
  // is player auto
  player = PLAYERS[CURRENTPLAYER];
  if (player != null) {
    if (player.getAutoPlayer()) {
      rollDice();
    } else {
      toggleButtons(true, false);
    }
  }
}
function getRandom() {
  let val = Math.floor(Math.random() * 6) + 1;
  return val;
}
//begining of the game 
function rollDice() {
  toggleButtons(true, true);
  playGame();
}

function playGame() {
  let score = getRandom();
  setPlayerScore(score);
  setTimeout(function () {
    nextPlayer();
  }, 1000);
}
