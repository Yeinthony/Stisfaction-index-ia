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
import { StatisticsMonth } from './pages/statistics/StatisticsMonth';
import { StatisticsYear } from './pages/statistics/StatisticsYear';
import { ReportsDays } from './pages/reports/ReportsDays';
import { ReportsWeek } from './pages/reports/ReportsWeek';
import { ShowPDFDay } from './pages/reports/showPDF/showPDFDay';

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

                {/* Statistics */}
                <Route path="/statistics-days" element={<StatisticsDays />} />
                <Route path="/statistics-week" element={<StatisticsWeek />} />
                <Route path="/statistics-month" element={<StatisticsMonth />} />
                <Route path="/statistics-year" element={<StatisticsYear />} />

                {/* Reports */}
                <Route path="/reports-days" element={<ReportsDays />} />
                <Route path="/reports-week" element={<ReportsWeek />} />
                <Route path="/reports-days-showPDF" element={<ShowPDFDay />} />

              </Route>
            </Routes>
        </BrowserRouter>
      </div>
    </UserContextProvider>
  );
 }
 
export default App;
 
