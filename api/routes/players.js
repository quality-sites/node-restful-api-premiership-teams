const express = require('express');
const router = express.Router();

// Handle incoming GET requests to /players
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Players were fetched'
    });
});

router.post('/', (req, res, next) => {
    const player = {
        teamId: req.body.teamId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Player was created',
        player: player
    });
});

router.get('/:playerId', (req, res, next) => {
    res.status(200).json({
        message: 'Player details',
        playerId: req.params.playerId
    });
});

router.delete('/:playerId', (req, res, next) => {
    res.status(200).json({
        message: 'Player deleted',
        playerId: req.params.playerId
    });
});

module.exports = router;