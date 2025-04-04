// import WorkoutPlan from "./WorkoutPlan";
import { Link } from "react-router-dom";



function Workouts() {
  return (
    <>
      <h1>Welcome to the Workouts Page!</h1>
      <button>
        <Link to="/workouts/create">Create Custom Workout Plan</Link>
      </button>
      <h3>Workouts Plans:</h3>
      <ul>
        <li>
          <Link to="/workouts/:id">Workout Plan</Link>
        </li>
      </ul>
    </>
  )
}

export default Workouts;