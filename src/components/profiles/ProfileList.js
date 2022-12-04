import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import Heading from "../common/Heading";
import Avatar from "../common/Avatar";
import Banner from "../common/Banner";
import Loader from "../layout/Loader";
import ErrorMessage from "../common/ErrorMessage";
import UniqueKey from "../common/UniqueKey";

export default function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlProfiles = useAxios();
  const [auth] = useContext(AuthContext);

  useEffect(function () {
    async function getProfiles() {
      try {
        const response = await urlProfiles.get("/social/profiles");
        setProfiles(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getProfiles();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = profiles.filter((profile) => {
        return profile.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(profiles);
    }
  };

  return (
    <>
      <div className='searchContainer'>
        <input className='search' aria-label='Search' placeholder='Search profile' onChange={(e) => searchItems(e.target.value.trim())} />
      </div>
      <div className='profileListContainer'>
        {searchInput.length > 1
          ? filteredResults.map((profile) => {
              if (profile.name !== auth.name) {
                return (
                  <Link to={`/profile/${profile.name}`} key={UniqueKey(profile.name)}>
                    <div className='profileCard ProfileListCard'>
                      <Banner styles='bannerSmall' media={profile.banner} alt={profile.name} />
                      <Avatar styles={"avatar"} media={profile.avatar} alt={profile.name} />
                      <div>
                        <Heading size={2} title={profile.name} />
                      </div>
                    </div>
                  </Link>
                );
              } else {
                return (
                  <Link to={`/myprofile`} key={UniqueKey(profile.name)}>
                    <div className='profileCard ProfileListCard'>
                      <Banner styles='bannerSmall' media={profile.banner} alt={profile.name} />
                      <Avatar styles={"avatar"} media={profile.avatar} alt={profile.name} />
                      <div>
                        <Heading size={2} title={profile.name} />
                      </div>
                    </div>
                  </Link>
                );
              }
            })
          : profiles.map((profile) => {
              if (profile.name !== auth.name) {
                return (
                  <Link to={`/profile/${profile.name}`} key={UniqueKey(profile.name)}>
                    <div className='profileCard ProfileListCard'>
                      <Banner styles='bannerSmall' media={profile.banner} alt={profile.name} />
                      <Avatar styles={"avatar"} media={profile.avatar} alt={profile.name} />
                      <div>
                        <Heading size={2} title={profile.name} />
                      </div>
                    </div>
                  </Link>
                );
              } else {
                return (
                  <Link to={`/myprofile`} key={UniqueKey(profile.name)}>
                    <div className='profileCard ProfileListCard'>
                      <Banner styles='bannerSmall' media={profile.banner} alt={profile.name} />
                      <Avatar styles={"avatar"} media={profile.avatar} alt={profile.name} />
                      <div>
                        <Heading size={2} title={profile.name} />
                      </div>
                    </div>
                  </Link>
                );
              }
            })}
      </div>
    </>
  );
}
