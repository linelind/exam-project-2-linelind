import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import DeletePostButton from "./DeletePostButton";
import Loader from "../layout/Loader";
import ErrorMessage from "../common/ErrorMessage";
import BreadcrumbNav from "../layout/BreadcrumbNav";

const schema = yup.object().shape({
  title: yup.string().required("Please give your post a title"),
  body: yup.string(),
  media: yup.string(),
});

export default function EditPost() {
  const [post, setPost] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(true);
  const [updatingPost, setUpdatingPost] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useNavigate();
  const http = useAxios();

  let { id } = useParams();

  const url = `/social/posts/${id}`;

  useEffect(function () {
    async function getPost() {
      try {
        const response = await http.get(url);

        if (response.data.media === null) {
          response.data.media = "";
        }

        setPost(response.data);
        setFetchError(false);
      } catch (error) {
        setFetchError(true);
      } finally {
        setFetchingPost(false);
      }
    }

    getPost();
  }, []);

  async function editPost(data) {
    setUpdatingPost(true);
    setUpdateError(null);
    setUpdated(false);

    const EditTitle = data.title;
    const EditMessage = data.body;
    const EditMedia = data.media;
    const editTagsData = data.tags;
    const editSplitTags = editTagsData.split(" ");

    if (data.media === "") {
      data.media = null;
    }

    const formData = {
      title: EditTitle,
      body: EditMessage,
      media: EditMedia,
      tags: editSplitTags,
    };

    try {
      const response = await http.put(url, formData);
      setUpdated(true);

      if (response.status === 200) {
        setUpdateError(false);

        setTimeout(() => {
          history(`/post/${id}`);
        }, 1500);
      }
    } catch (error) {
      setUpdateError(true);
    } finally {
      setUpdatingPost(false);
    }
  }

  if (fetchingPost) return <Loader />;
  if (fetchError) return <ErrorMessage />;

  return (
    <div className='pageContainer'>
      <BreadcrumbNav path='/feed' title='Feed' current='Edit' />

      <form onSubmit={handleSubmit(editPost)} className='form editPostForm'>
        {updated && <div className='successMessage'>Aaand it's updated! Yeehaw!</div>}
        {updateError && (
          <div className='errorMessage'>
            Ah sorry, that did not go to plan.<br></br>Please try again.
          </div>
        )}
        <h1 className='editHeading'>Edit post</h1>
        <label id='title'>
          Title
          <input {...register("title")} defaultValue={post.title} id='title' />
          {errors.title && <span>{errors.title.message}</span>}
        </label>
        <label id='body'>
          Body
          <textarea {...register("body")} defaultValue={post.body} id='body' />
        </label>
        <label id='media'>
          Media
          <input {...register("media")} defaultValue={post.media} id='media' />
        </label>
        <label id='tags'>
          Tags
          <input {...register("tags")} defaultValue={post.tags} id='tags' />
        </label>
        <button className='cta updatePostBtn hoverBtn'>Update</button>
        <div className='deleteBtnContainer'>
          <DeletePostButton id={post.id} />
        </div>
      </form>
    </div>
  );
}
