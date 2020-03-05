const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Ali Najian MidTerm');
});

module.exports = router;