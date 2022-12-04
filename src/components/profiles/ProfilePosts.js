import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Heading from "../common/Heading";
import PostImage from "../common/PostImage";
import Avatar from "../common/Avatar";
import Loader from "../layout/Loader";
import ErrorMessage from "../common/ErrorMessage";
import moment from "moment";
import UniqueKey from "../common/UniqueKey";

export default function ProfilePosts() {
  const [profileposts, setProfileposts] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();

  let location = useLocation();

  useEffect(
    function () {
      const name = location.pathname.split("/").pop();

      async function getProfilePosts() {
        try {
          const response = await urlAxios.get("/social/profiles/" + name + "/posts?_author=true");
          setProfileposts(response.data);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      getProfilePosts();
    },
    [location]
  );

  const [auth] = useContext(AuthContext);
  const checkUrl = `/social/profiles/${auth.name}?_following=true`;

  useEffect(function () {
    async function getFollowing() {
      try {
        const result = await urlAxios.get(checkUrl);
        setFollowings(result.data.following);
      } catch (error) {
        setError(true);
      }
    }
    getFollowing();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  if (profileposts.length === 0) {
    return <p>This user has not posted anything yet.</p>;
  } else {
    return (
      <div className='postContainer'>
        {profileposts.map((post) => {
          return (
            <div className='postCard postCardHover' key={post.id}>
              <div className='postHeader'>
                <Link to={`/profile/${post.author.name}`} key={post.author.name} className='postInfoContainer'>
                  <Avatar styles={"avatar avatarSmall"} media={post.author.avatar} alt={post.author.name} />
                  <div>
                    <Heading size={2} title={post.author.name} styling='postAuthor' />
                    <p className='date'>{moment(post.created).startOf("hour").fromNow()}</p>
                  </div>
                </Link>
              </div>
              <Link to={`/post/${post.id}`}>
                <div>
                  <Heading size={3} title={post.title} styling='postTitle' />
                  <p>{post.body}</p>
                </div>
                <PostImage media={post.media} />
                <div className='tagsContainer'>
                  {post.tags.map((tag) => {
                    if (tag !== "") {
                      return (
                        <p className='tagItem' key={UniqueKey(tag)}>
                          {tag}
                        </p>
                      );
                    }
                  })}
                </div>
                <div className='iconContainer'>
                  {(() => {
                    if (post._count.comments !== 0) {
                      return (
                        <div className='PostCardCommentInfo'>
                          <i className='fa-solid fa-comment'></i>
                          <p>{post._count.comments}</p>
                        </div>
                      );
                    }
                    return null;
                  })()}
                  {(() => {
                    if (post._count.reactions !== 0) {
                      return (
                        <div className='PostCardReactionInfo'>
                          <i className='fa-solid fa-heart'></i>
                          <p>{post._count.reactions}</p>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
