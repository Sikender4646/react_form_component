import Checkbox from "@material-ui/core/Checkbox";
import React, { FC } from "react";

interface FieldProps {
    name: string
    onChange: (key: string, value: boolean) => void
}

const CheckBox: FC<FieldProps> = ({ name, onChange }) =>
    <div style={{margin: 10}}>
        <label>{name}</label>
        <Checkbox
            onChange={e => onChange(name, e.target.checked)}
            style={{marginLeft: '20%'}}
        />
    </div>

export default CheckBox;