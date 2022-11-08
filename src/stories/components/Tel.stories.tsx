import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TelComponent } from "./FormElementsStories";
import TelBasic from "./../../components/FormElements/Tel";

export default {
    title: "Form Elements/Tel",
    component: TelComponent,
    parameters: {
        // previewTabs: {
        //     canvas: { hidden: true },
        // },
        // viewMode: 'docs',
        docs: {
            description: {
                component: 'This component use the _react-phone-input-2_ package',
            },
        }
    },
    argTypes: {
        "type": { control: "select" },
        "tag": { control: "radio", options: ["tel"] },
    },
    subcomponents: {
        TelBasicProps: TelBasic
    }
} as ComponentMeta<typeof TelComponent>;

const Template: ComponentStory<typeof TelComponent> = TelComponent

export const Tel = Template.bind({});
Tel.args = {
    tag: "tel",
    type: "local",
    name: "telField",
    label: "Phone",
    placeholder: "(+57) 3123334444",
    validations: {}
}

export const TelLocalFormat = Template.bind({});
TelLocalFormat.args = {
    ...Tel.args,
    name: "telField2",
    validations: {
        required: true
    }
}

export const TelInternationalFormat = Template.bind({});
TelInternationalFormat.args = {
    ...Tel.args,
    type: "international",
    name: "telField3",
    validations: {
        required: true
    }
}
