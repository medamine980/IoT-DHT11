import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Footer from './shared/Footer';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Dashboard from './Pages/Dashboard';
import HistoryPage from './Pages/HistoryPage';
import IncidentManagement from './Pages/IncidentManagement';
import IncidentArchive from './Pages/IncidentArchive';
import Administration from './Pages/Administration';
import UserProfile from './Pages/UserProfile';

function App() {
  return (
    <Router>
      <div className='wrapper'>
       
        <Sidebar />

        <div className="main">
          
          <Navbar />

         
          <main className="content">
            <div className="container-fluid p-0">
              <Routes>
                
                <Route path='/' element={<Navigate to="/Dashboard" />} />
                <Route path='/Dashboard' element={<Dashboard />} />
                <Route path='/History' element={<HistoryPage />} />
                <Route path='/IncidentManagement' element={<IncidentManagement />} />
                <Route path='/IncidentArchive' element={<IncidentArchive />} />
                <Route path='/Administration' element={<Administration />} />
                <Route path='/UserProfile' element={<UserProfile />} />

              </Routes>
            </div>
          </main>

          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
