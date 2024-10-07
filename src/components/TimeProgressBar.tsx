import React, { useState, useEffect } from 'react'

const TimeProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date()
      const totalMinutes = now.getHours() * 60 + now.getMinutes()
      const percentage = (totalMinutes / 1440) * 100
      setProgress(percentage)
    }

    updateProgress()
    const timer = setInterval(updateProgress, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

export default TimeProgressBar