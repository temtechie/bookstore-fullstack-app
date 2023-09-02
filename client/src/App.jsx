import { useState } from 'react'
import { Route, Router, BrowserRouter, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SingleBook from './pages/SingleBook'
import CreateBook from './pages/CreateBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={ <Home /> }/>
      <Route path='/books/details/:id' element={ <SingleBook />  }/>
      <Route path='/books/create/' element={ <CreateBook />  }/>
      <Route path='/books/edit/:id' element={ <EditBook />  }/>
      <Route path='/books/delete/:id' element={ <DeleteBook />  }/>
    </Routes>
  )
}

export default App
