import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Booking from './components/Booking'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className='bg-amber-500'>my application </h1>
      </div>
      <Booking />
    </>
  )
}

export default App
