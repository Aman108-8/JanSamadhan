import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import AuthPage from './Component/Citizen/AuthPage'
import Home from './Component/Citizen/Home'
import RProblem from './Component/Citizen/RProblem'
import Mproblem from './Component/Citizen/Mproblem'
import Uploading from './Component/Citizen/Uploading'
import ExploreProblem from './Component/Citizen/ExploreProblem'
import Dashboard from './Component/Government/Dashboard'
import GovernmentRProblem from './Component/Government/RProblem'
import SMatching from './Component/Government/SMatching'
import IndustryAuthForm from './Component/Indestry/IndustryAuthForm'
import IndustryRegistration from './Component/Indestry/IndustryRegistration'
import IndustryDashboard from './Component/Indestry/IndustryDashboard'
import Explore from './Component/Indestry/Explore'
import MyProject from './Component/Indestry/MyProject'
import UpdateProject from './Component/Indestry/UpdateProject'
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Account Selection */}
        <Route
          path="/login"
          element={<AuthPage isLogin={true} />}
        />

        <Route
          path="/signup"
          element={<AuthPage isLogin={false} />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/report-problem"
          element={<RProblem />}
        />

        <Route
          path="/my-problems"
          element={<Mproblem />}
        />

        <Route
          path="/explore-problems"
          element={<ExploreProblem />}
        />

        <Route path="/report-problem/:problemId/upload" element={<Uploading />} />

        {/* Government */}
        <Route
          path="/government"
          element={<Navigate to="/government/dashboard" replace />}
        />

        <Route
          path="/government/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/government/reported-problems"
          element={<GovernmentRProblem />}
        />

        <Route
          path="/government/solver-matching"
          element={<SMatching />}
        />


        {/* Industry */}
        <Route
          path="/Industry"
          element={<Navigate to="/Industry/login" replace />}
        />
        
        <Route
          path="/Industry/login"
          element={<IndustryAuthForm />}
        />

        <Route
          path="/Industry/Register"
          element={<IndustryRegistration />}
        />

        <Route
          path="/industry/dashboard"
          element={<IndustryDashboard />}
        />

        <Route
          path="/industry/explore"
          element={<Explore />}
        />

        <Route
          path="/industry/my-projects"
          element={<MyProject />}
        />

        <Route
          path="/industry/projects/:projectId/update"
          element={<UpdateProject />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App