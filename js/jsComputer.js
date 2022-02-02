const game = {
    plays: "Yellow",
    moves: 0,
    cells: [],
    winner: false
};

let winY = 3;
let winR = 5;
let draw = 4;
let d = new Date();
let dm = d.getMinutes();
let ds = d.getSeconds();
let minutes;
let seconds;

game.cells[0] = [null, null, null, null, null, null, null];
game.cells[1] = [null, null, null, null, null, null, null];
game.cells[2] = [null, null, null, null, null, null, null];
game.cells[3] = [null, null, null, null, null, null, null];
game.cells[4] = [null, null, null, null, null, null, null];
game.cells[5] = [null, null, null, null, null, null, null];

function play(y) {
    let i = 0;
    this.TurnTime();
    for (; i < 6; i++) {
        if (game.cells[i][y] !== null) {
            break;
        }
    }

    if (i - 1 <= 0) {
        this.fullColumn(y);
    }
    this.updatePage(i - 1, y);
    this.hasPlayerWon(i - 1, y);
    this.getCurrentTime();
    if (game.winner === false)
        this.getPlayerTurn();
}

function TurnTime() {
    let nd = new Date();
    nm = nd.getMinutes();
    ns = nd.getSeconds();
    minutes = nm - dm;
    seconds = ns - ds;
    if (minutes > 0 && seconds < 0) {
        minutes = minutes - 1;
        seconds = 60 + seconds;
    }
}

function getCurrentTime() {
    d = new Date();
    dm = d.getMinutes();
    ds = d.getSeconds();
}

function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ['Player', 'Amount'],
        ['Yellow', winY],
        ['Red', winR],
        ['Draw', draw],

    ]);

    var options = {
        title: 'Score'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}

function updatePage(x, y) {
    game.cells[x][y] = game.plays;
    this.ChangeImg(x, y);
    game.moves++;
    document.getElementById('message').innerHTML += "Move " + game.moves + ". Player: " + game.plays + ".   Turn Time:" + minutes + " minutes " + seconds + " seconds <br>";

}

function ChangeImg(x, y) {
    if (game.plays == 'Yellow') {
        document.getElementById('p' + x + '_' + y).src = "resources/yellow_player.png";
    } else {
        document.getElementById('p' + x + '_' + y).src = "resources/red_player.png";
    }
}
function fullColumn(y) {
    document.getElementById('column' + y).disabled = true;
}

function disableButtons() {
    for (var j = 0; j < 7; j++) {
        document.getElementById('column' + j).disabled = true;
    }
}

function hasPlayerWon(x, y) {
    if (horizontalWin(x) == true || verticalWin(y) == true || diagonialWin() == true) {
        game.winner = true;
        if (game.plays === 'Red') {
            winR++;
        } else {
            winY++;
        }
        this.disableButtons();
    }
    else {
        this.isDraw();
    }
    this.setInfo();
}

function isDraw() {
    if (game.moves === 42) {
        document.getElementById('message').innerHTML += "Draw";
        draw++;
        this.disableButtons();
    }
}

function newGame() {
    game.plays = "Yellow";
    game.moves = 0;
    game.winner = false;
    game.cells[0] = [null, null, null, null, null, null, null];
    game.cells[1] = [null, null, null, null, null, null, null];
    game.cells[2] = [null, null, null, null, null, null, null];
    game.cells[3] = [null, null, null, null, null, null, null];
    game.cells[4] = [null, null, null, null, null, null, null];
    game.cells[5] = [null, null, null, null, null, null, null];
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            document.getElementById('p' + i + '_' + j).src = "resources/background.png";
            document.getElementById('p' + i + '_' + j).className = "img";
        }
    }
    document.getElementById('message').innerText = "Game Information: ";
    for (let j = 0; j < 7; j++) {
        document.getElementById('column' + j).disabled = false;
    }

}

function setInfo() {
    document.getElementById('infoBox').innerText = `Yellow wins: ${winY}  |  Red wins: ${winR}   |   Draws: ${draw}`;
}

function getPlayerTurn() {
    if (game.plays == 'Yellow'){
        game.plays = 'Red (Pc)';
        this.ComputerPlay();
    }else{
        game.plays = 'Yellow';
    }
}

function ComputerPlay(){
    var randomnumber = Math.floor(Math.random() * (7)) + 0;
    this.play(randomnumber);
}

