import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Heading from "../components/common/Heading";
import ProfileList from "../components/profiles/ProfileList";
import BackToTop from "../components/layout/BackToTop";

export default function ProfileListPage() {
  document.title = "PlotTwist | Profiles";

  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <Navigate replace to='/' />;
  } else {
    return (
      <div className='pageContainer'>
        <Heading title='Profiles' styling='feedTitle' />
        <ProfileList />
        <BackToTop />
      </div>
    );
  }
}
