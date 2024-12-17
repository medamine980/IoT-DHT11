
import Footer from './shared/Footer';
import Navbar from './shared/Navbar'
import Sidebar from './shared/Sidebar'
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
