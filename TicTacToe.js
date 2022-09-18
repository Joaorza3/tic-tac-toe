module.exports = class TicTacToe {
    constructor(currentPlayer = 'X') {
        this.currentPlayer = currentPlayer
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]
        this.winner = null
    }

    changePlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        return this.currentPlayer;
    }

    play(row, column) {
        const isFilled = this.board[row][column]

        if (isFilled) {
            console.log('A casa já está preenchida!')
        return false
        }


        this.board[row][column] = this.currentPlayer
        this.changePlayer()

        return true
    }

    horizontalVictory() {
        for (let i = 0; i < this.board.length; i++) {
            const row = this.board[i]

            if (row[0] === '') continue;

            if (row[0] === row[1] && row[1] === row[2]) {
                console.log(`🏆 O jogador ${row[0]} venceu!`)
                this.winner = row[0]
            }
        }
    }

    verticalVictory() {
        for (let i = 0; i < this.board.length; i++) {
            const col = this.board[0][i]

            if (col === '') continue;

            if (col === this.board[1][i] && col === this.board[2][i]) {
                console.log(`🏆 O jogador ${col} venceu!`)
                this.winner = col
            }
        }
    }

    diagonallVictory() {
        const middleCol = this.board[1][1]

        if (middleCol === '') return false;

        if (middleCol === this.board[0][0] && middleCol === this.board[2][2]) {
            console.log(`🏆 O jogador ${middleCol} venceu!`)
            this.winner = middleCol
        } else if (middleCol === this.board[0][2] && middleCol === this.board[2][0]) {
            console.log(`🏆 O jogador ${middleCol} venceu!`)
            this.winner = middleCol
        }

    }

    verifyVictory() {

        this.horizontalVictory()
        this.verticalVictory()
        this.diagonallVictory()

        return this.winner
    }

    getBoard() {
        return this.board
    }

    setBoard(board) {
        this.board = board
    }

    setCurrentPlayer(currentPlayer) {
        this.currentPlayer = currentPlayer
    }

    getCurrentPlayer() {
        return this.currentPlayer
    }

    renderBoard() {
        console.clear()
        console.table(this.board)
        this.verifyVictory()
    }
}
