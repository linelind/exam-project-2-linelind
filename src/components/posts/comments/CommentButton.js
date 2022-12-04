import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../../hooks/useAxios";

const schema = yup.object().shape({
  body: yup.string().required("Please enter your comment"),
});

export default function CommentButton() {
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  let { id } = useParams();

  const urlComment = `/social/posts/${id}/comment`;

  async function handleComment(data) {
    try {
      const response = await http.post(urlComment, data);
      window.location.reload();
    } catch (error) {
      setError(error.toString());
    }
  }

  return (
    <form onSubmit={handleSubmit(handleComment)} className='commentContainer'>
      <label>
        <textarea {...register("body")} placeholder='Write a comment' aria-label='Comment on post' />
        {errors.body && <span>{errors.body.message}</span>}
      </label>
      <button className='cta commentBtn hoverBtn'>Comment</button>
    </form>
  );
}
