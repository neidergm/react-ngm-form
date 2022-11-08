import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TimeComponent } from "./FormElementsStories";
import TimeBasic from './../../components/FormElements/Time'

export default {
    title: "Form Elements/Time",
    component: TimeComponent,
    argTypes: {
        "type": { control: "select" },
        "tag": { control: "radio", options: ["time"] },
    },
    subcomponents: {
        TimeBasicProps: TimeBasic
    }
} as ComponentMeta<typeof TimeComponent>;

const Template: ComponentStory<typeof TimeComponent> = TimeComponent

export const TimeAsPicker = Template.bind({});
TimeAsPicker.args = {
    tag: "time",
    type: "time",
    name: "timeField",
    label: "Label test",
    min: "06:00",
    max: "18:00",
    validations: {}
}

export const TimeAsSelect = Template.bind({});
TimeAsSelect.args = {
    tag: "time",
    type: "select",
    name: "timeFieldAsSelect",
    label: "Label test",
    min: "06:00",
    max: "18:00",
    validations: {}
}
