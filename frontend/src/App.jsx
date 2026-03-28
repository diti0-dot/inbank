import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoanForm from "../src/loan"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoanForm/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
