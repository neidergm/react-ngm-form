import { Children, createElement, useEffect } from "react";
import { useFieldArray, Controller, Control } from "react-hook-form";
import { T_OptionsOfInput } from "../../interfaces/FormElements.interface";

interface I_Props {
    control: Control;
    name: string;
    children: JSX.Element | JSX.Element[];
    className?: string;
    options?: T_OptionsOfInput;
}

const ArrayElementsWrapper = ({
    name,
    control,
    className,
    children
}: I_Props) => {
    const {
        fields,
        append,
        prepend,
        remove,
        swap,
        move,
        insert,
        replace
    } = useFieldArray({
        control,
        name,
        rules: {
            minLength: 2,
            required: true,
            validate: (a) => {
                console.log(a);
                return "hola"
            }
        }
    });

    useEffect(() => {

    }, [])

    return (
        <div className={className}>
            {/* {
                [
                    { label: "Option 1", value: "op1" },
                    { label: "Option 2", value: "op2" },
                ].map((field, index) => {
                    return Children.map(children, child => {
                        console.log({ children, child, field });
                        return <Controller
                            control={control}
                            defaultValue={field.value}
                            // defaultValue={field.value}
                            name={`${name}.${index}` as const}
                            render={({ field }) => createElement(child.type, {
                                ...{
                                    ...child.props,
                                    ...field,
                                    key: child.props.name
                                }
                            })}
                        />
                    })
                })
            } */}
            {/* {Children.map(children, child => {
                console.log({ children, child })
                return <Controller
                    name={`${name}`}
                    render={() => createElement(child.type, {
                        ...{
                            ...child.props,
                            key: child.props.name
                        }
                    })}
                />
            })} */}
        </div>
    )
}

export default ArrayElementsWrapper;
