import { Routes, Route, BrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";

// Pages - Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ChangePassword from "../pages/auth/ChangePassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Pages - Workouts
import Exercises from "../pages/Exercises";
import Programs from "../pages/Programs";
import WorkoutPlan from "../pages/workouts/WorkoutPlan";
import CustomWorkoutPlan from "../pages/workouts/CustomWorkoutPlan";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    {/* Auth Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/password/change" element={<ChangePassword />} />
                    <Route path="/password/reset" element={<ResetPassword />} />
                    {/* Workouts Routes  */}
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/programs" element={<Programs />} />
                    <Route path="/workouts/plan/:id" element={<WorkoutPlan />} />
                    <Route path="/workouts/custom-plan/:id" element={<CustomWorkoutPlan />} />
                    {/* 404 Page */}
                    <Route path="*" element={<NotFound />} />
                    <Route path="/404" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router