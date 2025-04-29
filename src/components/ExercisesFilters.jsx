import { Select, MenuItem, Box } from '@mui/material';

import { bodyParts, equipments, targets } from '../constants/filtersData';

function ExercisesFilters({ bodyPart, setBodyPart, equipment, setEquipment, target, setTarget }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
      <Select value={bodyPart} onChange={(e) => setBodyPart(e.target.value)} displayEmpty>
        {bodyParts.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      <Select value={equipment} onChange={(e) => setEquipment(e.target.value)} displayEmpty>
        {equipments.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      <Select value={target} onChange={(e) => setTarget(e.target.value)} displayEmpty>
        {targets.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default ExercisesFilters;
