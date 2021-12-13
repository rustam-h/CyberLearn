import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

export default function PasswordField({onChange, fieldSize, confirm}){
    const [showPassword, setShowPassword] = useState(false);
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <TextField
            size={fieldSize}
            margin={(fieldSize === "small") ? "none" : "normal"}
            variant="outlined"
            required
            fullWidth
            name="password"
            label={confirm ? "Təsdiq edin" : "Parol"}
            type={showPassword ? "text" : "password"}
            id="password"
            onChange = {onChange}
            InputProps = {{
            endAdornment: (
                <InputAdornment position="end">
                <IconButton
                    onClick={handleClickShowPassword}
                >
                    {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small"/>}
                </IconButton>
                </InputAdornment>
            )
            }}
        />
    )
}