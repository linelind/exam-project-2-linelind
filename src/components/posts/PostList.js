import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Heading from "../common/Heading";
import Avatar from "../common/Avatar";
import PostImage from "../common/PostImage";
import Loader from "../layout/Loader";
import ErrorMessage from "../common/ErrorMessage";
import moment from "moment";
import UniqueKey from "../common/UniqueKey";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlAxios = useAxios();
  const [auth] = useContext(AuthContext);

  const postUrl = `/social/posts?_author=true&_comments=true&_reactions=true`;

  useEffect(function () {
    async function getPosts() {
      try {
        const response = await urlAxios.get(postUrl);
        setPosts(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  if (posts.media === "") {
    posts.media = null;
  }

  return (
    <div>
      {posts.map((post) => {
        if (post.author.email !== auth.email) {
          return (
            <div className='postCard postCardHover' key={post.id}>
              <div className='postHeader'>
                <Link to={`/profile/${post.author.name}`} className='postInfoContainer'>
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
        } else {
          return (
            <div className='postCard postCardHover' key={post.id}>
              <div className='postHeader'>
                <Link to={`/myprofile`} className='postInfoContainer'>
                  <Avatar styles={"avatar avatarSmall"} media={post.author.avatar} alt={post.author.name} />
                  <div>
                    <Heading size={2} title={post.author.name} styling='postAuthor' />
                    <p className='date'>{moment(post.created).startOf("hour").fromNow()}</p>
                  </div>
                </Link>
                <Link to={`/post/edit/${post.id}`}>
                  <button className='editBtn hoverBtn'>Edit post</button>
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
        }
      })}
    </div>
  );
}
