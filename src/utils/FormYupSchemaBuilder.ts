import * as Yup from "yup";
import {
    T_CheckboxListWithValidationsProps,
    T_CheckboxWithValidationsProps,
    T_InputWithValidationsProps,
    T_RadioWithValidationsProps,
    T_FileWithValidationsProps,
    T_SelectWithValidationsProps,
    T_DateWithValidationsProps,
    T_TimeWithValidationsProps,
    T_TelWithValidationsProps
} from '../interfaces/FormElements.interface';
import { maxDateSetter, minDateSetter } from "./TimeAndDateUtilities";

interface I_ValidationsObject {
    validations: { [x: string]: any };
    customMessage: { [x: string]: string };
}

interface I_SchemasAndValues {
    schemas: { [key: string]: Yup.AnyObjectSchema },
    defaultValues: { [key: string]: any },
}

export type T_FieldsTypes = T_DateWithValidationsProps
    | T_FileWithValidationsProps
    | T_CheckboxWithValidationsProps
    | T_CheckboxListWithValidationsProps
    | T_SelectWithValidationsProps
    | T_InputWithValidationsProps
    | T_TimeWithValidationsProps
    | T_TelWithValidationsProps
    | T_RadioWithValidationsProps;

const mapSchemaAndValues = (
    fields: Array<T_FieldsTypes>,
    defaultValues: { [key: string]: any }
): I_SchemasAndValues => {
    return fields.reduce((p, c) => {
        if (c.type === "date") {
            if (!!(c.min) && !(/\d{4}-\d{2}-\d{2}/.test(c.min))) c.min = minDateSetter(c.min)
            if (!!(c.max) && !(/\d{4}-\d{2}-\d{2}/.test(c.max))) c.max = maxDateSetter(c.max)
        }
        return {
            schemas: { ...p.schemas, ...yupValidationsBuilder(c as T_FieldsTypes) },
            defaultValues: { ...p.defaultValues, [c.name]: defaultValues[c.name] || c.defaultValue }
        }
    }, { schemas: {}, defaultValues: {} })
}

function yupValidationsBuilder(args: T_FieldsTypes) {
    let schema;
    const { tag, type, validations, customValidationsMessages, name } = args;
    let vals = { validations, customMessage: customValidationsMessages || {} }

    if (tag === "checkbox") {
        if (type === "multiple") {
            schema = validationsForArrays(vals);
        } else {
            schema = validationsForBoolean(vals);
        }
    } else if (type === "number") {
        schema = validationsForNumber(vals);
    } else if (tag === "date") {
        schema = validationsForDates(vals, args.min, args.max);
    } else if (tag === "time") {
        schema = validationsForTime(vals, args.min, args.max);
    } else if (tag === "file") {
        schema = validationsForFiles(vals, args.accept);
    } else if (tag === "tel") {
        if (!vals.customMessage.hasOwnProperty("pattern")) {
            vals.customMessage.pattern = "Debe ingresar un número válido"
        }
        //     vals.validations = {
        //         ...vals.validations,
        //         pattern: type === "local" ? "^([\+]57\\s?)?[0-9]{3}\\s?[0-9]{3}\\s?[0-9]{4}$"
        //             :
        //             // "^\\+(?:[0-9]?){6,14}[0-9]$"
        //             "^((\\+[1-9]{1,4}[ ]?)|(\\([0-9]{2,3}\\)[ ]?)|([0-9]{2,4})[ ]?)*?[0-9]{3,4}?[ ]?[0-9]{3,4}?$"
        //     }
        schema = validationsForString(vals, type);
    } else {
        if (tag === "select" && type === "multiple") {
            schema = validationsForArrays(vals);
        } else {
            schema = validationsForString(vals, type);
        }
    }
    return { [name]: schema }
}

const validationsForBoolean = ({ validations, customMessage }: I_ValidationsObject) => {
    let schema = Yup.boolean();
    for (const v in validations) {
        let value = validations[v];
        if (v === "required" && value === true) {
            schema = schema.isTrue(customMessage[v] || "Este campo es obligatorio")
        };
    }
    return schema;
}

const validationsForArrays = ({ validations, customMessage }: I_ValidationsObject) => {
    let { minLength = null, maxLength, required } = validations;

    let schema = Yup.array().ensure().compact()

    if (!!(minLength)) {
        schema = schema.min(minLength, customMessage["minLength"] || `Seleccione mínimo ${minLength}`)
    } else if (!!(required)) {
        schema = schema.min(1, customMessage["required"] || `Seleccione mínimo ${1}`)
    }
    if (!!maxLength) {
        schema = schema.max(maxLength, customMessage["maxLength"] || `Seleccione máximo ${maxLength}`)
    }
    return schema;
}

