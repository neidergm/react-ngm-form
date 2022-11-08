import { useState } from 'react'
import { InputType } from 'reactstrap/types/lib/Input';

export const usePasswordToggler = (type: InputType) => {
    const [inputType, setInputType] = useState(type);

    const passwordToggler = () => {
        setInputType(inputType === type ? "text" : type);
    }

    return {
        inputType,
        passwordToggler
    }
}
