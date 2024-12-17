
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './Pages/Dashboard';

function App() {
  return (
   <div className='wrapper'>
    <Sidebar/>

    <div className="main">
      <Navbar/>
			<main className="content">
				<div className="container-fluid p-0">

          <Dashboard/>
          </div>
          </main>
      <Footer/>
    </div>
   </div>
  )
}

export default App;
