import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import ProfileMenu from "../components/profiles/ProfileMenu";

export default function ProfilePage() {
  document.title = "PlotTwist | View profile";

  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <Navigate replace to='/' />;
  } else {
    return (
      <div className='profileContainer pageContainer '>
        <ProfileMenu />
      </div>
    );
  }
}
