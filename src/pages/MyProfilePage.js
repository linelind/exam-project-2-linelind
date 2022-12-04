import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import MyProfileMenu from "../components/myprofile/MyProfileMenu";

export default function ProfilePage() {
  document.title = "PlotTwist | My profile";

  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <Navigate replace to='/' />;
  } else {
    return (
      <div className='profileContainer pageContainer '>
        <MyProfileMenu />
      </div>
    );
  }
}
