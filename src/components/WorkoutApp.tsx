import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface Exercise {
  id: number
  name: string
  sets: number
  reps: number
}

const WorkoutApp: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [newExercise, setNewExercise] = useState('')
  const [newSets, setNewSets] = useState('')
  const [newReps, setNewReps] = useState('')

  const addExercise = () => {
    if (newExercise.trim() !== '' && newSets !== '' && newReps !== '') {
      setExercises([
        ...exercises,
        {
          id: Date.now(),
          name: newExercise,
          sets: parseInt(newSets),
          reps: parseInt(newReps),
        },
      ])
      setNewExercise('')
      setNewSets('')
      setNewReps('')
    }
  }

  const removeExercise = (id: number) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Workout Planner</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newExercise}
          onChange={(e) => setNewExercise(e.target.value)}
          placeholder="Exercise name"
          className="flex-grow mr-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="number"
          value={newSets}
          onChange={(e) => setNewSets(e.target.value)}
          placeholder="Sets"
          className="w-20 mr-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="number"
          value={newReps}
          onChange={(e) => setNewReps(e.target.value)}
          placeholder="Reps"
          className="w-20 mr-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <button
          onClick={addExercise}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
      <ul>
        {exercises.map((exercise) => (
          <li
            key={exercise.id}
            className="flex items-center justify-between py-2 border-b dark:border-gray-700"
          >
            <span>
              {exercise.name} - {exercise.sets} sets x {exercise.reps} reps
            </span>
            <button
              onClick={() => removeExercise(exercise.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WorkoutApp