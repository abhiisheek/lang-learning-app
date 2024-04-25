import React, { Suspense, useMemo, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import Home from "./views/Home";
import MyCourses from "./views/MyCourses";
import MyReports from "./views/MyReports";
import Courses from "./views/Courses";
import Course from "./views/Course";
import ErrorBoundary from "./components/ErrorBoundary";

import { UserContext } from "./context/UserContext";

import constants from "./constants/constants";

import "./App.css";

const App = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(constants.USER_DETAILS_CONTEXT);

  const userDetails = useMemo(() => {
    const lsData = sessionStorage.getItem(
      constants.SESSIONSTORAGE_KEYS.USERDETAILS
    );
    let data = userInfo;

    if (lsData) {
      const userData = JSON.parse(lsData);

      data = {
        name: userData.name,
        email: userData.email,
        shortId: `${userData.name[0]}${
          userData.name[userData.name.length - 1]
        }`,
      };
    }

    return { ...data, setUserInfo };
  }, [userInfo]);

  return (
    <div className="App">
      <ErrorBoundary location={{ location }}>
        <UserContext.Provider value={userDetails}>
          <Home>
            <Suspense fallback={"Loading..."}>
              <Routes>
                <Route path="/my-courses" element={<MyCourses />} />
                <Route path="/my-reports" element={<MyReports />} />
                <Route path="/course/:courseId" exact element={<Course />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="*" element={<Navigate to="/courses" replace />} />
              </Routes>
            </Suspense>
          </Home>
        </UserContext.Provider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
