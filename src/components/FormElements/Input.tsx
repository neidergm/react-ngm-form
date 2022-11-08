import { BInput } from "./Elements";
import { usePasswordToggler } from "../../hooks/usePasswordToggler";
import { I_InputProps } from "../../interfaces/FormElements.interface";
import EyeIcon from "../Icons/Eye";
import EyeSlashIcon from "../Icons/EyeSlash";
import './FormsElements.css';

const Input = ({ name, type = "text", id, ...props }: I_InputProps) => {

    const { inputType, passwordToggler } = usePasswordToggler(type)

    return (
        <div className={[type === "password" ? "password-input" : ""].join(" ")}>
            <BInput name={name} id={id || name} {...props} type={inputType} />
            {type === "password" &&
                <span onClick={passwordToggler}>
                    {inputType === "password" ? <EyeIcon /> : <EyeSlashIcon />}
                </span>
            }
        </div>
    )
}

export default Input;