const validationsForString = ({ validations, customMessage }: I_ValidationsObject, type: string) => {
    let schema = Yup.string().nullable();

    for (const v in validations) {
        let value = validations[v];
        if (v === "required" && value === true) {
            schema = schema.required(customMessage[v] || "Este campo es obligatorio")
        };
        if (v === "minLength") {
            schema = schema.min(value, customMessage[v] || `Mínimo ${value} carácteres`)
        };
        if (v === "maxLength") {
            schema = schema.max(value, customMessage[v] || `Máximo ${value} carácteres`)
        };
        if (v === "pattern") {
            schema = schema.matches(value, { excludeEmptyString: true, message: customMessage[v] || `Ingrese un valor correcto` })
        };
    }
    if (type === "email") {
        schema = schema.email(customMessage[type] || "Ingrese un correo válido");
    } else if (type === "url") {
        schema = schema.url(customMessage[type] || "Ingrese una URL válida");
    } else if (type === "international" || !(validations.hasOwnProperty("pattern"))) {
        schema = schema.matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 
        { excludeEmptyString: true, message: `Ingrese un valor correcto` })
    }
    return schema;
}

const validationsForNumber = ({ validations, customMessage }: I_ValidationsObject) => {
    let schema = Yup.number().typeError('Debe ser numérico');

    for (const v in validations) {
        let value = validations[v];
        if (v === "required" && value === true) {
            schema = schema.required(customMessage[v] || "Este campo es obligatorio");
        }
        if (v === "min") {
            value = value || 0;
            schema = schema.min(value, customMessage[v] || `Debe ser mínimo ${value}`)
        };
        if (v === "max") {
            schema = schema.max(value, customMessage[v] || `Debe ser máximo ${value}`)
        };
    }

    schema = schema.transform((v) => v || undefined)
    return schema;
}

const validationsForDates = ({ validations, customMessage }: I_ValidationsObject, min?: string, max?: string) => {

    const { required } = validations;
    let schema = Yup.date()
        .nullable()
        .transform((curr, orig) => orig === '' ? null : curr)
    // .typeError('Debe ser una fecha');

    if (!!(required)) {
        schema = schema.required(customMessage["required"] || "Este campo es obligatorio");
    }

    if (!!min) {
        schema = schema.min(min, `Debe ser mínimo ${min}`)
    };
    if (!!max) {
        schema = schema.max(max, `Debe ser máximo ${max}`)
    };
    // schema = schema.transform((v) => v || null)
    return schema;
}

const validationsForFiles = ({ validations, customMessage }: I_ValidationsObject, accept: Array<string> = []) => {
    let schema = Yup.mixed();

    if (!!(accept.length)) validations.accept = accept

    for (const v in validations) {
        let value = validations[v];
        if (v === "required" && value === true) {
            schema = schema.test(v, customMessage[v] || "Este campo es obligatorio", (val) => !!(val.length))
        }
        if (v === "maxFileSize") {
            schema = schema.test(v, customMessage[v] || `El límite de archivo es de ${value}MB`, (val) => {
                // return !!(val.length) ? (((val[0].size) / 1024) / 1024) < value : true;
                if (val.length) {
                    for (let i = 0; i < val.length; i++) {
                        if ((((val[i].size) / 1024) / 1024) < value) return true
                    }
                    return false;
                }
                return true;
            })
        }
        if (v === "min") {
            schema = schema.test(v, customMessage[v] || `Seleccione mínimo ${value} archivos`, (val) => {
                return !!(val.length) ? val.length >= value : true;
            })
        }
        if (v === "max") {
            schema = schema.test(v, customMessage[v] || `Seleccione máximo ${value} archivos`, (val) => {
                return !!(val.length) ? val.length <= value : true;
            })
        }
        if (v === "accept") {
            schema = schema.test(v, customMessage[v] || `Debe ser ${value.join(", ")}`, (val) => {
                if (!!(val.length)) {
                    let reg = new RegExp("^" + value.join("|") + "$", "i");
                    for (let i = 0; i < val.length; i++) {
                        let vs = val[i].name.split(".");
                        // if (!(value.includes(`.${vs.pop()}`))) return false;
                        if (!(reg.test(`.${vs.pop()}`))) return false;
                    }
                    return true;
                }
                return true;
            })
        }
    }

    return schema;
}

const validationsForTime = ({ validations, customMessage }: I_ValidationsObject, min?: string, max?: string) => {
    let schema = Yup.mixed()
    // .nullable()
    const { required } = validations;
    if (!!(required)) {
        schema = schema.test("required", customMessage["required"] || `Este campo es requerido`, (val) => !!val);
    }

    if (!!min) {
        schema = schema.test("minTime", customMessage["min"] || `Debe ser mínimo ${min}`, (val) => {
            const [minH, minM] = min.split(":"), [hh, mm] = val.split(":");
            return !!(val) ? (minH === hh ? Number(mm) >= Number(minM) : Number(hh) > Number(minH)) : true;
        });
    };

    if (!!max) {
        schema = schema.test("maxTime", customMessage["max"] || `Debe ser máximo ${max}`, (val) => {
            const [maxH, maxM] = max.split(":"), [hh, mm] = val.split(":");
            return !!(val) ? (maxH === hh ? Number(mm) <= Number(maxM) : Number(hh) < Number(maxH)) : true;
        });
    };
    return schema;
}

export {
    mapSchemaAndValues,
    validationsForTime,
    yupValidationsBuilder,
    validationsForBoolean,
    validationsForString,
    validationsForFiles,
    validationsForNumber,
    validationsForDates,
}
