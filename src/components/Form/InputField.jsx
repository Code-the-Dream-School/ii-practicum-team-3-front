import { TextField } from '@mui/material';

const InputField = ({ label, name, value, onChange, type = 'text', required = true }) => {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      fullWidth
      margin="normal"
      value={value || ''}
      onChange={onChange}
      required={required}
      sx={{
        bgcolor: '#D9D9D9',
        '& label.Mui-focused': { color: '#000' },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': { borderColor: '#000' },
        },
      }}
    />
  );
};

export default InputField;
