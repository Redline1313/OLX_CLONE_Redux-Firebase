import React, { useEffect, useState } from "react";
import logo from "../../assets/OLX-Logo.png";
import profileimg from "../../assets/profile-img.png";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBuilding,
  faCar,
  faAdd,
  faComment,
  faBell,
  faRightFromBracket,
  faSliders,
  faInfo,
  faBagShopping,
  faHeart,
  faClipboard,
  faCreditCard,
  faSpinner,
  faBars,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import logoblack from "../../assets/OLX-Logo-black.webp";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "../CustomModal/CustomModal";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import dropimg from "../../assets/drop.png";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showProfile, setProfile] = useState(false);
  const [showMegaMenu, setMegaMenu] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSerach = () => {
    navigate(`/ViewMore?searchQuery=${encodeURIComponent(searchQuery)}`);
  };
  const handleShowMegaMenu = () => {
    setMegaMenu(!showMegaMenu);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    setLoggingOut(true);
    auth.signOut();
    setSidebarOpen(false);

    navigate("/");
  };

  const handleProfileMenuDown = () => {
    setProfile(!showProfile);
  };

  const handleSellClick = () => {
    if (user) {
      navigate("/category");
    } else {
      openModal();
    }
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <header>
        <div className={`top-bar ${sidebarOpen ? "sidebar-open" : ""}`}>
          {sidebarOpen && (
            <div className="sidebar">
              <button className="sidebar-close-button" onClick={closeSidebar}>
                <FontAwesomeIcon icon={faClose} />
              </button>

              <div className="side-login">
                {user ? (
                  <div className="side-Logged-in">
                    <>
                      {loggingOut ? (
                        <div className="loading-spinner">
                          <div className="loader"></div>
                        </div>
                      ) : (
                        <>
                          <div className="side-username">
                            <img
                              src={profileimg}
                              onClick={handleProfileMenuDown}
                            />

                            <div>
                              <p>{user ? user.displayName : "Guest"}</p>
                              <br />
                              <Link>Edit Profile</Link>
                            </div>
                          </div>
                          <div className="line"></div>
                          <div className="side-log-comment">
                            <button>
                              <FontAwesomeIcon icon={faComment} />
                              Chat
                            </button>
                          </div>

                          <div className="side-log-bell">
                            <button>
                              <FontAwesomeIcon icon={faBell} />
                              Notification
                            </button>
                          </div>

                          <button
                            className="side-sell-button"
                            onClick={handleSellClick}
                          >
                            <Link to="/">
                              <FontAwesomeIcon icon={faAdd} /> Sell
                            </Link>
                          </button>
                          <div className="line"></div>
                        </>
                      )}

                      <div className="side-ul">
                        <button>
                          <FontAwesomeIcon icon={faBagShopping} />
                          My Ads
                        </button>

                        <button>
                          <FontAwesomeIcon icon={faHeart} />
                          Favourites
                        </button>
                        <button>
                          <FontAwesomeIcon icon={faClipboard} />
                          Buy business
                        </button>
                        <button>
                          <FontAwesomeIcon icon={faCreditCard} />
                          Bought
                        </button>
                        <button>
                          <FontAwesomeIcon icon={faInfo} />
                          Help
                        </button>
                        <button onClick={closeSidebar}>
                          <Link to="/ChangePassword">
                            <FontAwesomeIcon icon={faSliders} />
                            Setting
                          </Link>
                        </button>
                      </div>
                      <div className="line"></div>
                      <button onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        Logout
                      </button>
                    </>
                  </div>
                ) : (
                  <>
                    <div className="side-log-comment">
                      <button>
                        <FontAwesomeIcon icon={faComment} />
                        Chat
                      </button>
                    </div>

                    <div className="side-log-bell">
                      <button>
                        <FontAwesomeIcon icon={faBell} />
                        Notification
                      </button>
                    </div>

                    <button
                      className="side-sell-button"
                      onClick={handleSellClick}
                    >
                      <Link to="/">
                        <FontAwesomeIcon icon={faAdd} /> Sell
                      </Link>
                    </button>
                    <div>
                      <button onClick={openModal} className="side-login-link">
                        Login
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="top-bar">
            <div className="top-icon-align ">
              <div className="top-bar-item">
                <button
                  className="sidebar-toggle SD-Ticon"
                  onClick={toggleSidebar}
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
              </div>
              <div className="top-bar-item SD-Ticon">
                <Link to="/">
                  <img src={logo} alt="OLX Logo" width="30px" />
                </Link>
              </div>
              <div className="top-bar-item top-icon SD-Ticon">
                <a href="#">
                  <FontAwesomeIcon icon={faCar} style={{ fontSize: "15px" }} />
                  Motors
                </a>
              </div>
              <div className="top-bar-item top-icon SD-Ticon">
                <a href="#">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    style={{ fontSize: "15px" }}
                  />
                  Property
                </a>
              </div>
            </div>

            <div className="header-bottom search-input-container ">
              <div className="top-bar-item">
                <Link to="/">
                  <img src={logoblack} width="60px" />
                </Link>
              </div>
              <div className="top-bar-item">
                <select className="select-input" name="" id="">
                  <option value="khi">Karachi</option>
                  <option value="fsd">Faisalabad</option>
                  <option value="lhr">Lahore</option>
                  <option value="Isl">Islamabad</option>
                </select>
              </div>
              <div className="top-bar-item search-input-container">
                <input
                  className="search"
                  type="search"
                  placeholder="Find Car, Mobile Phones and more..."
                  value={searchQuery}
                  onChange={handleSearchSubmit}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="glass"
                  style={{ fontSize: "26px", color: "white" }}
                  onClick={handleSerach}
                />
              </div>

              <div className="top-bar-item login">
                {user ? (
                  <div className="Logged-in">
                    <div className=" Log-icon log-comment">
                      <FontAwesomeIcon
                        icon={faComment}
                        style={{ fontSize: "25px" }}
                      />
                    </div>
                    <div className="Log-icon log-bell">
                      <FontAwesomeIcon
                        icon={faBell}
                        style={{ fontSize: "25px" }}
                      />
                    </div>
                    <div className=" Log-icon log-user dropdown-img">
                      {loggingOut ? (
                        <div className="loading-spinner">
                          <div className="loader"></div>
                        </div>
                      ) : (
                        <img
                          src={profileimg}
                          width={43}
                          onClick={handleProfileMenuDown}
                        />
                      )}
                      {showProfile && (
                        <div className="profile-dropdown">
                          <ul className="menu">
                            <div className="side-username">
                              <img
                                src={profileimg}
                                onClick={handleProfileMenuDown}
                              />

                              <div>
                                <p>{user ? user.displayName : "Guest"}</p>
                                <br />
                                <Link>Edit Profile</Link>
                              </div>
                            </div>
                            <div className="line" />
                            <li className="menu-item">
                              <button>
                                <FontAwesomeIcon icon={faBagShopping} />
                                My Ads
                              </button>
                            </li>
                            <li className="menu-item">
                              <button>
                                <FontAwesomeIcon icon={faHeart} />
                                Favourites
                              </button>
                            </li>
                            <li className="menu-item">
                              <button>
                                <FontAwesomeIcon icon={faClipboard} />
                                Buy business
                              </button>
                            </li>
                            <li className="menu-item">
                              <button>
                                <FontAwesomeIcon icon={faCreditCard} />
                                Bought
                              </button>
                            </li>
                            <li className="menu-item">
                              <button>
                                <FontAwesomeIcon icon={faInfo} />
                                Help
                              </button>
                            </li>
                            <li className="menu-item">
                              <button>
                                <Link to="/ChangePassword">
                                  <FontAwesomeIcon icon={faSliders} />
                                  Setting
                                </Link>
                              </button>
                            </li>
                            <div className="line" />
                            <li>
                              <button onClick={handleLogout}>
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                Logout
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <button onClick={openModal} className="login-link">
                    Login
                  </button>
                )}
              </div>

              <div className="top-bar-item">
                <button className="sell-button" onClick={handleSellClick}>
                  <Link to="/">
                    <FontAwesomeIcon icon={faAdd} /> Sell
                  </Link>
                </button>
              </div>
            </div>

            <div className="nav-bar">
              <div>
                <div className="dropdown">
                  <div className="dropdown-cat">
                    <button onClick={handleShowMegaMenu}>All Categories</button>
                    <img src={dropimg} />
                  </div>
                  {showMegaMenu && (
                    <div className="dropdown-content">
                      <div className="row">
                        <div className="column">
                          <h3>Mobiles </h3>
                          <a href="#">Mobile Phone</a>
                          <a href="#">Accesories</a>
                          <a href="#">Smart Watch</a>
                          <a href="#">Tablets</a>
                          <h3>Vehicles </h3>
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                          <h3>Category </h3>
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                          <h3>Category </h3>
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                          <h3>Category </h3>
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                        </div>
                        <div className="column">
                          <h3>Category </h3>
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                          <h3>Category </h3>
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                          <h3>Category </h3>
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                        </div>
                        <div className="column">
                          <h3>Category </h3>
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                          <h3>Category </h3>
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                        </div>
                        <div className="column">
                          <h3>Category </h3>
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                          <h3>Category </h3>
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                          <h3>Category </h3>
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                          <h3>Category </h3>
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <a className="nav-gone" href="#">
                  Mobile Phone
                </a>
                <a className="nav-gone" href="#">
                  Cars
                </a>
                <a className="nav-gone" href="#">
                  Motorcycles
                </a>
                <a className="nav-gone" href="#">
                  Houses
                </a>
                <a className="nav-gone" href="#">
                  TV-Video-Audio
                </a>
                <a className="nav-gone" href="#">
                  Tablets
                </a>
                <a className="nav-gone" href="#">
                  Land & plots
                </a>
              </div>
            </div>
          </div>
        </div>

        <CustomModal isOpen={isModalOpen} onClose={closeModal} />
      </header>
    </>
  );
};

export default Header;
