//Dependencies
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//Components
import { Index} from './pages/Index';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { StatisticsDays } from './pages/statistics/StatisticsDays'; 
import { ProtectedRoute } from './components/ProtectedRoute';
import { StatisticsWeek } from './pages/statistics/StatisticsWeek';

//Others
import { UserContextProvider } from './context/userContext';
import { StatisticsMonth } from './pages/statistics/StatisticsMonth';
import { StatisticsYear } from './pages/statistics/StatistisYear';



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
                <Route path="/statistics-days" element={<StatisticsDays />} />
                <Route path="/statistics-week" element={<StatisticsWeek />} />
                <Route path="/statistics-month" element={<StatisticsMonth />} />
                <Route path="/statistics-year" element={<StatisticsYear />} />
              </Route>
            </Routes>
        </BrowserRouter>
      </div>
    </UserContextProvider>
  );
 }
 
export default App;
 
