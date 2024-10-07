import React from 'react'
import TodoList from './components/TodoList'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md">
        <TodoList />
      </div>
    </div>
  )
}

export default App