console.log("hi")

var boardHTML = null
var columnsHTML = null
var turn = 1

var corchete = []

var board = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
]

var CheckWinners = function (turnrecived) {

    console.log("entra al check")
    console.log(board)
    console.log(board.length)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < 6; j++) {
            if (board[i][j] != null && board[i][j] != board[6][j]) {
                if (board[i][j] == board[i][j + 1] && board[i][j] == board[i][j + 2]
                    && board[i][j] == board[i][j + 3] || board[i][j] == board[i + 1][j]
                    && board[i][j] == board[i + 2][j] && board[i][j] == board[i + 3][j]
                    || board[i][j] == board[i + 1][j + 1] && board[i][j] == board[i + 2][j + 2]
                    && board[i][j] == board[i + 3][j + 3]) {
                    console.log('game ended')
                    var turn = turnrecived
                    if (turn == 'blue')
                        alert('game ended. winner: player 2')
                    else
                        alert('game ended. winner: player 1')
                }
            }
            // if (board[i][j] != null && board[i][j] == board[6][j]) {
            //console.log("entra al check 6 j")
            //if (board[i][j] == board[i][j + 1] && board[i][j] == board[i][j + 2]
            //  && board[i][j] == board[i][j + 3] || board[i][j] == board[i - 1][j]
            //  && board[i][j] == board[i - 2][j] && board[i][j] == board[i - 3][j]
            //  || board[i][j] == board[i - 1][j + 1] && board[i][j] == board[i - 2][j + 2]
            //  && board[i][j] == board[i - 3][j + 3]) {
            //  console.log("game ended in pos i = 6, j = j")
            // }
            // }
        }
    }
}


//check las diagonales inversas:
// board[i][j] == board[i - 1][j + 1] && board[i][j] == board[i - 2][j + 2] && board[i][j] == board[i - 3][j + 3]


//arreglar lo de la ultima columna posicion i= 6 j=0, 1, 2, ...



var ChangeTurn = function () {
    turn = (turn === 'blue') ? 'red' : 'blue'
    CheckWinners(turn)
}

var columnEventHandler = function (evt) {
    var columnId = evt.target.id.substr(1, 1)
    for (var i = 0; i < board[columnId].length; i++) {
        if (!board[columnId][i]) {
            board[columnId][i] = turn
            ChangeTurn()
            render()
            break
        }
    }
}

var bindColumnHandlers = function () {
    columnsHTML = document.getElementsByClassName('column')
    for (var i = 0; i < columnsHTML.length; i++) {
        columnsHTML[i].onclick = columnEventHandler
    }
}

var render = function () {
    var html = ''
    for (var i = 0; i < board.length; i++) {
        html += '<div id="c' + i + '" class="column">'

        for (var j = board[i].length - 1; j >= 0; j--) {
            html += '<div id="s' + i + j + '" class="spot'
            if (board[i][j]) html += ' ' + board[i][j]
            html += '"></div>'
        }
        html += '</div>'
    }
    boardHTML.innerHTML = html
    bindColumnHandlers()
}


var init = function () {
    boardHTML = document.getElementById('board')
    turn = Math.random() > 0.5 ? 'blue' : 'red'
    render()
}

window.onload = init
