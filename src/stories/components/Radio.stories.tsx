import { ComponentMeta, ComponentStory } from "@storybook/react";
import { RadioComponent } from "./FormElementsStories";
import RadioBasic from "./../../components/FormElements/Radio";

export default {
    title: "Form Elements",
    component: RadioComponent,
    argTypes: {
        "tag": { control: "radio", options: ["input"] },
        "type": { control: "radio", options: ["radio"] },
    },
    subcomponents: {
        RadioBasicProps: RadioBasic
    }
} as ComponentMeta<typeof RadioComponent>;

const Template: ComponentStory<typeof RadioComponent> = RadioComponent;

export const Radio = Template.bind({});
Radio.args = {
    tag: "input",
    type: "radio",
    name: "examplename",
    label: "Label radio",
    options: [
        { label: "Label 1", value: "op1" },
        { label: "Label 2", value: "op2" },
        { label: "Label 3", value: "op3" },
    ],
    validations: {
        required: true
    }
}
