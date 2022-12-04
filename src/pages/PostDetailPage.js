import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Heading from "../components/common/Heading";
import PostDetail from "../components/posts/PostDetail";
import BreadcrumbNav from "../components/layout/BreadcrumbNav";

export default function PostDetailPage() {
  document.title = "PlotTwist | View post";

  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <Navigate replace to='/' />;
  } else {
    return (
      <div className='pageContainer'>
        <BreadcrumbNav path='/feed' title='Feed' current='View post' />
        <Heading title='View post' styling='postDetailTitle' />
        <PostDetail />
      </div>
    );
  }
}
