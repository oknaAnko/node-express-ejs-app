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

// Show all recipes
router.get('/', cors(), async (req, res) => {
  try {
    const recipes = await Recipe.find({})
    res.json(recipes)

  } catch (error) {
    console.log('err', error)
  }
})

// Create new recipe
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
    res.status(200).json({
      success: true,
      redirectUrl: `/recipes/${newRecipe._id}`
      // redirect to: `http://localhost:3032/recipes/${newRecipe._id}`
    })

  } catch (error) {
    console.log('err', error)
  }
})

// Show single recipe
router.get('/:id', cors(), async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    res.json(recipe)

  } catch (error) {
    console.log('err', error)
  }
})

// Update recipe
router.put('/:id', cors(), async (req, res) => {
  let recipe;

  try {
    recipe = await Recipe.findById(req.params.id)
    recipe.title = req.body.title
    recipe.time = req.body.time
    recipe.difficulty = req.body.difficulty
    recipe.category = req.body.category
    recipe.description = req.body.description

    const updatedRecipe = await recipe.save()
    res.status(200).json({
      success: true,
      redirectUrl: `/recipes/${updatedRecipe._id}`
      // redirect to: `http://localhost:3032/recipes/${updatedRecipe._id}`
    })

  } catch (error) {
    console.log('err', error)
  }
})

module.exports = router
