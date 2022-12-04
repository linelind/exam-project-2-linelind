import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeedPage from "./pages/FeedPage";
import ProfileListPage from "./pages/ProfileListPage";
import PostDetailPage from "./pages/PostDetailPage";
import EditPost from "./components/posts/EditPost";
import ProfilePage from "./pages/ProfilePage";
import MyProfilePage from "./pages/MyProfilePage";
import EditMyProfile from "./components/myprofile/EditMyProfile";
import { AuthProvider } from "./context/AuthContext";
import "./sass/style.scss";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='contentWrapper'>
          <NavBar />
          <Routes>
            <Route path='/' exact element={<LoginPage />} />
            <Route path='/register' exact element={<RegisterPage />} />
            <Route path='/feed' exact element={<FeedPage />} />
            <Route path='/profiles' exact element={<ProfileListPage />} />
            <Route path='/post/:id' element={<PostDetailPage />} />
            <Route path='/post/edit/:id' element={<EditPost />} />
            <Route path='/profile/:name' element={<ProfilePage />} />
            <Route path='/myprofile' exact element={<MyProfilePage />} />
            <Route path='/myprofile/edit/:name' element={<EditMyProfile />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
