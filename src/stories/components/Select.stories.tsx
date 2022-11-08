import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SelectComponent } from "./FormElementsStories";
import SelectBasic from "./../../components/FormElements/Select";

export default {
    title: "Form Elements/Select",
    component: SelectComponent,
    argTypes: {
        "tag": { control: "radio", options: ["select"] },
    },
    subcomponents: {
        SelectBasicProps: SelectBasic
    }
} as ComponentMeta<typeof SelectComponent>;

const Template: ComponentStory<typeof SelectComponent> = SelectComponent

export const SimpleSelect = Template.bind({});
SimpleSelect.args = {
    name: "examplename",
    placeholder: "Seleccione...",
    tag: "select",
    type: "simple",
    options: [
        { value: "Opt 1", label: "Opt 1" },
        { value: "Opt 2", label: "Opt 2" },
        { value: "Opt 3", label: "Opt 3" }
    ],
    validations: {}
}

export const SimpleSelectValidations = Template.bind({});
SimpleSelectValidations.args = {
    name: "examplename",
    placeholder: "Seleccione...",
    tag: "select",
    type: "simple",
    options: [
        { value: "Opt 1", label: "Opt 1" },
        { value: "Opt 2", label: "Opt 2" },
        { value: "Opt 3", label: "Opt 3" },
        { value: "Opt 4", label: "Opt 4" }
    ],
    validations: {
        required: true
    }
}

export const MultipleSelect = Template.bind({});
MultipleSelect.args = {
    ...SimpleSelectValidations.args,
    type: "multiple",
    validations: {
        minLength: 2,
        maxLength: 3
    }
}

export const CustomMessages = Template.bind({});
CustomMessages.args = {
    ...SimpleSelectValidations.args,
    customValidationsMessages: {
        required: "Este campo es necesario"
    },
}
