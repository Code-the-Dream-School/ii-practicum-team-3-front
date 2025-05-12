import { Routes, Route, BrowserRouter } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';

// Pages - Auth
import ForgotPassword from '../pages/auth/ForgotPassword';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ResetPassword from '../pages/auth/ResetPassword';

// Pages
import Exercises from '../pages/Exercises';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import AboutPage from '../pages/About';

// Pages - Workouts
import CreateCustomWorkout from '../pages/workouts/CreateCustomWorkout';
import Workout from '../pages/workouts/Workout';
import Workouts from '../pages/workouts/Workouts';
import CustomWorkout from '../pages/workouts/CustomWorkout';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/exercises" element={<Exercises />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Workouts Routes */}
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/custom-workout/:id" element={<CustomWorkout />} /> 
          <Route path="/workouts/:id" element={<Workout />} />
          <Route path="/workouts/create" element={<CreateCustomWorkout />} />
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
