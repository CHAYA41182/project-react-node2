const PhotoController = require('../controlers/PhotoControler');

const router = require('express').Router();

router.get('/', PhotoController.getPhotos);
router.get('/:id', PhotoController.getPhoto);
router.post('/', PhotoController.createPhoto);
router.put('/:id', PhotoController.updatePhoto);
router.delete('/:id', PhotoController.deletePhoto);

module.exports = router;