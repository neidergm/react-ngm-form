import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FileComponent } from "./FormElementsStories";
import FileBasic from "../../components/FormElements/File";

export default {
    title: "Form Elements/File",
    component: FileComponent,
    argTypes: {
        "tag": { control: "radio", options: ["file"] },
    },
    subcomponents: {
        FileBasicProps: FileBasic
    }
} as ComponentMeta<typeof FileComponent>;

const Template: ComponentStory<typeof FileComponent> = FileComponent;

export const SimpleFile = Template.bind({});
SimpleFile.args = {
    label: "Label File",
    tag: "file",
    type: "simple",
    name: "examplename",
    validations: {},
    accept: [],
}

export const FileValidations = Template.bind({});
FileValidations.args = {
    ...SimpleFile.args,
    name: "examplename2",
    validations: {
        required: true,
        maxFileSize: 1,
    },
    accept: [".docx", ".pdf"],
}

export const MultiplesFiles = Template.bind({});
MultiplesFiles.args = {
    ...SimpleFile.args,
    name: "examplename3",
    type: "multiple",
    validations: {
        required: true,
        maxFileSize: 1,
        min: 2,
        max: 3
    },
    accept: [".jpg", ".png", ".gif"],
}
