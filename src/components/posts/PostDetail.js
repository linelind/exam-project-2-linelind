import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import ReactButton from "./reactions/ReactButton";
import CommentButton from "./comments/CommentButton";
import Heading from "../common/Heading";
import Avatar from "../common/Avatar";
import PostImage from "../common/PostImage";
import Loader from "../layout/Loader";
import moment from "moment";
import UniqueKey from "../common/UniqueKey";

export default function PostDetail() {
  const [postdetail, setPostdetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useNavigate();
  const { id } = useParams();

  if (!id) {
    history("/feed");
  }

  const [auth] = useContext(AuthContext);

  const urlAxios = useAxios();
  const urlPostDetail = "/social/posts/" + id + "?_author=true&_comments=true&_reactions=true";

  useEffect(function () {
    async function getPostDetail() {
      try {
        const result = await urlAxios.get(urlPostDetail);
        setPostdetail(result.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getPostDetail();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className='errorMessage'>Oh no, something went wrong.</div>;

  if (postdetail.author.email === auth.email) {
    return (
      <div className='pageContainer' key={postdetail.id}>
        <div className='postCard'>
          <div className='postHeader'>
            <Link to={`/myprofile`} className='postInfoContainer'>
              <Avatar styles={"avatar avatarSmall"} media={postdetail.author.avatar} alt={postdetail.author.name} />
              <div>
                <Heading size={2} title={postdetail.author.name} styling='postAuthor' />
                <p className='date'>{moment(postdetail.created).startOf("hour").fromNow()}</p>
              </div>
            </Link>
            <Link to={`/post/edit/${postdetail.id}`}>
              <button className='editBtn editBtnDetails hoverBtn'>Edit post</button>
            </Link>
          </div>
          <div>
            <Heading size={3} title={postdetail.title} styling='postTitle' />
            <p>{postdetail.body}</p>
          </div>
          <PostImage media={postdetail.media} />
          <div className='tagsContainer'>
            {postdetail.tags.map((tag) => {
              if (tag !== "") {
                return (
                  <p className='tagItem' key={UniqueKey(tag)}>
                    {tag}
                  </p>
                );
              }
            })}
          </div>
          <div className='commentReactionContainer'>
            <div className='reactionSymbols'>
              <ReactButton />
              <p>{postdetail._count.reactions}</p>
            </div>
            <div>
              <CommentButton />
            </div>
          </div>
          <div className='commentsContainer'>
            {postdetail.comments.map((comment) => {
              return (
                <div className='comment' key={comment.id}>
                  <p>{comment.body}</p>
                  <Link to={`/profile/${comment.owner}`}>
                    <div className='commentOwnerContainer'>
                      <Avatar styles={"avatar avatarTiny"} media={comment.author.avatar} alt={comment.owner} />
                      <div>
                        <p className='commentOwner'>Written by {comment.owner}</p>
                        <p className='date'>{moment(comment.created).startOf("hour").fromNow()}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='pageContainer' key={postdetail.id}>
        <div className='postCard'>
          <div className='postHeader'>
            <Link to={`/profile/${postdetail.author.name}`} key={postdetail.author.name} className='postInfoContainer'>
              <Avatar styles={"avatar avatarSmall"} media={postdetail.author.avatar} alt={postdetail.author.name} />
              <div>
                <Heading size={2} title={postdetail.author.name} styling='postAuthor' />
                <p className='date'>{moment(postdetail.created).startOf("hour").fromNow()}</p>
              </div>
            </Link>
          </div>
          <div>
            <Heading size={3} title={postdetail.title} styling='postTitle' />
            <p>{postdetail.body}</p>
          </div>
          <PostImage media={postdetail.media} />
          <div className='tagsContainer'>
            {postdetail.tags.map((tag) => {
              if (tag !== "") {
                return (
                  <p className='tagItem' key={UniqueKey(tag)}>
                    {tag}
                  </p>
                );
              }
            })}
          </div>
          <div className='commentReactionContainer'>
            <div className='reactionSymbols'>
              <ReactButton />
              <p>{postdetail._count.reactions}</p>
            </div>
            <div>
              <CommentButton />
            </div>
          </div>
          <div className='commentsContainer'>
            {postdetail.comments.map((comment) => {
              return (
                <div className='comment' key={comment.id}>
                  <p>{comment.body}</p>
                  <Link to={`/profile/${comment.owner}`}>
                    <div className='commentOwnerContainer'>
                      <Avatar styles={"avatar avatarTiny"} media={comment.author.avatar} alt={comment.owner} />
                      <div>
                        <p className='commentOwner'>Written by {comment.owner}</p>
                        <p className='date'>{moment(comment.created).startOf("hour").fromNow()}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
