import type { Meta, StoryObj } from '@storybook/react';
import commonConfiguration from './commonConfiguration';
import { SelectWithDependsComponent } from './FormFieldsComponentsForStory';

const meta = {
    ...commonConfiguration,
    title: 'Advanced/With depends On',
    component: SelectWithDependsComponent,
    parameters: {
        controls: { sort: 'requiredFirst' },
    },
} satisfies Meta<typeof SelectWithDependsComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ShowByAnyValue: Story = {
    args: {
        label: "Child field",
        tag: "select",
        name: "child",
        type: "simple",
        placeholder: "Pick one...",
        options: ["Option01", "Option02", "Option03", "Option04"],
        validations: {
            required: true
        },
        dependsOn: [{ name: "parent", show: true }]
    },
    decorators: [(Story) =>
        <div>
            <p>Pick some value to show other field</p>
            <Story />
        </div>
    ],
};
export const ShowBySpecificValue: Story = {
    args: {
        ...ShowByAnyValue.args,
        dependsOn: [{ name: "parent", show: true, whenValue: "2" }]
    },
    decorators: [(Story) =>
        <div>
            <p>Pick <b>Option2</b> to show other field</p>
            <Story />
        </div>
    ],
};
export const HideBySpecificValue: Story = {
    args: {
        ...ShowByAnyValue.args,
        dependsOn: [{ name: "parent", show: false, whenValue: "2" }]
    },
    decorators: [(Story) =>
        <div>
            <p>Pick <b>Option2</b> to hide other field</p>
            <Story />
        </div>
    ],
};
export const ChangeProps: Story = {
    args: {
        ...ShowByAnyValue.args,
        dependsOn: [{ name: "parent", whenValue: "2", props: { className: "bg-info", wrapperClassName: "bg-warning col-md-12" } }],
    },
};
export const ChangePropsUsingCallback: Story = {
    args: {
        ...ShowByAnyValue.args,
        dependsOn: "parent",
        dependsOnChange: ({ parentValue }) => {
            if (parentValue["parent"] === "2") {
                return { className: "bg-info", wrapperClassName: "bg-warning col-md-12" }
            }
            return {}
        }
    },
};
