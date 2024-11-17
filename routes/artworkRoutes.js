const express = require('express');
const router = express.Router();
const { createArtwork, getAllArtworks, updateArtwork, getArtworkById, searchArtworks, deleteArtwork } = require('../controllers/artworkController');
const { isAuth } = require('../middlewares/authMiddleware');

// Add isAuth middleware here
router.post('/artworks/create', isAuth, createArtwork); 
router.get('/artworks/getSingle/:id', getArtworkById);
router.patch('/artworks/update/:id', isAuth, updateArtwork);   
router.get('/artworks/getAll', isAuth, getAllArtworks);
router.get('/artworks/search', isAuth, searchArtworks);
router.delete('/artworks/delete/:id', isAuth, deleteArtwork);


module.exports = router;
