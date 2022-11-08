import { Button } from 'reactstrap';
import Form from '../../components/FormElements/Form'
import {
    T_CheckboxListWithValidationsProps,
    T_CheckboxWithValidationsProps,
    T_DateWithValidationsProps,
    T_FileWithValidationsProps,
    T_InputWithValidationsProps,
    T_RadioWithValidationsProps,
    T_SelectWithValidationsProps,
    T_TelWithValidationsProps,
    T_TimeWithValidationsProps
} from '../../interfaces/FormElements.interface'

const submitBtn = <div><Button>Submit</Button></div>;
const onSubmit = (data: any) => console.log(data)

export const InputComponent = (props: T_InputWithValidationsProps) => <Form onSubmit={onSubmit} fields={[props]} defaultValues={{}} children={submitBtn} />

export const SelectComponent = (props: T_SelectWithValidationsProps) => <Form onSubmit={onSubmit} fields={[props]} defaultValues={{}} children={submitBtn} />

export const CheckboxComponent = (props: T_CheckboxWithValidationsProps) => <Form onSubmit={onSubmit} fields={[props]} defaultValues={{}} children={submitBtn} />

export const CheckboxListComponent = (props: T_CheckboxListWithValidationsProps) => <Form onSubmit={onSubmit} fields={[props]} defaultValues={{ [props.name]: props.defaultValue }} children={submitBtn} />

export const RadioComponent = (props: T_RadioWithValidationsProps) => <Form onSubmit={onSubmit} fields={[props]} defaultValues={{ [props.name]: props.defaultValue }} children={submitBtn} />

export const FileComponent = (props: T_FileWithValidationsProps) => <Form onSubmit={onSubmit} fields={[props]} defaultValues={{ [props.name]: props.defaultValue }} children={submitBtn} />

export const DateComponent = (props: T_DateWithValidationsProps) => <Form onSubmit={onSubmit} fields={[props]} defaultValues={{ [props.name]: props.defaultValue }} children={submitBtn} />

export const TimeComponent = (props: T_TimeWithValidationsProps) => <Form onSubmit={onSubmit} fields={[props]} defaultValues={{ [props.name]: props.defaultValue }} children={submitBtn} />

export const TelComponent = (props: T_TelWithValidationsProps) => <Form onSubmit={onSubmit} fields={[props]} defaultValues={{ [props.name]: props.defaultValue }} children={submitBtn} />

