const express = require('express')
const router = express.Router()
const cors = require('cors');
const recipe = require('../models/recipe');

// const recipes = [
//   {
//     title: 'Cupcakes',
//     time: '20 min',
//     difficulty: 'easy',
//     category: 'sweets',
//     description: 'lorem ipsum...'
//   }
// ]

// All recipes
router.get('/', cors(), async (req, res) => {
  try {
    const recipes = await Recipe.find({})
    res.json(recipes)

  } catch (error) {
    console.log('err', error)
  }
})



module.exports = router