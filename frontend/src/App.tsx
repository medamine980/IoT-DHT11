import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Footer from './shared/Footer';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Dashboard from './Pages/Dashboard';
import HistoryPage from './Pages/HistoryPage';
import IncidentArchive from './Pages/IncidentArchive';
import Administration from './Pages/Administration';
import UserProfile from './Pages/UserProfile';
import { ToastContainer } from 'react-toastify';
import UserContext from './context/user-context';
import { useEffect, useState } from 'react';
import { checkLogin } from './Services/usersService';
import Loading from './shared/Loading/Loading';
import { UserInterface } from './interfaces/user-interface';
import { setCsrfTokenInCookie } from './Services/csrfService';

function App() {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setCsrfTokenInCookie().then(() => {
    checkLogin().then(user => {
      console.log(user);
      setUser(user);
    }).finally(() => {
      setLoading(false);
    })
    // })

  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ?
        <Loading />
        :
        <Router>
          <div className='wrapper'>
            <ToastContainer />
            <Sidebar />

            <div className="main">

              <Navbar />


              <main className="content">
                <div className="container-fluid p-0">
                  <Routes>

                    <Route path='/' element={<Navigate to="/Dashboard" />} />
                    <Route path='/Dashboard' element={<Dashboard />} />
                    <Route path='/History' element={<HistoryPage />} />
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
      }
    </UserContext.Provider>
  );
}

export default App;
