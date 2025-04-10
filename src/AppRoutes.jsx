import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Frontend/Home/Home";
import About from "./pages/Frontend/About/About";
import Certificates from "./pages/Frontend/Certificates/Certificates";
import Contacts from "./pages/Frontend/Contacts/Contacts";
import Projects from "./pages/Frontend/Projects/Projects";
import Skills from "./pages/Frontend/Skills/Skills";
import Authentication from "./pages/Auth/Authentication";
import Notfound from "./components/NotFound/Notfound";
import Dashboard from "./pages/Backend/Dashboard/Dashboard";
import DashboardAbout from "./pages/Backend/About/About";
import DashboardCertificates from "./pages/Backend/Certificates/Certificates";
import DashboardContacts from "./pages/Backend/Contacts/Contacts";
import DashboardProjects from "./pages/Backend/Projects/Projects";
import DashboardSkills from "./pages/Backend/Skills/Skills";
import PrivateRoutes from "./pages/Auth/PrivateRoutes";
import { AuthProvider } from "./pages/Auth/AuthContext";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Authentication />} />
          {/* Public Routes */}
          <Route path="/" element={<Home />}>
            <Route path="about" element={<About />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="projects" element={<Projects />} />
            <Route path="skills" element={<Skills />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard/*" element={<Dashboard />}>
              <Route path="about" element={<DashboardAbout />} />
              <Route path="certificates" element={<DashboardCertificates />} />
              <Route path="contacts" element={<DashboardContacts />} />
              <Route path="projects" element={<DashboardProjects />} />
              <Route path="skills" element={<DashboardSkills />} />
            </Route>
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<Notfound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
