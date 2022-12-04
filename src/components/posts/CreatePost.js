import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Avatar from "../common/Avatar";

const schema = yup.object().shape({
  title: yup.string().required("Please give your post a title"),
  body: yup.string(),
  media: yup.string().matches(/(http[s]?:\/\/.*\.)(jpg|jpeg|png)/i, { message: "Please enter a valid image url", excludeEmptyString: true }),
  tags: yup.string(),
});

function displayImage() {
  const imageLabel = document.querySelector("#imageLabel");
  imageLabel.classList.toggle("hidden");
}

function displayTags() {
  const tagsLabel = document.querySelector("#tagsLabel");
  tagsLabel.classList.toggle("hidden");
}

export default function RegisterForm() {
  const [created, setCreated] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [postError, setPostError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const urlAxios = useAxios();

  async function createPost(data) {
    const tagsData = data.tags;
    const splitTags = tagsData.split(" ");

    if (data.media === "") {
      data.media = null;
    }

    const formData = {
      title: data.title,
      body: data.body,
      media: data.media,
      tags: splitTags,
    };

    try {
      const response = await urlAxios.post("/social/posts", formData);
      setCreated(true);
      setPostError(false);
      window.location.reload();
    } catch (error) {
      setPostError(true);
    } finally {
      setCreated(false);
    }
  }

  useEffect(function () {
    async function getAvatar() {
      try {
        const response = await urlAxios.get("/social/profiles/" + auth.name);
        setAvatar(response.data);
      } catch (error) {
        console.log("An error occured");
      }
    }
    getAvatar();
  }, []);

  const [auth] = useContext(AuthContext);

  return (
    <div className='form createForm'>
      <Link to={`/myprofile`} className='userImageContainer'>
        <Avatar styles={"avatar avatarCreate"} media={avatar.avatar} alt={auth.name} />
      </Link>

      <form onSubmit={handleSubmit(createPost)} className='createFormInputs'>
        {postError && <div className='errorMessage'>That did not go to plan. Please try again.</div>}
        <label>
          <input {...register("title")} placeholder='Post title' aria-label='New post title' />
          {errors.title && <span>{errors.title.message}</span>}
        </label>
        <label>
          <textarea {...register("body")} placeholder='Post body' aria-label='New post body' />
        </label>
        <label id='imageLabel' className='hidden'>
          <input {...register("media")} placeholder='Add media' aria-label='New post image' />
          {errors.media && <span>{errors.media.message}</span>}
        </label>
        <label id='tagsLabel' className='hidden'>
          <input {...register("tags")} placeholder='Add tags' aria-label='New post tags' />
        </label>
        <div className='createBtnContainer'>
          <div className='addImageBtn hoverBtn' onClick={displayImage}>
            Add image
          </div>
          <div className='addTagsBtn hoverBtn' onClick={displayTags}>
            Add tags
          </div>
          <button className='cta createPostBtn hoverBtn'>Post</button>
        </div>
      </form>
    </div>
  );
}
