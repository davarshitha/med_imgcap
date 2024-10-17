
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/login'
import Home from './components/Home'
import Otp from './components/otp'
import DLPage from './components/DLpage'
import LLMPage1 from './components/LLMpageM1'


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/otp' element={<Otp/>}></Route>
        <Route path='/dl' element={<DLPage/>}></Route>
        <Route path='/llm-predict/method1' element={<LLMPage1/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
