import { Routes, Route, BrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
// Layouts
import MainLayout from '../layouts/MainLayout';
// Pages
import AboutPage from '../pages/About';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ResetPassword from '../pages/auth/ResetPassword';
import Exercises from '../pages/Exercises';
import FavoriteExercises from '../pages/FavoriteExercises';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
// Pages - Workouts
import CreateCustomWorkout from '../pages/workouts/CreateCustomWorkout';
import CustomWorkout from '../pages/workouts/CustomWorkout'; 
import FavoriteWorkouts from '../pages/workouts/FavoriteWorkouts';
import Workout from '../pages/workouts/Workout';
import Workouts from '../pages/workouts/Workouts';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/exercises"
            element={
              <PrivateRoute>
                <Exercises />
              </PrivateRoute>
            }
          />
          <Route
            path="/exercises/favorites"
            element={
              <PrivateRoute>
                <FavoriteExercises />
              </PrivateRoute>
            }
          />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Workouts Routes */}
          <Route
            path="/workouts"
            element={
              <PrivateRoute>
                <Workouts />
              </PrivateRoute>
            }
          />
          <Route
            path="/workouts/favorites"
            element={
              <PrivateRoute>
                <FavoriteWorkouts />
              </PrivateRoute>
            }
          />
          <Route
            path="/custom-workout/:id"
            element={
              <PrivateRoute>
                <CustomWorkout />
              </PrivateRoute>
            }
          /> 
          <Route
            path="/workouts/:id"
            element={
              <PrivateRoute>
                <Workout />
              </PrivateRoute>
            }
          />
          <Route
            path="/workouts/create"
            element={
              <PrivateRoute>
                <CreateCustomWorkout />
              </PrivateRoute>
            }
          />
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
