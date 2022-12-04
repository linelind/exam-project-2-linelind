import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import Loader from "../layout/Loader";
import ErrorMessage from "../common/ErrorMessage";
import BreadcrumbNav from "../layout/BreadcrumbNav";

const schema = yup.object().shape({
  banner: yup.string().matches(/(http[s]?:\/\/.*\.)(jpg|jpeg|png)/i, { message: "Please enter a jpg/jpeg/png image url", excludeEmptyString: true }),
  avatar: yup.string().matches(/(http[s]?:\/\/.*\.)(jpg|jpeg|png)/i, { message: "Please enter a jpg/jpeg/png image url", excludeEmptyString: true }),
});

export default function EditMyProfile() {
  const [profilemedia, setProfilemedia] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingMedia, setFetchingMedia] = useState(true);
  const [updatingMedia, setUpdatingMedia] = useState(false);
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
  const axiosUrl = useAxios();

  let { name } = useParams();

  const MyInfourl = "/social/profiles/" + name;

  useEffect(function () {
    async function getMedia() {
      try {
        const response = await axiosUrl.get(MyInfourl);

        if (response.data.banner === null) {
          response.data.banner = "";
        }

        if (response.data.avatar === null) {
          response.data.avatar = "";
        }

        setProfilemedia(response.data);
      } catch (error) {
        setFetchError(true);
      } finally {
        setFetchingMedia(false);
      }
    }

    getMedia();
  }, []);

  const MyMediaUrl = "/social/profiles/" + name + "/media";

  async function onSubmit(data) {
    setUpdatingMedia(true);
    setUpdateError(null);
    setUpdated(false);

    if (data.banner === "") {
      data.banner = null;
    }

    if (data.avatar === "") {
      data.avatar = null;
    }

    try {
      const response = await axiosUrl.put(MyMediaUrl, data);
      setUpdated(true);

      if (response.status === 200) {
        setTimeout(() => {
          history(`/myprofile`);
        }, 1500);
      }
    } catch (error) {
      setUpdateError(true);
    } finally {
      setUpdatingMedia(false);
    }
  }

  if (fetchingMedia) return <Loader />;
  if (fetchError) return <ErrorMessage />;

  return (
    <div className='pageContainer'>
      <BreadcrumbNav path='/myprofile' title='My profile' current='Edit' />

      <form onSubmit={handleSubmit(onSubmit)} className='form editProfileForm'>
        {updated && <div className='successMessage'>Aaand it's updated! Yeehaw!</div>}
        {updateError && (
          <div className='errorMessage'>
            Ah sorry, that did not go to plan.<br></br>Please try again.
          </div>
        )}
        <h1 className='editHeading'>Edit media</h1>
        <label id='banner'>
          Banner
          <input {...register("banner")} defaultValue={profilemedia.banner} id='banner' />
          {errors.banner && <span>{errors.banner.message}</span>}
        </label>
        <label id='avatar'>
          Avatar
          <input {...register("avatar")} defaultValue={profilemedia.avatar} id='avatar' />
          {errors.avatar && <span>{errors.avatar.message}</span>}
        </label>
        <button className='cta editProfileBtn hoverBtn'>Update profile</button>
      </form>
    </div>
  );
}
