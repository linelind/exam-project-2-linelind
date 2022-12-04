import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Heading from "../components/common/Heading";
import CreatePost from "../components/posts/CreatePost";
import PostList from "../components/posts/PostList";
import BackToTop from "../components/layout/BackToTop";

export default function FeedPage() {
  document.title = "PlotTwist | Feed";

  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <Navigate replace to='/' />;
  } else {
    return (
      <div className='pageContainer'>
        <Heading title={`How's it going` + " " + auth.name + `?`} styling='feedTitle' />
        <CreatePost />
        <PostList />
        <BackToTop />
      </div>
    );
  }
}
