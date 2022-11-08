import React from "react";
import { BInput, Label, FormGroup } from "./Elements";
import { I_CheckboxProps } from "../../interfaces/FormElements.interface";
import './FormsElements.css';

const Checkbox = ({
    name,
    label,
    tag = "checkbox",
    id,
    className,
    style,
    ...props
}: I_CheckboxProps
) => {
    return <FormGroup check className={className} style={style}>
        <BInput {...props} type={tag} name={name} id={id || name} />
        <Label
            check
            for={id || name}
        >
            {label}
        </Label>
    </FormGroup>
}

export default Checkbox;