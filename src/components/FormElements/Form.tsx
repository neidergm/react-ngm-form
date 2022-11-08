import { ReactElement, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

import Input from './Input';
import { mapSchemaAndValues, T_FieldsTypes } from '../../utils/FormYupSchemaBuilder';
import Select from './Select';
import ElementWrapper from './ElementWrapper';
import Checkbox from './Checkbox';
import CheckboxList from './CheckboxList';
import Radio from './Radio';
import File from './File';
import Date from './Date';
import Time from './Time';
import Tel from './Tel';

interface I_Props {
    fields: Array<T_FieldsTypes>,
    defaultValues: { [key: string]: any },
    children?: ReactElement | ReactElement[],
    onSubmit: (data: any) => void,
}

const objectSchema = Yup.object({});

const Form = (props: I_Props) => {

    const { fields, defaultValues, children, onSubmit } = props;

    const schema = useRef(mapSchemaAndValues(fields, defaultValues));

    const {
        handleSubmit,
        register,
        formState: {
            errors
        },
        control
    } = useForm<any>({
        defaultValues: schema.current.defaultValues || {},
        resolver: yupResolver(objectSchema.shape(schema.current.schemas)),
        mode: 'onSubmit'
    })

    const registerInput = (name: string, validations: { [x: string]: any }) => {
        let { ref, ...registerData } = register(name, validations);
        return {
            innerRef: ref,
            ...registerData
        }
    }

    const inputPrinter = (input: any) => {
        const {
            customValidationsMessages,
            validations,
            tag,
            label,
            defaultValue,
            value,
            ...i
        } = input;

        let feedback: any = undefined;

        if (errors.hasOwnProperty(i.name)) {
            i.invalid = true;
            feedback = errors[i.name]?.message as string;
        }

        if (tag === "select") {
            return <ElementWrapper name={i.name} label={label} key={i.name} feedback={feedback}>
                <Select tag={tag} {...i} {...registerInput(i.name, validations)} />
            </ElementWrapper>
        } else if (tag === "checkbox") {
            if (i.type === "simple") {
                return <ElementWrapper name={i.name} label={null} key={i.name} feedback={feedback} >
                    <Checkbox label={label} tag={tag} {...i} {...registerInput(i.name, validations)} />
                </ElementWrapper>
            } else {
                return <ElementWrapper name={i.name} label={label} key={`${i.name}-${i.type}`} feedback={feedback}>
                    <CheckboxList tag={tag} {...i} {...registerInput(i.name, validations)} />
                </ElementWrapper>
            }
        } else if (i.type === "radio") {
            return <ElementWrapper name={i.name} label={label} key={i.name} feedback={feedback}>
                <Radio {...i} {...registerInput(i.name, validations)} />
            </ElementWrapper>
        } else if (tag === "file") {
            return <ElementWrapper name={i.name} label={label} key={i.name} feedback={feedback}>
                <File {...i} tag={tag} {...registerInput(i.name, validations)} />
            </ElementWrapper>
        } else if (tag === "date") {
            return <ElementWrapper name={i.name} label={label} key={i.name} feedback={feedback}>
                <Date {...i} tag={tag} {...registerInput(i.name, validations)} />
            </ElementWrapper>
        } else if (tag === "time") {
            return <ElementWrapper name={i.name} label={label} key={i.name} feedback={feedback}>
                <Time {...i} tag={tag} {...registerInput(i.name, validations)} />
            </ElementWrapper>
        } else if (tag === "tel") {
            // let dat = i.type === "local" ? registerInput(i.name, validations) : { control };
            return <ElementWrapper name={i.name} label={label} key={i.name} feedback={feedback}>
                <Tel {...i} tag={tag} control={control} />
            </ElementWrapper>
        }

        return <ElementWrapper name={i.name} label={label} key={i.name} feedback={feedback}>
            <Input {...i} {...registerInput(i.name, validations)} />
        </ElementWrapper>
    }

    const submitAll = (data: any) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {fields.map((f) => inputPrinter(f))}
            {children}
        </form>
    )
}

export default Form;
