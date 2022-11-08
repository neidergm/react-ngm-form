import { BInput } from "./Elements";
import { I_TimeProps } from "../../interfaces/FormElements.interface";
import './FormsElements.css';
import Select from "./Select";
import { timeGenerator } from "../../utils/TimeAndDateUtilities";

const Time = (
    {
        name,
        id,
        type,
        step = 15,
        tag = "time",
        ...props
    }: I_TimeProps) => {
    if (type === "select") {
        const { min, max, ...props2 } = props;
        return <Select
            tag={"select"} type={"simple"} name={name}
            id={id || name}
            {...props2}
            options={timeGenerator(min, max, step)}
        />
    }

    return (
        <>
            <BInput name={name} id={id || name}  {...props} type={tag} step={step * 60} />
        </>
    )
}

export default Time;
