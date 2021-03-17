
var boardHTML = null
var columnsHTML = null
var turn = 1

var name1 = null
var nameError = null
var lastname = null
var lastnameError = null
var email = null
var emailError = null
var comments = null
var commentsError = null
var sendBtn = null

var cronos1 = null
var time1 = null

var cronos2 = null
var time2 = null

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

//   TIMER 1

function initialize1() {
    cronos1 = setInterval(function () { timer1() }, 1000);
}

function timer1() {
    time1 = parseInt(document.getElementById('counter1').value);
    document.getElementById('counter1').value = eval(time1 + 1);
}

function reset1() {
    time1 = parseInt(document.getElementById('counter1').value);
    document.getElementById('counter1').value = "0";
}

function stop1() {
    clearInterval(cronos1);
}

//   TIMER 2

function initialize2() {
    cronos2 = setInterval(function () { timer2() }, 1000);
}

function timer2() {
    time2 = parseInt(document.getElementById('counter2').value);
    document.getElementById('counter2').value = eval(time2 + 1);
}

function reset2() {
    time2 = parseInt(document.getElementById('counter2').value);
    document.getElementById('counter2').value = "0";
}

function stop2() {
    clearInterval(cronos2);
}



var sendForm = function (evt) {
    evt.preventDefault()
    if (name1.value.length < 3) {
        nameError.innerHTML = 'El nombre debe tener al menos 3 caracteres'
        console.log(name1.value)
    } else {
        nameError.innerHTML = ''
        console.log(name1.value)
    }

    if (lastname.value.length < 3) {
        lastnameError.innerHTML = 'El apellido debe tener al menos 3 caracteres'
        console.log(lastname.value)
    } else {
        lastnameError.innerHTML = ''
        console.log(lastname.value)
    }

    if (validateEmail(email.value) == false) {
        emailError.innerHTML = 'Email inválido'
        console.log(email.value)
    } else {
        emailError.innerHTML = ''
        console.log(email.value)
    }

    if (comments.value.length < 3) {
        commentsError.innerHTML = 'Ingrese comentario'
        console.log(comments.value)
    } else {
        commentsError.innerHTML = ''
        console.log(comments.value)
    }

    window.open("http://www.outlook.com", "email", "width=300,height=300,scrollbars=NO")

    return false

}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


var CheckWinners = function (turnrecived) {

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
                    if (turn == 'blue') {
                        stop1()
                        stop2()
                        alert('player 2 wins')
                    } else {
                        stop1()
                        stop2()
                        alert('player 1 wins')
                    }
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
    if (turn == 'blue') {
        initialize1()
        stop2()
    }
    else {
        initialize2()
        stop1()
    }
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

    name1 = document.getElementById('name')

    lastname = document.getElementById('lastname')

    email = document.getElementById('email')

    comments = document.getElementById('comments')

    sendBtn = document.getElementById('send')
    sendBtn.onclick = sendForm

    nameError = document.getElementById('nameError')

    lastnameError = document.getElementById('lastnameError')

    emailError = document.getElementById('emailError')

    commentsError = document.getElementById('commentsError')
}

window.onload = init
