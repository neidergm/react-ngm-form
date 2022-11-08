import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DateComponent } from "./FormElementsStories";
import DateBasic from "../../components/FormElements/Date";

export default {
    title: "Form Elements/Date",
    component: DateComponent,
    argTypes: {
        "type": { control: "select" },
        "tag": { control: "radio", options: ["date"] },
    },
    subcomponents: {
        DateBasicProps: DateBasic
    }
} as ComponentMeta<typeof DateComponent>;

const Template: ComponentStory<typeof DateComponent> = DateComponent

export const SimpleDate = Template.bind({});
SimpleDate.args = {
    tag: "date",
    type: "date",
    name: "dateField",
    label: "Label test",
    validations: {}
}

export const WithValidations = Template.bind({});
WithValidations.args = {
    ...SimpleDate.args,
    min: "2022-10-10",
    max: "today",
    validations: {
        required: true
    }
}

export const WithRelativeMinAndMax = Template.bind({});
WithRelativeMinAndMax.args = {
    ...SimpleDate.args,
    min: "last 5 day",
    max: "next 1 month",
    validations: {
        required: true
    }
}
