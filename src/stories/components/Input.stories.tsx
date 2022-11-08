import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputComponent } from "./FormElementsStories";
import InputBasic from './../../components/FormElements/Input';

export default {
    title: "Form Elements/Input",
    component: InputComponent,
    argTypes: {
        "tag": { control: "radio", options: ["input"] },
        "type": { control: "select" },
    },
    subcomponents: {
        InputBasicProps: InputBasic
    }
} as ComponentMeta<typeof InputComponent>;

const Template: ComponentStory<typeof InputComponent> = InputComponent

export const SimpleInput = Template.bind({});
SimpleInput.args = {
    tag: "input",
    type: "text",
    name: "inputField",
    label: "Label test",
    placeholder: "test",
    validations: {}
}

export const Text = Template.bind({});
Text.args = {
    ...SimpleInput.args,
    name: "inputField2",
    validations: {
        required: true,
        minLength: 3,
        maxLength: 10,
        pattern: /hola{1,2}/
    }
}

export const Number = Template.bind({});
Number.args = {
    ...SimpleInput.args,
    name: "inputField3",
    type: "number",
    validations: {
        required: true,
        min: 1,
        max: 10
    }
}

export const Email = Template.bind({});
Email.args = {
    ...SimpleInput.args,
    name: "inputField3",
    type: "email",
    validations: {
        required: true,
    }
}

export const Textarea = Template.bind({});
Textarea.args = {
    ...SimpleInput.args,
    name: "inputField4",
    type: "textarea",
    validations: {
        required: true,
        minLength: 5,
        maxLength: 50
    }
}

export const Password = Template.bind({});
Password.args = {
    ...SimpleInput.args,
    type: "password",
    name: "inputField5",
    validations: {
        required: true,
        minLength: 6,
        maxLength: 10
    }
}

export const Url = Template.bind({});
Url.args = {
    ...SimpleInput.args,
    name: "inputField6",
    type: "url",
    validations: {
        required: true,
    }
}
