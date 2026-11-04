import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SyllabusList from "./components/SyllabusList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Route cho Function 2 */}
      <Route path="/syllabus" element={<SyllabusList />} />

      {/* Dành cho Function 3 Detail nếu cần */}
      <Route
        path="/subject/:id"
        element={<div>Subject Detail Page Placeholder</div>}
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

/* Function 1: Login Page (/login) Handles user authentication and role-based access control.
    The  root path(/) and any invalid paths must automatically redirected to /login
    Login Form:
        Display a centered "Sign In" card interface featuring input fields for Email(placeholder:"email of student or lecture") and password(placeholder:"Enter password")
        Include a Login button to execute the authentication process.
    Authentication & Authorization Rules:
        Validate user credentials against the account table in the mock API.
        Support both user roles: Student and Lecturer.
        Upon successful login, save the user session data into localStorage annd redirect the user to the syllabus management page(/syllabus).
        Account status restriction: If an account's status is Inactive, access is strictly denied, and an error message reading 'Tài khoản bị khóa' must be shown.
    Function2: Syllabus List Page( /syllabus)
    Navigation bar & Header:
        Display the top navigation bar containing the portle title "FPT education Learning Materials Portal".
        Display a welcoome message along with the full name and role of the logged-in user  along side a Logout button
    Search & Filter:
        Provide a search dropdown (Search by: Code or Name) enabling users to filter subjects by code (code) or name (name).
        Include a keyword input field and a Search button to execute queries.
    Subject Table & Navigation:
        Dislay a comprehensive table containing: Code, Name, Curriculum, Semester, Credits, Pre-requisites, and Description
        Navigation Rule: Clicking on the Code of any subject redirects the user tp the corresponding subject detail page at /subject/:id
        */
