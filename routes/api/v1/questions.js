const express = require('express');
const router = express.Router();

const questionsApi = require('../../../controllers/api/v1/questions_api');


router.post('/create', questionsApi.createQuestion);
router.post('/:id/options/create', questionsApi.createOption);
router.delete('/:id/delete', questionsApi.deleteQuestion);
router.get('/:id', questionsApi.viewQuestion);


module.exports = router;