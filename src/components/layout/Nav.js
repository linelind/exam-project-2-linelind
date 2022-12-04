import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Heading from "../common/Heading";

function navMobile() {
  const navMobile = document.querySelector(".navMobile");
  navMobile.classList.toggle("hidden");
}

function NavBar() {
  const [auth, setAuth] = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [windowWidth, setWindowWidth] = useState({
    windowWidth: window.innerWidth,
  });

  const detectWidth = () => {
    setWindowWidth({
      windowWidth: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectWidth);

    return () => {
      window.removeEventListener("resize", detectWidth);
    };
  }, [windowWidth]);

  const history = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function logout() {
    setAuth(null);
    history(`/`);
    setShow(false);
  }

  return (
    <>
      {(() => {
        if (window.innerWidth > 500) {
          return (
            <nav className='navBar'>
              <div className='navContainer'>
                <div className='navLinksContainer'>
                  <Link to='/feed' className='logo'>
                    PlotTwist
                  </Link>
                  <Link to='/feed'>Posts</Link>
                  <Link to='/profiles'>Profiles</Link>
                </div>
                <div className='navElementsContainer'>
                  {auth ? (
                    <>
                      <button onClick={handleShow} className='cta logOutBtn hoverBtn'>
                        Log out
                      </button>
                    </>
                  ) : (
                    <Link to='/' className='cta logInBtn hoverBtn'>
                      Login
                    </Link>
                  )}
                  <Link to='/myprofile'>
                    <i className='fa-solid fa-user'></i>
                  </Link>
                </div>
              </div>
            </nav>
          );
        } else {
          return (
            <nav className='navBar'>
              <div className='navContainer'>
                <div className='navLinksContainer'>
                  <Link to='/feed' className='logo'>
                    PlotTwist
                  </Link>
                </div>
                <div className='navElementsContainer'>
                  {auth ? (
                    <>
                      <button onClick={handleShow} className='cta logOutBtn'>
                        Log out
                      </button>
                    </>
                  ) : (
                    <Link to='/' className='cta logInBtn'>
                      Login
                    </Link>
                  )}
                  <div className='navMobile hidden'>
                    <div className='navMobileHeader'>
                      <Heading title='Menu' size={2} />
                      <p className='close' onClick={navMobile}>
                        Close <i className='fa-solid fa-xmark'></i>
                      </p>
                    </div>
                    <Link to='/myprofile'>My profile</Link>
                    <Link to='/feed'>Posts</Link>
                    <Link to='/profiles'>Profiles</Link>
                  </div>
                  <i className='fa-solid fa-bars' onClick={navMobile}></i>
                </div>
              </div>
            </nav>
          );
        }
      })()}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>You are about to log out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button className='cta cancelBtn' onClick={handleClose}>
            Cancel
          </Button>
          <Button className='cta deleteBtnSmall' onClick={logout}>
            Log out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavBar;
