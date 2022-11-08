import { useEffect, useState } from "react";
import { BInput } from "./Elements";
import { T_OptionsOfInput, I_SelectProps } from "../../interfaces/FormElements.interface";
import './FormsElements.css';

const Select = ({
    name,
    options,
    placeholder="Seleccione...",
    type="simple",
    tag="select",
    ...props
}: I_SelectProps) => {

    const [_options, setOptions] = useState<T_OptionsOfInput | null>(null);

    useEffect(() => {
        if (!!(options?.length)) {
            setOptions(
                [...options.map(o => typeof o === "string" ? ({ label: o, value: o }) : o)]
            )
        }
    }, [options])

    return (
        <div className={[`select-input ${!(options) ? "loading" : ""}`].join(" ")}>
            <BInput name={name} id={name} type={tag} {...props} multiple={type === "multiple"}>
                {!!(_options) && <>
                    {<option value="" disabled={type === "multiple"}>{placeholder}</option>}
                    {_options.map((op, key) => <option key={key} value={op.value}>{op.label}</option>)}
                </>
                }
            </BInput>
        </div>
    )
}

export default Select;
