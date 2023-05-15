
//Dependencies
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//Components
import { Index} from './pages/Index';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';

//Others
import { UserContextProvider } from './context/userContext';


const App = () => {
  return (
    <UserContextProvider>
      <div>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Index/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
              </Route>
            </Routes>
        </BrowserRouter>
      </div>
    </UserContextProvider>
  );
 }
 
export default App;
 
