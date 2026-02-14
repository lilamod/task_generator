const router = require("express").Router();
const authRoutes = require("./auth");
const taskRoutes = require("./task");

router.use('/auth', authRoutes);
router.use('/task', taskRoutes);

module.exports = router;