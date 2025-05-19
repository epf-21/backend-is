const Router = require("express");
const { searchController } = require("../controllers/search");

const searchRouter = Router()

searchRouter.post('/', searchController.createSearch)
searchRouter.get('/:id', searchController.getSearchByUserId)
searchRouter.delete('/:id', searchController.deleteSearchById)

searchRouter.post('/save', searchController.saveSearch);

searchRouter.get('/id/:userId', searchController.getUserSearchesD);

searchRouter.delete('/delete/:id', searchController.deleteSearchByIdD);

searchRouter.get('/all', searchController.getAllSearchesD);

module.exports = { searchRouter }
