const express = require('express');
const app = express();

const { v4: uuid } = require('uuid');

const fs = require('fs');
const path = require('path');

const init = async () => {
    const dbExists = fs.existsSync(path.join(__dirname, 'db', 'db.json'));
    if (!dbExists) {
        fs.mkdirSync(path.join(__dirname, 'db'));
        fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), '[]');
    }

    const db = require('./db/db.json')

    db.forEach(game => {
        if (game.dayOfCreation) {
            if (game.dayOfCreation < new Date().getDate()) {
                db.splice(db.indexOf(game), 1);

                fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(db));
            }
        }
    })
}
init();

const TicTacToe = require('./TicTacToe')

app.get('/new', (req, res) => {
    let db = require('./db/db.json');

    const gameId = db.length;

    const game = new TicTacToe();

    const board = game.getBoard();
    const gamePassword = uuid();

    db.push({
        id: gameId,
        gamePassword: gamePassword,
        board: board,
        player: 'X',
        winner: null,
        dayOfCreation: new Date().getDate()
    });

    fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(db));

    console.log('🎲 Novo jogo iniciado! ' + gameId);

    res.json({
        gameId: gameId,
        gamePassword: gamePassword,
        board: board,
        player: 'X',
        winner: null,
        dayOfCreation: new Date().getDate(),
    })

});

app.get('/play/:gameId/:gamePassword/:row/:col', (req, res) => {
    const { gameId, gamePassword, row, col } = req.params;

    try {

        let db = require('./db/db.json');

        if (db[gameId].gamePassword !== gamePassword) {
            return res.json({
                error: 'Senha incorreta!'
            })
        }

        const game = new TicTacToe();

        const gameData = db[gameId];

        game.setBoard(gameData.board);
        game.setCurrentPlayer(gameData.player);

        game.play(row, col);

        const board = game.getBoard();
        const player = game.getCurrentPlayer();
        const winner = game.verifyVictory();

        db[gameId] = {
            id: gameId,
            gamePassword: gamePassword,
            board: board,
            player: player,
            winner: winner,
        };

        fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(db));

        res.json({
            gameId: gameId,
            board: board,
            player: player,
            winner: winner,
        })
    } catch (err) {
        res.json({
            error: 'Jogo não encontrado!'
        })
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});



