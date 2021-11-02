import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import React, { FC } from "react";

interface InputProps {
    name: string
    type: string
    value: string
    required?: boolean
    options?: string[]
    onChange: (key: string, value: string) => void
}

const Input: FC<InputProps> = ({ name, type, value, options = [], required = false, onChange }) => {
    return (
        <div style={{
            margin: '10px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <div style={{ flex: 1 }}>
                <label> {name}</label>
                <label style={{ color: 'red' }}> {required ? '*' : ''}</label>
            </div>

            <TextField variant="outlined"
                type={type}
                value={value}
                required={required}
                label={options.length > 0 && name}
                style={{ width: '60%' }}
                select={options.length > 0}
                onChange={e => onChange(name, e.target.value)}
                size={'small'}>
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </div >
    );
};

export default Input;