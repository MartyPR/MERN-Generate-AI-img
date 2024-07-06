import { useState } from 'react'


import Images from './components/Images'
import Generateimg from './components/CreateIm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Generateimg/>
      <Images/>
    </>
  )
}

export default App
