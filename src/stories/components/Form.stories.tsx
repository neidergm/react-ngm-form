import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "reactstrap";
import FormComponent from "../../components/FormElements/Form";

export default {
    title: "Form",
    component: FormComponent,
    argTypes: {}
} as ComponentMeta<typeof FormComponent>;

const Template: ComponentStory<typeof FormComponent> = (args) => <FormComponent {...args} onSubmit={(data: any) => console.log({ data })} ><Button>Submit</Button></FormComponent>

export const BasicForm = Template.bind({});
BasicForm.args = {
    defaultValues: {},
    fields: [
        {
            label: "Text",
            name: "textInput",
            tag: "input",
            type: "text",
            defaultValue: "neider",
            validations: {
                required: true,
                minLength: 3,
                maxLength: 10
            }
        },
        {
            label: "Number",
            name: "numberInput",
            tag: "input",
            type: "number",
            validations: {
                min: 18,
                max: 99
            },
            customValidationsMessages: {
                min: "La edad mínima debe ser 18 años"
            }
        },
        {
            label: "Email",
            name: "emailInput",
            tag: "input",
            type: "email",
            validations: {
                required: true,
                maxLength: 99
            }
        },
        {
            label: "Pattern /^\\w{3,}\\s\\d+$/",
            name: "patternField",
            tag: "input",
            placeholder: "Ejemplo: neider 123",
            type: "text",
            validations: {
                required: true,
                pattern: /^\w{3,}\s\d+$/,
                maxLength: 20
            }
        },
        {
            label: "Password",
            name: "passwordField",
            tag: "input",
            type: "password",
            validations: {
                required: true,
                minLength: 6,
                maxLength: 10
            }
        },
        {
            label: "Textarea",
            name: "textareaInput",
            tag: "input",
            type: "textarea",
            validations: {
                required: true,
                minLength: 6,
                maxLength: 20
            }
        },
        {
            label: "Simple Select",
            name: "simpleSelectInput",
            tag: "select",
            type: "simple",
            options: [
                { label: "Option1", value: "op1" },
                { label: "Option2", value: "op2" },
                { label: "Option3", value: "op3" }
            ],
            validations: {
                required: true,
            }
        },
        {
            label: "Multiple Select",
            name: "multipleSelectInput",
            tag: "select",
            type: "multiple",
            options: [
                { label: "Option1", value: "op1" },
                { label: "Option2", value: "op2" },
                { label: "Option3", value: "op3" }
            ],
            validations: {
                required: true,
                minLength: 2,
                maxLength: 2,
            }
        },
        {
            label: "Simple Checkbox",
            name: "simpleCheckboxInput",
            tag: "checkbox",
            type: "simple",
            validations: {
                required: true,
            }
        },
        {
            label: "Multiple Checkbox",
            name: "multipleCheckboxInput",
            tag: "checkbox",
            type: "multiple",
            defaultValue: ["op1"],
            options: [
                { label: "Option1", value: "op1" },
                { label: "Option2", value: "op2" },
                { label: "Option3", value: "op3" }
            ],
            validations: {
                required: true,
            }
        },
        {
            label: "Radio button",
            name: "radio",
            tag: "input",
            type: "radio",
            options: [
                { label: "Option1", value: "op1" },
                { label: "Option2", value: "op2" },
            ],
            validations: {
                required: true,
            }
        },
        {
            label: "Date field",
            name: "dateField",
            tag: "date",
            type: "date",
            min: "today",
            max: "next 5 day",
            validations: {
                required: true,
            }
        },
        {
            label: "Time field",
            name: "timeField",
            tag: "time",
            type: "time",
            step: 15,
            min: "06:00",
            max: "18:00",
            validations: {
                required: true,
            }
        },
        {
            label: "Tel field",
            name: "telField",
            tag: "tel",
            type: "local",
            validations: {
                required: true,
            }
        },
    ]
}