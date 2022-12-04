import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import FollowButton from "../follow/FollowButton";
import UnfollowButton from "../follow/UnfollowButton";
import Avatar from "../common/Avatar";
import Banner from "../common/Banner";
import Heading from "../common/Heading";
import ProfilePosts from "./ProfilePosts";
import ErrorMessage from "../common/ErrorMessage";
import Loader from "../layout/Loader";
import Modal from "react-bootstrap/Modal";
import FallbackAvatar from "../../images/fallbackavatar.jpg";
import FallbackBanner from "../../images/fallbackbanner.jpg";

export default function ProfileMenu() {
  const [profiledetail, setProfiledetail] = useState(null);
  const [counted, setCounted] = useState(null);
  const [profileFollowing, setProfileFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let location = useLocation();

  const name = location.pathname.split("/").pop();

  const [auth] = useContext(AuthContext);

  const urlAxios = useAxios();

  useEffect(
    function () {
      async function getCount() {
        try {
          const response = await urlAxios.get(`/social/profiles/${name}?_following=true&_followers=true`);
          setProfiledetail(response.data);
          setCounted(response.data._count);
          setProfileFollowing(response.data.following);
          setFollowers(response.data.followers);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
      getCount();
    },
    [location]
  );

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  let isFollowing = false;
  followers.map((follower) => {
    if (follower.name === auth.name) {
      isFollowing = true;
    }
  });

  let followUnfollowButton;

  if (isFollowing === true) {
    followUnfollowButton = <UnfollowButton name={name} />;
  } else {
    followUnfollowButton = <FollowButton name={name} />;
  }

  return (
    <>
      <div className='profileHeaderContainer' key={profiledetail.name}>
        <div className='imageModalHover imageModalHoverBanner' onClick={() => setShowBanner(true)}>
          <Banner styles='banner' media={profiledetail.banner} alt={profiledetail.name} />
        </div>
        <div className='profileInfoContainer'>
          <div className='userBasicsContainer'>
            <div className='imageModalHover imageModalHoverAvatar' onClick={() => setShowAvatar(true)}>
              <Avatar styles={"avatar"} media={profiledetail.avatar} alt={profiledetail.name} />
            </div>
            <div className='profileNameContainer'>
              <Heading title={profiledetail.name} />
              <p>{profiledetail.email}</p>
            </div>
          </div>
          <div>
            <div>{followUnfollowButton}</div>
          </div>
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
          <ProfilePosts />
        </div>
        <div className='tab-pane fade' id='following-tab-pane' role='tabpanel' aria-labelledby='following-tab' tabIndex='0'>
          {(() => {
            if (profileFollowing.length === 0) {
              return <p>This user is not following anyone yet.</p>;
            } else {
              return (
                <div className='followListContainer'>
                  {profileFollowing.map((following) => {
                    if (following.name === auth.name) {
                      return (
                        <Link to={`/myprofile`} key={following.name}>
                          <div className='profileCard followCard'>
                            <Avatar styles={"avatar avatarSmall"} media={following.avatar} alt={following.name} />
                            <Heading size={2} title={following.name} />
                          </div>
                        </Link>
                      );
                    } else {
                      return (
                        <Link to={`/profile/${following.name}`} key={following.name}>
                          <div className='profileCard followCard'>
                            <Avatar styles={"avatar avatarSmall"} media={following.avatar} alt={following.name} />
                            <Heading size={2} title={following.name} />
                          </div>
                        </Link>
                      );
                    }
                  })}
                </div>
              );
            }
          })()}
        </div>
        <div className='tab-pane fade' id='followers-tab-pane' role='tabpanel' aria-labelledby='followers-tab' tabIndex='0'>
          {(() => {
            if (followers.length === 0) {
              return <p>No followers to show.</p>;
            } else {
              return (
                <div className='followListContainer'>
                  {followers.map((follower) => {
                    if (follower.name === auth.name) {
                      return (
                        <Link to={`/myprofile`} key={follower.name}>
                          <div className='profileCard followCard'>
                            <Avatar styles={"avatar avatarSmall"} media={follower.avatar} alt={follower.name} />
                            <Heading size={2} title={follower.name} />
                          </div>
                        </Link>
                      );
                    } else {
                      return (
                        <Link to={`/profile/${follower.name}`} key={follower.name}>
                          <div className='profileCard followCard'>
                            <Avatar styles={"avatar avatarSmall"} media={follower.avatar} alt={follower.name} />
                            <Heading size={2} title={follower.name} />
                          </div>
                        </Link>
                      );
                    }
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
            src={profiledetail.avatar !== "" && profiledetail.avatar !== null ? profiledetail.avatar : FallbackAvatar}
            alt={profiledetail.name + `'s avatar`}
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
            src={profiledetail.banner !== "" && profiledetail.banner !== null ? profiledetail.banner : FallbackBanner}
            alt={profiledetail.name + `'s banner`}
            className='modalImage'
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
