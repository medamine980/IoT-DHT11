import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation(); // Permet de vérifier le chemin actuel pour activer le lien correspondant

  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand" href="#">
          <span className="align-middle">AdminKit</span>
        </a>

        <ul className="sidebar-nav">
          <li className="sidebar-header">Pages</li>

          {/* Dashboard */}
          <li className={`sidebar-item ${location.pathname === '/Dashboard' ? 'active' : ''}`}>
            <Link className="sidebar-link" to="/Dashboard">
              <i className="align-middle" data-feather="sliders"></i> 
              <span className="align-middle">Dashboard</span>
            </Link>
          </li>

          {/* Historique */}
          <li className={`sidebar-item ${location.pathname === '/History' ? 'active' : ''}`}>
            <Link className="sidebar-link" to="/History">
              <i className="align-middle" data-feather="clock"></i> 
              <span className="align-middle">Historique</span>
            </Link>
          </li>

          {/* Gestion des Incidents */}
          <li className={`sidebar-item ${location.pathname === '/IncidentManagement' ? 'active' : ''}`}>
            <Link className="sidebar-link" to="/IncidentManagement">
              <i className="align-middle" data-feather="alert-triangle"></i> 
              <span className="align-middle">Gestion des Incidents</span>
            </Link>
          </li>

           {/* Archives des Incidents */}
           <li className={`sidebar-item ${location.pathname === '/IncidentArchive' ? 'active' : ''}`}>
            <Link className="sidebar-link" to="/IncidentArchive">
              <i className="align-middle" data-feather="archive"></i> 
              <span className="align-middle">Archives des Incidents</span>
            </Link>
          </li>

           {/* Archives des Incidents */}
           <li className={`sidebar-item ${location.pathname === '/Administration' ? 'active' : ''}`}>
            <Link className="sidebar-link" to="/Administration">
              <i className="align-middle" data-feather="archive"></i> 
              <span className="align-middle">Administration</span>
            </Link>
          </li>


          {/* Profil */}
          <li className={`sidebar-item ${location.pathname === '/UserProfile' ? 'active' : ''}`}>
            <Link className="sidebar-link" to="/UserProfile">
              <i className="align-middle" data-feather="user"></i> 
              <span className="align-middle">Profil</span>
            </Link>
          </li>

          {/* Connexion */}
          {/* <li className={`sidebar-item ${location.pathname === '/SignIn' ? 'active' : ''}`}>
            <Link className="sidebar-link" to="/SignIn">
              <i className="align-middle" data-feather="log-in"></i> 
              <span className="align-middle">Connexion</span>
            </Link>
          </li> */}

          {/* Inscription */}
          {/* <li className={`sidebar-item ${location.pathname === '/SignUp' ? 'active' : ''}`}>
            <Link className="sidebar-link" to="/SignUp">
              <i className="align-middle" data-feather="user-plus"></i> 
              <span className="align-middle">Inscription</span>
            </Link>
          </li> */}

          {/* Page Blanche */}
          {/* <li className={`sidebar-item ${location.pathname === '/Blank' ? 'active' : ''}`}>
            <Link className="sidebar-link" to="/Blank">
              <i className="align-middle" data-feather="book"></i> 
              <span className="align-middle">Page Blanche</span>
            </Link>
          </li> */}

          {/* <li className="sidebar-header">Outils & Composants</li> */}

          {/* Boutons */}
          {/* <li className={`sidebar-item ${location.pathname === '/Buttons' ? 'active' : ''}`}>
            <Link className="sidebar-link" to="/Buttons">
              <i className="align-middle" data-feather="square"></i> 
              <span className="align-middle">Boutons</span>
            </Link>
          </li> */}

          {/* Formulaires */}
          {/* <li className={`sidebar-item ${location.pathname === '/Forms' ? 'active' : ''}`}>
            <Link className="sidebar-link" to="/Forms">
              <i className="align-middle" data-feather="check-square"></i> 
              <span className="align-middle">Formulaires</span>
            </Link>
          </li> */}

          {/* Cartes */}
          {/* <li className={`sidebar-item ${location.pathname === '/Cards' ? 'active' : ''}`}>
            <Link className="sidebar-link" to="/Cards">
              <i className="align-middle" data-feather="grid"></i> 
              <span className="align-middle">Cartes</span>
            </Link>
          </li> */}

          {/* Graphiques */}
          {/* <li className={`sidebar-item ${location.pathname === '/Charts' ? 'active' : ''}`}>
            <Link className="sidebar-link" to="/Charts">
              <i className="align-middle" data-feather="bar-chart-2"></i> 
              <span className="align-middle">Graphiques</span>
            </Link>
          </li> */}

          {/* Cartes (Maps) */}
          {/* <li className={`sidebar-item ${location.pathname === '/Maps' ? 'active' : ''}`}>
            <Link className="sidebar-link" to="/Maps">
              <i className="align-middle" data-feather="map"></i> 
              <span className="align-middle">Cartes</span>
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
