const express = require('express');
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout, deleteWorkouts } = require('../controllers/workoutController');
const Workout = require('../models/workoutModel')

const router = express.Router();

// Tausif comment 
// get all workouts
router.get('/', getWorkouts)

// get single workout
router.get('/:id',getWorkout)

// post a workout
router.post('/', createWorkout)

// delete single workout
router.delete('/:id', deleteWorkout)

//delete multiple workout
router.delete('/',deleteWorkouts)

// update a workout
router.put('/:id', updateWorkout)

module.exports = router