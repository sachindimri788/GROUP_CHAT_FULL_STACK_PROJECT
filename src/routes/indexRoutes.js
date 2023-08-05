const express = require('express');
const router = express.Router();
const path = require("path");

const userRoutes = require('./userRoutes');
const groupRoutes=require('./groupRoutes');


router.use('/user', userRoutes);
router.use('/group',groupRoutes);

router.use('/', (req, res) => {
        res.sendFile(path.join(__dirname, `../views/${req.url}`))
})

module.exports = router;
