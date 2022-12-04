import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../../hooks/useAxios";

const schema = yup.object().shape({
  symbol: yup.string(),
});

export default function ReactButton() {
  const [error, setError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  let { id } = useParams();
  let symbol = "🧡";

  const urlReact = `/social/posts/${id}/react/${symbol}`;

  async function handleReact(data) {
    try {
      const response = await http.put(urlReact, data);
      window.location.reload();
    } catch (error) {
      setError(error.toString());
    }
  }

  return (
    <form onSubmit={handleSubmit(handleReact)} className='reactionContainer'>
      <input type='hidden' {...register("symbol")} value={"🧡"} aria-label='React to post' />
      <button className='btnReact'>🧡</button>
    </form>
  );
}
