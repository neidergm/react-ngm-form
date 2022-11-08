import { I_InputPropsInForm, I_TelProps } from "../../interfaces/FormElements.interface";
import PhoneInput from 'react-phone-input-2'

import './FormsElements.css';
import './Tel.flags.css';
import { Controller, Control } from 'react-hook-form';

const Tel = (
    {
        control,
        placeholder,
        name,
        id,
        type,
        telComponentProps = {
            regions: ['america', 'eu-union']
        },
        tag = "tel",
        invalid,
        ...props
    }: I_TelProps & I_InputPropsInForm & { control: Control }) => {

    return <Controller
        control={control}
        name={name}
        render={
            ({ field: { onChange, onBlur, value, ...field }, ...rest }) => {
                return <PhoneInput
                    country={'co'}
                    inputProps={{
                        ...props,
                        // ...ele.props, 
                        ...field
                    }}
                    disableDropdown={type === "local"}
                    placeholder={placeholder}
                    value={value}
                    countryCodeEditable={false}
                    {...telComponentProps}
                    onChange={onChange}
                    onBlur={onBlur}
                    // buttonStyle={{ backgroundColor: "transparent", "border": "inherit" }}
                    // containerStyle={{backgroundColor: "red", padding: "5px"}}
                    // buttonClass={ele.props.className}
                    inputClass={invalid ? "is-invalid" : ""}
                />
            }}
    />

    // return (<BInput name={name} id={id || name} {...props} type={tag} placeholder={placeholder} />)
}

export default Tel;


