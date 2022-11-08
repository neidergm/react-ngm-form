/**
 * INTERFACES
 * 
 * 1. Commons or general use
 * 2. Inputs
 * 3. Selects
 * 4. Checkbox
 * 5. Radio
 * 6. File
 * 7. Date Picker
 * 8. Time Picker
 * 9. Tel
 */

/* * * 1. COMMONS OR GENERAL USE * * */

export type T_OptionsOfInput = Array<{ label: string, value: any }>;

export interface I_RegisteredInputsInFormProps {
    // onChange: (e: ChangeEvent<any>) => void;
    innerRef?: (ref: any) => void
    onBlur?: (e: any) => void,
    onChange?: (e: any) => void
}

export interface I_GeneralInputsBaseProps {
    // onChange: (e: ChangeEvent<any>) => void;
    name: string;
    id?: string;
    placeholder?: string;
    className?: string;
    style?: { [x: string]: string }
    // [x: string]: any;
}

export interface I_ValidationsMessage {
    /**
     * Custom messages for validations.
     * For some custom errors messages, Validations have to have the same props names of validations. 
     */
    customValidationsMessages?: { [prop: string]: string };
}

export interface I_InputPropsInForm extends I_RegisteredInputsInFormProps {
    valid?: boolean;
    invalid?: boolean;
}


/* * * 2. INPUTS * * */

export interface I_InputProps extends I_GeneralInputsBaseProps {
    tag: "input";
    type: "text" | "email" | "number" | "textarea" | "password" | "url";
    bsSize?: 'lg' | 'sm';
    defaultValue?: string;
}

export type T_InputWithValidationsProps = I_InputProps & I_ValidationsMessage & {
    validations: {
        /**
         * For all inputs
         */
        required?: boolean;
        /**
         * For number
         */
        min?: number;
        /**
         * For number
        */
        max?: number;
        /**
         * For text, textarea, email, password
         */
        minLength?: number;
        /**
         * For text, textarea, email, password
         */
        maxLength?: number;
        /**
         * For text, textarea, email, password
         */
        pattern?: RegExp;
    };
    label?: string;
};


/* * * 3. SELECTS * * */

export interface I_SelectProps extends I_GeneralInputsBaseProps {
    tag: "select";
    /**
     *  Select can be normal(simple) or multiple to choose more than 1 option 
     */
    type: "simple" | "multiple";
    /**
     * * If options are strings, everyone will be convert into object like {label: option, value: option}
     * * If options are null, input will show *Loading...* indicator
     */
    options: T_OptionsOfInput | Array<string> | null;
    placeholder?: string;
    bsSize?: 'lg' | 'sm';
    /**
     * * If type is *MULTIPLE*, then the default value have to be an array
     * * If type is *SIMPLE*, then the default value cannot be an array
     */
    defaultValue?: string | Array<any>;
}


export type T_SelectWithValidationsProps = I_SelectProps & I_ValidationsMessage & {
    validations: {
        /**
         * If *minLenght* is set, required is not important
         */
        required?: boolean,
        minLength?: number;
        maxLength?: number;
    };
    label?: string;
};


/* * * 4. CHECKBOX * * */

export interface I_CheckboxProps extends I_GeneralInputsBaseProps {
    tag: "checkbox";
    label: string;
    /**
     * Value for checkbox when is checked
     */
    value?: string;
}

export type T_CheckboxWithValidationsProps = I_CheckboxProps & I_ValidationsMessage & {
    tag: "checkbox";
    type: "simple";
    validations: {
        required?: boolean
    };
    defaultValue?: boolean;
};

export interface I_CheckboxListProps extends I_GeneralInputsBaseProps {
    tag: "checkbox";
    /**
    * * If options are strings, everyone will be convert into object like {label: option, value: option}
    * * If options are null, input will show *Loading...* indicator
    */
    options: T_OptionsOfInput | Array<string> | null;
    defaultValue?: Array<number | string>;
}

export type T_CheckboxListWithValidationsProps = I_CheckboxListProps & I_ValidationsMessage & {
    type: "multiple";
    validations: {
        /**
         * If *minLenght* is set, required is not important
         */
        required?: boolean,
        minLength?: number;
        maxLength?: number;
    };
    label?: string;
};



/* * * 5. RADIO * * */

