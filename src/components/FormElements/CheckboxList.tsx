import { I_CheckboxListProps, T_OptionsOfInput } from "../../interfaces/FormElements.interface";
import './FormsElements.css';
import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

const CheckboxList = ({
    options,
    ...props
}: I_CheckboxListProps ) => {

    const [_options, setOptions] = useState<T_OptionsOfInput | null>(null);

    useEffect(() => {
        if (!!(options?.length)) {
            setOptions(
                [...options.map(o => typeof o === "string" ? ({ label: o, value: o }) : o)]
            )
        }
    }, [options])

    if (!(_options)) {
        return <div>Cargando...</div>
    }
    return <div>
        {_options.map((o, i) =>
            <Checkbox key={i} label={o.label} id={`${props.name}-id${i}`} {...props} value={o.value} />
        )}
    </div>
}

export default CheckboxList;