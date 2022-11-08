import { BInput } from "./Elements";
import { I_DateProps } from "../../interfaces/FormElements.interface";
import './FormsElements.css';

const Date = (
    {
        name,
        id,
        type = "date",
        tag = "date",
        ...props
    }: I_DateProps) => {

    return (
        <>
            <BInput name={name} id={id || name} {...props} type={type} />
        </>
    )
}

export default Date;
