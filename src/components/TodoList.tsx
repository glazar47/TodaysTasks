import React, { useState, KeyboardEvent, useEffect } from 'react'
import { X, RefreshCw } from 'lucide-react'
import TimeProgressBar from './TimeProgressBar'

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    updateDate()
  }, [])

  const updateDate = () => {
    const today = new Date()
    const formattedDate = today.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
    setCurrentDate(formattedDate)
  }

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo,
          completed: false,
        },
      ])
      setNewTodo('')
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const refreshList = () => {
    setTodos([])
    updateDate()
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">
          Today's Tasks - {currentDate}
        </h2>
        <button
          onClick={refreshList}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <RefreshCw className="w-5 h-5 text-white" />
        </button>
      </div>
      <TimeProgressBar />
      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task (press Enter to add)"
          className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        />
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between py-2 border-b border-gray-700"
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-200'
              } cursor-pointer`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList