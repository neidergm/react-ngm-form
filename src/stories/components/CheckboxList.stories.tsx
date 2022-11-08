import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CheckboxListComponent } from "./FormElementsStories";
import CheckboxBasic from "./../../components/FormElements/Checkbox";

export default {
    title: "Form Elements/Checkbox",
    component: CheckboxListComponent,
    argTypes: {
        "tag": { control: "radio", options: ["checkbox"] },
        "type": { control: "radio", options: ["multiple"] },
    },
    subcomponents: {
        CheckboxBasicProps: CheckboxBasic
    }
} as ComponentMeta<typeof CheckboxListComponent>;

const Template: ComponentStory<typeof CheckboxListComponent> = CheckboxListComponent;

export const CheckboxList = Template.bind({});
CheckboxList.args = {
    name: "examplename",
    tag: "checkbox",
    type: "multiple",
    options: [
        { label: "Label 1", value: "op1" },
        { label: "Label 2", value: "op2" },
        { label: "Label 3", value: "op3" },
        { label: "Label 4", value: "op4" },
    ],
    validations: { required: true }
}

export const ListValidations = Template.bind({});
ListValidations.args = {
    ...CheckboxList.args,
    name: "examplename2",
    validations: {
        minLength: 2,
        maxLength: 3
    }
}
