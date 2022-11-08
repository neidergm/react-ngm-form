import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CheckboxComponent } from "./FormElementsStories";
import CheckboxBasic from "./../../components/FormElements/Checkbox";

export default {
    title: "Form Elements/Checkbox",
    component: CheckboxComponent,
    argTypes: {
        "tag": { control: "radio", options: ["checkbox"] },
        "type": { control: "radio", options: ["simple"] },
    },
    subcomponents: {
        CheckboxBasicProps: CheckboxBasic
    }
} as ComponentMeta<typeof CheckboxComponent>;

const Template: ComponentStory<typeof CheckboxComponent> = CheckboxComponent

export const SimpleCheckbox = Template.bind({});
SimpleCheckbox.args = {
    name: "examplename",
    label: "Label test check",
    tag: "checkbox",
    type: "simple",
    validations: {
        required: true
    }
}
