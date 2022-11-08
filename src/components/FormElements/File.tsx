import { BInput } from "./Elements";
import { I_FileProps } from "../../interfaces/FormElements.interface";
import './FormsElements.css';

const File = (
    {
        name,
        id,
        type = "simple",
        tag = "file",
        accept,
        ...props
    }: I_FileProps) => {
    return (
        <>
            <BInput name={name} id={id || name} accept={accept.join(",")} multiple={type === "multiple"}  {...props} type={tag} />
        </>
    )
}

export default File;