export interface I_RadioProps extends I_GeneralInputsBaseProps {
    tag: "input";
    type: "radio";
    /**
     * * If options are strings, everyone will be convert into object like {label: option, value: option}
     * * If options are null, input will show *Loading...* indicator
     */
    options: T_OptionsOfInput | Array<string> | null;
    defaultValue?: string;
}

export type T_RadioWithValidationsProps = I_RadioProps & I_ValidationsMessage & {
    label?: string;
    validations: {
        required?: boolean
    };
};



/* * * 6. FILE * * */

export interface I_FileProps extends I_GeneralInputsBaseProps {
    tag: "file";
    type: "multiple" | "simple";
    accept: Array<string | ".pdf" | ".png" | ".jpg" | ".jpeg" | ".docx" | ".xlsx" | ".txt">;
    defaultValue?: string;
}

export type T_FileWithValidationsProps = I_FileProps & I_ValidationsMessage & {
    label?: string;
    validations: {
        required?: boolean;
        /**
         * it have to be MB number
         */
        maxFileSize?: number;
        /**
         * Only valid for MULTIPLE type
         */
        max?: number;
        /**
         * Only valid for MULTIPLE type
         */
        min?: number;
    };
};



/* * * 7. DATE * * */

export interface I_DateProps extends I_GeneralInputsBaseProps {
    tag: "date";
    /**
     * If the type is month: *min*, *max* and *defaultValue* have to be equal to the next format:
     * * Date : YYYY-MM-DD
     * * Month: YYYY-MM
     */
    type: "date" | "month";
    /**
     * Format for type *Date* or *Month* is YYYY-MM-DD | YYYY-MM (Respectively)
     * * Specific day format: *YYYY-MM-DD* | *YYYY-MM* 
     * * Min today: *"today"*
     * * Min X number of: *"last X day|month|year"* (X is number)
     */
    min?: string;
    /**
     * Format for type *Date* or *Month* is YYYY-MM-DD | YYYY-MM (Respectively) 
     * * Specific day format: *YYYY-MM-DD* | *YYYY-MM* 
     * * max today: *"today"*
     * * Max X number of: *"next X day|month|year"* (X is number)
     */
    max?: string;
    defaultValue?: string;
}

export type T_DateWithValidationsProps = I_DateProps & I_ValidationsMessage & {
    label?: string;
    validations: {
        required?: boolean;
    };
};



/* * * 8. TIME * * */

export interface I_TimeProps extends I_GeneralInputsBaseProps {
    tag: "time";
    type: "time" | "select";
    /**
     * 24 hours format: *HH:MM*
     */
    min?: string;
    /**
     * 24 hours format: *HH:MM*
     */
    max?: string;
    /**
     * Specially for type SELECT, show hours list every step mins
     * - Have to be in minutes: *60* is equal to 1 hour
     */
    step?: number;
    defaultValue?: string;
}

export type T_TimeWithValidationsProps = I_TimeProps & I_ValidationsMessage & {
    label?: string;
    validations: {
        required?: boolean;
    };
};



/* * * 9. TEL * * */

export interface I_TelProps extends I_GeneralInputsBaseProps {
    tag: "tel";
    type: "local" | "international";
    // setError?: (name: string, opt: any) => void;
    /**
     * This component have external documentation
     * https://www.npmjs.com/package/react-phone-input-2
     * 
     */
    telComponentProps?: {
        /**
         * Initial Country: 'co'|57
         */
        country?: string | number;
        onlyCountries?: Array<string>;
        preferredCountries?: Array<string>;
        /**
         * Disable input and dropdown
         */
        disabled?: boolean;
        /**
         * Disable dropdown only
         */
        disableDropdown?: boolean;
        /**
         * show countries only from specified regions
         * Ex: ['america', 'europe']
         */
        regions?: Array<string> | string;
        containerClass?: string;
        containerStyle?: { [x: string]: string },
        dropdownClass?: string;
        dropdownStyle?: { [x: string]: string },
        inputClass?: string;
        inputStyle?: { [x: string]: string },
        buttonClass?: string;
        buttonStyle?: { [x: string]: string },
        [prop: string]: any;
    };
    defaultValue?: string;
}

export type T_TelWithValidationsProps = I_TelProps & I_ValidationsMessage & {
    label?: string;
    validations: {
        required?: boolean;
        pattern?: any;
    };
};