function horizontalWin(x) {
    if (game.cells[x][0] == game.cells[x][1] && game.cells[x][1] == game.cells[x][2] && game.cells[x][2] == game.cells[x][3] && game.cells[x][3] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Horizontaly Player: " + game.plays + " with " + game.moves + " moves";
        for (let z = 0; z < 4; z++) {
            document.getElementById('p' + x + '_' + z).className = "blinking";
        }
        return true;
    }
    else if (game.cells[x][1] == game.cells[x][2] && game.cells[x][2] == game.cells[x][3] && game.cells[x][3] == game.cells[x][4] && game.cells[x][4] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Horizontaly Player: " + game.plays + " with " + game.moves + " moves";
        for (let z = 1; z < 5; z++) {
            document.getElementById('p' + x + '_' + z).className = "blinking";
        }
        return true;
    }
    else if (game.cells[x][2] == game.cells[x][3] && game.cells[x][3] == game.cells[x][4] && game.cells[x][4] == game.cells[x][5] && game.cells[x][5] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Horizontaly Player: " + game.plays + " with " + game.moves + " moves";
        for (let z = 2; z < 6; z++) {
            document.getElementById('p' + x + '_' + z).className = "blinking";
        }
        return true;
    }
    else if (game.cells[x][3] == game.cells[x][4] && game.cells[x][4] == game.cells[x][5] && game.cells[x][5] == game.cells[x][6] && game.cells[x][6] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Horizontaly Player: " + game.plays + " with " + game.moves + " moves";
        for (let z = 3; z < 7; z++) {
            document.getElementById('p' + x + '_' + z).className = "blinking";
        }
        return true;
    }

    return false;
}


function verticalWin(y) {
    if (game.cells[0][y] == game.cells[1][y] && game.cells[1][y] == game.cells[2][y] && game.cells[2][y] == game.cells[3][y] && game.cells[3][y] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Horizontaly Player: " + game.plays + " with " + game.moves + " moves";
        for (let z = 0; z < 4; z++) {
            document.getElementById('p' + z + '_' + y).className = "blinking";
        }
        return true;
    }
    else if (game.cells[1][y] == game.cells[2][y] && game.cells[2][y] == game.cells[3][y] && game.cells[3][y] == game.cells[4][y] && game.cells[4][y] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Horizontaly Player: " + game.plays + " with " + game.moves + " moves";
        for (let z = 1; z < 5; z++) {
            document.getElementById('p' + z + '_' + y).className = "blinking";
        }
        return true;
    }
    else if (game.cells[2][y] == game.cells[3][y] && game.cells[3][y] == game.cells[4][y] && game.cells[4][y] == game.cells[5][y] && game.cells[5][y] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Horizontaly Player: " + game.plays + " with " + game.moves + " moves";
        for (let z = 2; z < 6; z++) {
            document.getElementById('p' + z + '_' + y).className = "blinking";
        }
        return true;
    }
    return false;
}

