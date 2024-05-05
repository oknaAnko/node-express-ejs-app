const express = require('express')
const router = express.Router()
const cors = require('cors');
const Recipe = require('../models/recipe');

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

// New recipe
router.post('/', cors(), async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    time: req.body.time,
    difficulty: req.body.difficulty,
    category: req.body.category,
    description: req.body.description
  })

  try {
    const newRecipe = await recipe.save()
    console.log(req.body)
    res.send('Success!')

  } catch (error) {
    console.log('err', error)
  }
})

module.exports = router