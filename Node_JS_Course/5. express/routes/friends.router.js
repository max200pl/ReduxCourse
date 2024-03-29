const express = require('express');
const friendsController = require("../controllers/friends.controller");

const friendsRouter = express.Router();

friendsRouter.use((req, res, next) => {
    console.log(`ip address: ${req.ip}`);
    next();
});
friendsRouter.post('/', friendsController.postFiend)
friendsRouter.get('/', friendsController.getFiends)
friendsRouter.get('/:friendId', friendsController.getFriend);

module.exports = friendsRouter;