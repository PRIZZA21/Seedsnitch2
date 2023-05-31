import React from "react";
import { Route, Routes } from "react-router-dom";

// Admin Panel Applications
import ApplicationScreen from "./Admin_Panel/screens/ApplicationScreen";
import IncubatorScreen from "./Admin_Panel/screens/IncubatorScreen";
import EcellScreen from "./Admin_Panel/screens/EcellScreen";
import BlogScreen from "./Admin_Panel/screens/BlogScreen";
import AddBlog from "./Admin_Panel/screens/AddBlog";
import AddEcell from "./Admin_Panel/screens/AddEcell";
import AddIncubator from "./Admin_Panel/screens/AddIncubator";
import UpdateBlog from "./Admin_Panel/screens/UpdateBlog";
import UpdateEcell from "./Admin_Panel/screens/UpdateEcell";

// Incubator Panel components
import IncubatorApplicationsScreen from "./Incubator_Panel/screens/IncubatorApplicationsScreen";

// General User Panel Components

import Home from "./General_User_Panel/screens/Home";
import FAQ from "./General_User_Panel/screens/FAQ";
import Contact from "./General_User_Panel/screens/Contact";
import About from "./General_User_Panel/screens/About";
import Community from "./General_User_Panel/screens/Community";
import BlogPage from "./General_User_Panel/screens/BlogPage";
import BlogDetails from "./General_User_Panel/screens/BlogDetails";
import Login from "./General_User_Panel/screens/Login";
import Register from "./General_User_Panel/screens/Register";
import Apply from "./General_User_Panel/screens/Apply";
import Ambassador from "./General_User_Panel/screens/Ambassador";
import ProfileScreen from "./General_User_Panel/screens/ProfileScreen";
import TechSupport from "./General_User_Panel/screens/TechSupport";
import PostCreate from "./General_User_Panel/screens/PostCreate";

import ApplicationDetails from "./General_User_Panel/screens/Application";
import UserApplicationScreen from "./General_User_Panel/screens/UserApplicationsScreen";
import UserPostsScreen from "./General_User_Panel/screens/UserPostsScreen";
import UserReplyScreen from "./General_User_Panel/screens/UserReplyScreen";
import ComingSoon from "./General_User_Panel/screens/ComingSoon";
import AdminLayout from "./AdminLayout";
// import AdminPanel from "./Admin_Panel/AdminPanel";
import GeneralUserLayout from "./General_User_Panel/GeneralUserLayout";
import PageNotFound from "./General_User_Panel/screens/PageNotFound";

const App = () => {
  return (
    <>
      
      <Routes>
         

        <Route path='/' element={<GeneralUserLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="community" element={<Community />} />
          <Route path="blogs/page/:pageNumber" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="incubator" element={<IncubatorApplicationsScreen />} />
          <Route path="incubator/page/:pageNumber" element={<IncubatorApplicationsScreen />} />
          <Route path="register" element={<Register />} />
          <Route path="apply" element={<Apply />} />
          <Route path="ambassador" element={<Ambassador />} />
          <Route path="user/profile" element={<ProfileScreen />} />
          <Route path="users/applications/page/:pageNumber" element={<UserApplicationScreen />}/>
          <Route path="users/posts/page/:pageNumber" element={<UserPostsScreen />}/>
          <Route path="users/post/:postid" element={<UserReplyScreen />} />
          <Route path="tech-support/page/:pageNumber" element={<TechSupport />}/>
          <Route path="discussion-forum" element={<TechSupport />} />
          <Route path="create-post" element={<PostCreate />} />
          <Route path="application/:id" element={<ApplicationDetails />} />
          <Route path="pitch-deck" element={<ComingSoon />} />
          <Route path="company-reg" element={<ComingSoon />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

          <Route path='/admin' element={<AdminLayout />}>
            <Route path="applications/page/:pageNumber" element={<ApplicationScreen />}/>
            <Route path="incubators/page/:pageNumber" element={<IncubatorScreen />}/>
            <Route path="ecells/page/:pageNumber" element={<EcellScreen />}/>
            <Route path="blogs/page/:pageNumber" element={<BlogScreen />} />
            <Route path="applications" element={<ApplicationScreen />}/>
            <Route path="incubators" element={<IncubatorScreen />}/>
            <Route path="ecells" element={<EcellScreen />}/>
            <Route path="blogs" element={<BlogScreen />} />
            <Route path="add-blog" element={<AddBlog />} />
            <Route path="add-ecell" element={<AddEcell />} />
            <Route path="add-incubator" element={<AddIncubator />} />
            <Route path="ecells/:id" element={<UpdateEcell />} />
            <Route path="blogs/:id" element={<UpdateBlog />} />
          </Route>
      </Routes>



    </>
  );
};

export default App;
