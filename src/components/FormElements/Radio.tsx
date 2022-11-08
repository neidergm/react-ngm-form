import { BInput, Label, FormGroup } from "./Elements";
import { I_RadioProps, T_OptionsOfInput } from "../../interfaces/FormElements.interface";
import { useEffect, useState } from "react";

const Radio = ({
    name,
    id,
    options,
    className,
    style,
    ...props
}: I_RadioProps
) => {

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
            <FormGroup check key={i} style={style} className={className}>
                <BInput {...props} value={o.value} name={name} id={`${id || name}-${i}`} />
                <Label check for={`${id || name}-${i}`} >{o.label}</Label>
            </FormGroup>
        )
        }
    </div>
}

export default Radio;
