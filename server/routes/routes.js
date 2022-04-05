const express = require('express');
const router = express.Router();
const API = require('../controller/api')



router.get('/', API.fetchAllPost);
router.get('/sort/:id', API.fetchBySort);
router.get('/:id', API.fetchPostById);
router.post('/', API.createPost);
router.patch('/:id', API.updatePost);
router.delete('/:id', API.deletePost);

module.exports = router