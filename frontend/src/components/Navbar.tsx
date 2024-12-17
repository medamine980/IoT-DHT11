function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <a href="#" className="sidebar-toggle js-sidebar-toggle">
        <i className="hamburger align-self-center"></i>
      </a>

      <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
          <li className="nav-item dropdown">
            <a 
              className="nav-icon dropdown-toggle" 
              href="#" 
              id="alertsDropdown" 
              data-bs-toggle="dropdown"
            >
              <div className="position-relative">
                <i className="align-middle" data-feather="bell"></i>
                <span className="indicator">4</span>
              </div>
            </a>
            <div 
              className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" 
              aria-labelledby="alertsDropdown"
            >
              <div className="dropdown-menu-header">
                4 New Notifications
              </div>
              <div className="list-group">
                <a href="#" className="list-group-item">
                  <div className="row g-0 align-items-center">
                    <div className="col-2">
                      <i className="text-danger" data-feather="alert-circle"></i>
                    </div>
                    <div className="col-10">
                      <div className="text-dark">Update completed</div>
                      <div className="text-muted small mt-1">Restart server 12 to complete the update.</div>
                      <div className="text-muted small mt-1">30m ago</div>
                    </div>
                  </div>
                </a>
                {/* Messages list items */}
                <a href="#" className="list-group-item">
                  <div className="row g-0 align-items-center">
                    <div className="col-2">
                      <img 
                        src="img/avatars/avatar-2.jpg" 
                        className="avatar img-fluid rounded-circle" 
                        alt="William Harris" 
                      />
                    </div>
                    <div className="col-10 ps-2">
                      <div className="text-dark">William Harris</div>
                      <div className="text-muted small mt-1">Curabitur ligula sapien euismod vitae.</div>
                      <div className="text-muted small mt-1">2h ago</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="dropdown-menu-footer">
                <a href="#" className="text-muted">Show all messages</a>
              </div>
            </div>
          </li>

          {/* Additional dropdown items */}
          <li className="nav-item dropdown">
            <a 
              className="nav-link dropdown-toggle d-none d-sm-inline-block" 
              href="#" 
              data-bs-toggle="dropdown"
            >
              <img 
                src="img/avatars/avatar.jpg" 
                className="avatar img-fluid rounded me-1" 
                alt="Charles Hall" 
              /> 
              <span className="text-dark">Charles Hall</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;