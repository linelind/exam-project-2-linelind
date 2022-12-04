import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import MyPosts from "./MyPosts";
import Heading from "../common/Heading";
import Avatar from "../common/Avatar";
import Banner from "../common/Banner";
import Loader from "../layout/Loader";
import ErrorMessage from "../common/ErrorMessage";
import Modal from "react-bootstrap/Modal";
import FallbackAvatar from "../../images/fallbackavatar.jpg";
import FallbackBanner from "../../images/fallbackbanner.jpg";

function MyProfileMenu() {
  const [myprofile, setMyprofile] = useState([]);
  const [counted, setCounted] = useState(null);
  const [myfollowers, setMyfollowers] = useState([]);
  const [myfollowing, setMyfollowing] = useState([]);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();
  const [auth] = useContext(AuthContext);

  useEffect(function () {
    async function getCount() {
      try {
        const response = await urlAxios.get(`/social/profiles/${auth.name}?_following=true&_followers=true`);
        setMyprofile(response.data);
        setCounted(response.data._count);
        setMyfollowers(response.data.followers);
        setMyfollowing(response.data.following);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getCount();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <>
      <div className='profileHeaderContainer'>
        <div className='imageModalHover imageModalHoverBanner' onClick={() => setShowBanner(true)}>
          <Banner styles='banner' media={myprofile.banner} alt={myprofile.name} />
        </div>
        <div className='profileInfoContainer'>
          <div className='userBasicsContainer'>
            <div className='imageModalHover imageModalHoverAvatar' onClick={() => setShowAvatar(true)}>
              <Avatar styles={"avatar"} media={myprofile.avatar} alt={myprofile.name} />
            </div>
            <div className='profileNameContainer'>
              <Heading title={myprofile.name} />
              <p>{myprofile.email}</p>
            </div>
          </div>
          <Link to={`/myprofile/edit/${myprofile.name}`}>
            <button className='editBtn hoverBtn'>Edit profile</button>
          </Link>
        </div>
      </div>
      <ul className='nav nav-tabs navTabsProfile' id='myTab' role='tablist'>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link active'
            id='post-tab'
            data-bs-toggle='tab'
            data-bs-target='#post-tab-pane'
            type='button'
            role='tab'
            aria-controls='post-tab-pane'
            aria-selected='true'>
            Posts ({counted.posts})
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='following-tab'
            data-bs-toggle='tab'
            data-bs-target='#following-tab-pane'
            type='button'
            role='tab'
            aria-controls='following-tab-pane'
            aria-selected='false'>
            Following ({counted.following})
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='followers-tab'
            data-bs-toggle='tab'
            data-bs-target='#followers-tab-pane'
            type='button'
            role='tab'
            aria-controls='followers-tab-pane'
            aria-selected='false'>
            Followers ({counted.followers})
          </button>
        </li>
      </ul>
      <div className='tab-content' id='myTabContent'>
        <div className='tab-pane fade show active' id='post-tab-pane' role='tabpanel' aria-labelledby='post-tab' tabIndex='0'>
          <MyPosts />
        </div>
        <div className='tab-pane fade' id='following-tab-pane' role='tabpanel' aria-labelledby='following-tab' tabIndex='0'>
          {(() => {
            if (myfollowing.length === 0) {
              return <p>You are not following anyone yet.</p>;
            } else {
              return (
                <div className='followListContainer'>
                  {myfollowing.map((following) => {
                    return (
                      <Link to={`/profile/${following.name}`} key={following.name}>
                        <div className='profileCard followCard'>
                          <Avatar styles={"avatar avatarSmall"} media={following.avatar} alt={following.name} />
                          <Heading size={2} title={following.name} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              );
            }
          })()}
        </div>
        <div className='tab-pane fade' id='followers-tab-pane' role='tabpanel' aria-labelledby='followers-tab' tabIndex='0'>
          {(() => {
            if (myfollowers.length === 0) {
              return <p>No followers to show.</p>;
            } else {
              return (
                <div className='followListContainer'>
                  {myfollowers.map((follower) => {
                    return (
                      <Link to={`/profile/${follower.name}`} key={follower.name}>
                        <div className='profileCard followCard'>
                          <Avatar styles={"avatar avatarSmall"} media={follower.avatar} alt={follower.name} />
                          <Heading size={2} title={follower.name} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              );
            }
          })()}
        </div>
      </div>
      <Modal size='lg' show={showAvatar} onHide={() => setShowAvatar(false)} aria-labelledby='modal-sizes-title-lg'>
        <Modal.Header closeButton>
          <Modal.Title id='modal-sizes-title-lg'>View avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={myprofile.avatar !== "" && myprofile.avatar !== null ? myprofile.avatar : FallbackAvatar}
            alt={myprofile.name + `'s avatar`}
            className='modalImage'
          />
        </Modal.Body>
      </Modal>
      <Modal size='lg' show={showBanner} onHide={() => setShowBanner(false)} aria-labelledby='modal-sizes-title-lg'>
        <Modal.Header closeButton>
          <Modal.Title id='modal-sizes-title-lg'>View banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={myprofile.banner !== "" && myprofile.banner !== null ? myprofile.banner : FallbackBanner}
            alt={myprofile.name + `'s banner`}
            className='modalImage'
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MyProfileMenu;
