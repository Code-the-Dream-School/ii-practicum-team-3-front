import { Select, MenuItem, Box } from '@mui/material';

function ExercisesFilters({ bodyPart, setBodyPart, equipment, setEquipment, target, setTarget }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
      <Select value={bodyPart} onChange={(e) => setBodyPart(e.target.value)} displayEmpty>
        <MenuItem value="">Body parts: All</MenuItem>
        <MenuItem value="back">Back</MenuItem>
        <MenuItem value="cardio">Cardio</MenuItem>
        <MenuItem value="chest">Chest</MenuItem>
        <MenuItem value="lower arms">Lower Arms</MenuItem>
        <MenuItem value="lower legs">Lower Legs</MenuItem>
        <MenuItem value="neck">Neck</MenuItem>
        <MenuItem value="shoulders">Shoulders</MenuItem>
        <MenuItem value="upper arms">Upper Arms</MenuItem>
        <MenuItem value="upper legs">Upper Legs</MenuItem>
        <MenuItem value="waist">Waist</MenuItem>
      </Select>

      <Select value={equipment} onChange={(e) => setEquipment(e.target.value)} displayEmpty>
        <MenuItem value="">Equipment: All</MenuItem>
        <MenuItem value="assisted">Assisted</MenuItem>
        <MenuItem value="band">Band</MenuItem>
        <MenuItem value="barbell">Barbell</MenuItem>
        <MenuItem value="bosu ball">Bosu Ball</MenuItem>
        <MenuItem value="body weight">Body Weight</MenuItem>
        <MenuItem value="cable">Cable</MenuItem>
        <MenuItem value="dumbbell">Dumbbell</MenuItem>
        <MenuItem value="elliptical machine">Elliptical Machine</MenuItem>
        <MenuItem value="ez barbell">EZ Barbell</MenuItem>
        <MenuItem value="hammer">Hammer</MenuItem>
        <MenuItem value="kettlebell">Kettlebell</MenuItem>
        <MenuItem value="leverage machine">Leverage Machine</MenuItem>
        <MenuItem value="medicine ball">Medicine Ball</MenuItem>
        <MenuItem value="olympic barbell">Olympic Barbell</MenuItem>
        <MenuItem value="resistance band">Resistance Band</MenuItem>
        <MenuItem value="roller">Roller</MenuItem>
        <MenuItem value="rope">Rope</MenuItem>
        <MenuItem value="sled machine">Sled Machine</MenuItem>
        <MenuItem value="smith machine">Smith Machine</MenuItem>
        <MenuItem value="skierg machine">Skierg Machine</MenuItem>
        <MenuItem value="stability ball">Stability Ball</MenuItem>
        <MenuItem value="stepmill machine">Stepmill Machine</MenuItem>
        <MenuItem value="stationary bike">Stationary Bike</MenuItem>
        <MenuItem value="tire">Tire</MenuItem>
        <MenuItem value="trap bar">Trap Bar</MenuItem>
        <MenuItem value="upper body ergometer">Upper Body Ergometer</MenuItem>
        <MenuItem value="weighted">Weighted</MenuItem>
        <MenuItem value="wheel roller">Wheel Roller</MenuItem>
      </Select>

      <Select value={target} onChange={(e) => setTarget(e.target.value)} displayEmpty>
        <MenuItem value="">Target: All</MenuItem>
        <MenuItem value="abs">Abs</MenuItem>
        <MenuItem value="abductors">Abductors</MenuItem>
        <MenuItem value="adductors">Adductors</MenuItem>
        <MenuItem value="biceps">Biceps</MenuItem>
        <MenuItem value="calves">Calves</MenuItem>
        <MenuItem value="cardiovascular system">Cardiovascular System</MenuItem>
        <MenuItem value="delts">Delts</MenuItem>
        <MenuItem value="forearms">Forearms</MenuItem>
        <MenuItem value="glutes">Glutes</MenuItem>
        <MenuItem value="hamstrings">Hamstrings</MenuItem>
        <MenuItem value="lats">Lats</MenuItem>
        <MenuItem value="levator scapulae">Levator Scapulae</MenuItem>
        <MenuItem value="pectorals">Pectorals</MenuItem>
        <MenuItem value="quads">Quads</MenuItem>
        <MenuItem value="serratus anterior">Serratus Anterior</MenuItem>
        <MenuItem value="spine">Spine</MenuItem>
        <MenuItem value="traps">Traps</MenuItem>
        <MenuItem value="triceps">Triceps</MenuItem>
        <MenuItem value="upper back">Upper Back</MenuItem>
      </Select>
    </Box>
  );
}

export default ExercisesFilters;