function diagonialWin() {
    let i = 0;
    let j = 0;
    if (game.cells[0][0] == game.cells[1][1] && game.cells[1][1] == game.cells[2][2] && game.cells[2][2] == game.cells[3][3] && game.cells[3][3] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        while (i < 4 && j < 4) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i++;
            j++;
        }
        return true;
    }
    else if (game.cells[2][2] == game.cells[3][3] && game.cells[3][3] == game.cells[4][4] && game.cells[4][4] == game.cells[5][5] && game.cells[5][5] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 2;
        j = 2;
        while (i < 6 && j < 6) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i++;
            j++;
        }
        return true;
    }
    else if (game.cells[1][1] == game.cells[2][2] && game.cells[2][2] == game.cells[3][3] && game.cells[3][3] == game.cells[4][4] && game.cells[4][4] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 1;
        j = 1;
        while (i < 5 && j < 5) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i++;
            j++;
        }
        return true;
    }
    else if (game.cells[1][0] == game.cells[2][1] && game.cells[2][1] == game.cells[3][2] && game.cells[3][2] == game.cells[4][3] && game.cells[4][3] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 1;
        j = 0;
        while (i < 5 && j < 4) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i++;
            j++;
        }
        return true;
    }
    else if (game.cells[2][1] == game.cells[3][2] && game.cells[3][2] == game.cells[4][3] && game.cells[4][3] == game.cells[5][4] && game.cells[5][4] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 2;
        j = 1;
        while (i < 6 && j < 5) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i++;
            j++;
        }
        return true;
    }
    else if (game.cells[2][0] == game.cells[3][1] && game.cells[3][1] == game.cells[4][2] && game.cells[4][2] == game.cells[5][3] && game.cells[5][3] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 2;
        j = 0;
        while (i < 6 && j < 4) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i++;
            j++;
        }
        return true;
    }
    else if (game.cells[0][1] == game.cells[1][2] && game.cells[1][2] == game.cells[2][3] && game.cells[2][3] == game.cells[3][4] && game.cells[3][4] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 0;
        j = 1;
        while (i < 4 && j < 5) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i++;
            j++;
        }
        return true;
    }
    else if (game.cells[1][2] == game.cells[2][3] && game.cells[2][3] == game.cells[3][4] && game.cells[3][4] == game.cells[4][5] && game.cells[4][5] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 1;
        j = 2;
        while (i < 5 && j < 6) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i++;
            j++;
        }
        return true;
    }
    else if (game.cells[2][3] == game.cells[3][4] && game.cells[3][4] == game.cells[4][5] && game.cells[4][5] == game.cells[5][6] && game.cells[5][6] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 2;
        j = 3;
        while (i < 6 && j < 7) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i++;
            j++;
        }
        return true;
    }
    else if (game.cells[0][2] == game.cells[1][3] && game.cells[1][3] == game.cells[2][4] && game.cells[2][4] == game.cells[3][5] && game.cells[3][5] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 0;
        j = 2;
        while (i < 4 && j < 6) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i++;
            j++;
        }
        return true;
    }
    else if (game.cells[1][3] == game.cells[2][4] && game.cells[2][4] == game.cells[3][5] && game.cells[3][5] == game.cells[4][6] && game.cells[4][6] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 1;
        j = 3;
        while (i < 5 && j < 7) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i++;
            j++;
        }
        return true;
    }
    else if (game.cells[0][3] == game.cells[1][4] && game.cells[1][4] == game.cells[2][5] && game.cells[2][5] == game.cells[3][6] && game.cells[3][6] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 0;
        j = 3;
        while (i < 4 && j < 7) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i++;
            j++;
        }
        return true;
    }
    else if (game.cells[3][0] == game.cells[2][1] && game.cells[2][1] == game.cells[1][2] && game.cells[1][2] == game.cells[0][3] && game.cells[0][3] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 3;
        j = 0;
        while (i > -1 && j < 4) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i--;
            j++;
        }
        return true;
    }
    else if (game.cells[4][0] == game.cells[3][1] && game.cells[3][1] == game.cells[2][2] && game.cells[2][2] == game.cells[1][3] && game.cells[1][3] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 4;
        j = 0;
        while (i > 0 && j < 4) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i--;
            j++;
        }
        return true;
    }
    else if (game.cells[3][1] == game.cells[2][2] && game.cells[2][2] == game.cells[1][3] && game.cells[1][3] == game.cells[0][4] && game.cells[0][4] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 3;
        j = 1;
        while (i > -1 && j < 5) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i--;
            j++;
        }
        return true;
    }
    else if (game.cells[5][0] == game.cells[4][1] && game.cells[4][1] == game.cells[3][2] && game.cells[3][2] == game.cells[2][3] && game.cells[2][3] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 5;
        j = 0;
        while (i > 1 && j < 4) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i--;
            j++;
        }
        return true;
    }
    else if (game.cells[4][1] == game.cells[3][2] && game.cells[3][2] == game.cells[2][3] && game.cells[2][3] == game.cells[1][4] && game.cells[1][4] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 4;
        j = 1;
        while (i > 0 && j < 5) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i--;
            j++;
        }
        return true;
    }
    else if (game.cells[3][2] == game.cells[2][3] && game.cells[2][3] == game.cells[1][4] && game.cells[1][4] == game.cells[0][5] && game.cells[0][5] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 3;
        j = 2;
        while (i > -1 && j < 6) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i--;
            j++;
        }
        return true;
    }
    else if (game.cells[5][1] == game.cells[4][2] && game.cells[4][2] == game.cells[3][3] && game.cells[3][3] == game.cells[2][4] && game.cells[2][4] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 5;
        j = 1;
        while (i > 1 && j < 5) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i--;
            j++;
        }
        return true;
    }
    else if (game.cells[4][2] == game.cells[3][3] && game.cells[3][3] == game.cells[2][4] && game.cells[2][4] == game.cells[1][5] && game.cells[1][5] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 4;
        j = 2;
        while (i > 0 && j < 6) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i--;
            j++;
        }
        return true;
    }
    else if (game.cells[3][3] == game.cells[2][4] && game.cells[2][4] == game.cells[1][5] && game.cells[1][5] == game.cells[0][6] && game.cells[0][6] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 3;
        j = 3;
        while (i > -1 && j < 7) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i--;
            j++;
        }
        return true;
    }
    else if (game.cells[5][2] == game.cells[4][3] && game.cells[4][3] == game.cells[3][4] && game.cells[3][4] == game.cells[2][5] && game.cells[2][5] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 5;
        j = 2;
        while (i > 1 && j < 6) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i--;
            j++;
        }
        return true;
    }
    else if (game.cells[4][3] == game.cells[3][4] && game.cells[3][4] == game.cells[2][5] && game.cells[2][5] == game.cells[1][6] && game.cells[1][6] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 4;
        j = 3;
        while (i > 0 && j < 7) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i--;
            j++;
        }
        return true;
    }
    else if (game.cells[5][3] == game.cells[4][4] && game.cells[4][4] == game.cells[3][5] && game.cells[3][5] == game.cells[2][6] && game.cells[2][6] == game.plays) {
        document.getElementById('message').innerHTML += "Winner Diagonally Player: " + game.plays + " with " + game.moves + " moves";
        i = 5;
        j = 3;
        while (i > 1 && j < 7) {
            document.getElementById('p' + i + '_' + j).className = "blinking";
            i--;
            j++;
        }
        return true;
    }
    return false;
}


