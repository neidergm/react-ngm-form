import React from 'react';
import { FormGroup, Label, FormText } from './Elements';

type T_Props = {
    name: string;
    label: any;
    children: JSX.Element | JSX.Element[];
    feedback?: string;
    id?: string;
}

const ElementWrapper = ({ name, id, label, feedback, children }: T_Props) => {

    return (
        <FormGroup>
            <Label for={id || name} hidden={!(label)} dangerouslySetInnerHTML={{ __html: label }} />
            {children}
            <FormText color="danger">{feedback}</FormText>
        </FormGroup >
    )
}

export default ElementWrapper;
