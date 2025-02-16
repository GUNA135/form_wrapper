import React, { useState, useEffect } from 'react'
import Tab from '../common/Tab'
import Input from '../common/Input'
import Label from '../common/Label'
import Radio from '../common/Radio'
import Button from '../common/Button'
import Select from '../common/Select'
import Upload from '../common/Upload'
import AddLimitedInputs from '../common/AddLimitedInputs'
import { debounce } from '../../../utils/CommonFunction'

const formComponents = {
    'tab': Tab,
    'input': Input,
    'label': Label,
    'radio': Radio,
    'button': Button,
    'select': Select,
    'upload': Upload,
    'addLimitedInputs': AddLimitedInputs
}

const FormWrapper = (props) => {
    const { data, submit, onChange } = props
    const { title, description, wrapper, allOptions, section } = data

    const [selectedTab, setSelectedTab] = useState(0)
    const [formData, setFormData] = useState({})
    const [formValidation, setFormValidation] = useState({})
    const [buttonDisabled, setButtonDisabled] = useState({})
    const [validationMessage, setValidationMessage] = useState({})

    const textVarients = {
        formTitle: 'text-2xl font-semibold text-textPrimary',
        description: 'text-xs text-textSecondary pt-1 font-medium',
        sectionTitle: 'text-lg font-semibold text-textPrimary',
        required: "after:text-red-500 after:content-['*'] after:ml-0.5"
    }

    const wrapperStyles = {
        wrapper: 'shadow-sm rounded-2xl'
    }

    const initialsetStates = () => {
        setButtonDisabled(prevState => {
            const updatedState = { ...prevState };

            for (const { section_id, fields } of section) {
                if (fields?.some(({ required }) => required)) {
                    updatedState[section_id] = true;
                }
            }

            return updatedState;
        });

        setFormValidation(prevState => {
            const updatedState = { ...prevState };

            for (const { section_id, fields } of section) {
                const sectionFields = Object.fromEntries(
                    fields
                        ?.filter(({ required, name, dependsOn }) => required && name && !dependsOn)
                        ?.map(({ name }) => [name, false])
                );

                if (Object.keys(sectionFields).length) {
                    updatedState[section_id] = { ...updatedState[section_id], ...sectionFields };
                }
            }

            return updatedState;
        });

    }

    useEffect(() => {
        if (!Array.isArray(section) || section.length === 0) return;

        initialsetStates()

    }, [data]);

    const evaluateCondition = (operator, targetValue, conditionValue) => {
        switch (operator) {
            case '>': return targetValue > conditionValue;
            case '<': return targetValue < conditionValue;
            case '>=': return targetValue >= conditionValue;
            case '<=': return targetValue <= conditionValue;
            case '==': return targetValue == conditionValue;
            case '!=': return targetValue != conditionValue;
            default: return false;
        }
    };

    const handleDebouncChange = debounce((e) => {
        const { name, value } = e.target;
        const { reset, section_id } = e;

        if (value !== formData?.[name]) {
            const updatedFormData = {
                ...formData,
                [name]: value,
                ...(reset?.target ? { [reset.target]: '' } : {}),
            };

            setFormData(updatedFormData);

            if (reset?.target) {

                const resetField = section
                    .find(sec => sec.section_id === section_id)?.fields
                    .find(field => field.name === reset.target);

                let enableValidation = true;
                if (resetField?.dependsOn) {
                    const { target, condition } = resetField.dependsOn;

                    const targetValue = target === name ? value : formData?.[target];

                    const numericTargetValue = Number(targetValue);
                    const numericConditionValue = Number(condition?.value);

                    if (condition) {
                        enableValidation = evaluateCondition(
                            condition.operator,
                            numericTargetValue,
                            numericConditionValue
                        );
                    } else if (resetField.dependsOn.values) {
                        enableValidation = resetField.dependsOn.values.includes(targetValue);
                    }
                }

                setFormValidation((prev) => ({
                    ...prev,
                    [section_id]: {
                        ...prev[section_id],
                        [reset.target]: !enableValidation,
                    }
                }));
            }

        }
    }, 500);



    const handleChange = (e, reset, section_id, field) => {
        if (field?.type == 'file') {
            let ele = {
                target: {
                    value: e?.target?.files,
                    name: e?.target?.name
                }
            }

            handleDebouncChange({ ...ele, reset: { ...reset }, section_id: section_id });
        } else {
            handleDebouncChange({ ...e, reset: { ...reset }, section_id: section_id });
        }
    };


    const generalValidation = (name, section_id, message, poper) => {
        const isValid = (formData?.[name] && formData?.[name]?.toString()?.length > 0) ?? false
        setFormValidation({ ...formValidation, [section_id]: { ...formValidation?.[section_id], [name]: isValid } })
        if (isValid) {
            setValidationMessage({ ...validationMessage, [name]: false })
        } else {
            setValidationMessage({ ...validationMessage, [name]: message })
        }
    }

    const addLimitedFieldsValidation = (name, section_id, message, maxSum) => {
        const totalSum = (Array.isArray(formData?.[name]) ? formData[name] : [])
            .reduce((acc, item) => acc + (parseFloat(item.value) || 0), 0);

        const isValid = totalSum == maxSum
        setFormValidation({ ...formValidation, [section_id]: { ...formValidation?.[section_id], [name]: isValid } })
        if (isValid) {
            setValidationMessage({ ...validationMessage, [name]: false })
        } else {
            setValidationMessage({ ...validationMessage, [name]: message })
        }
    }

    const regexValidation = (regex, name, section_id, message) => {
        const getRegex = new RegExp(regex)
        const isValid = getRegex.test(formData?.[name])
        setFormValidation({ ...formValidation, [section_id]: { ...formValidation?.[section_id], [name]: isValid } })
        if (isValid) {
            setValidationMessage({ ...validationMessage, [name]: false })
        } else {
            setValidationMessage({ ...validationMessage, [name]: message })
        }
    }

    const fileValidation = (e, section_id) => {
        const { name } = e
        const { message } = e?.validation || {}

        let isValid = formData?.[name]?.length > 0
        setFormValidation({ ...formValidation, [section_id]: { ...formValidation?.[section_id], [name]: isValid } })
        if (isValid) {
            setValidationMessage({ ...validationMessage, [name]: false })
        } else {
            setValidationMessage({ ...validationMessage, [name]: message })
        }
    }

    const validation = async (e, section_id) => {
        const { component, maxSum } = e
        const { regex, min, max, message } = e?.validation || {};

        if (e?.type == 'file') {
            fileValidation(e, section_id)
        } else if (component == 'addLimitedInputs') {
            addLimitedFieldsValidation(e?.name, section_id, message, maxSum)
        } else if (!regex && !min && !max) {
            generalValidation(e?.name, section_id, message);
        } else {
            if (regex?.length > 0) {
                regexValidation(regex, e?.name, section_id, message);
            }
        }
    };


    const navNextTab = (options, newIndex, name) => {
        let getTab = options?.length - 1
        if (newIndex >= 0 && newIndex <= getTab) {
            setSelectedTab(newIndex);
        }
    }

    const tabFunctions = {
        next: (arg, name) => navNextTab(arg, selectedTab + 1, name),
        prev: (arg, name) => navNextTab(arg, selectedTab - 1, name)
    }

    const submitForm = (e) => {
        if (submit) {
            submit(e)
        }

        setTimeout(() => {
            setFormData({})
            setSelectedTab(0)
            initialsetStates()
        }, 500);
    }

    const fromFunctions = {
        "submit": () => submitForm(formData)
    }

    const targetComponent = {
        'tab': tabFunctions,
        'form': fromFunctions
    }

    useEffect(() => {
        if (onChange) {
            onChange(formData)
        }
    }, [formData])

    return (
        <div className='py-4 px-4 flex flex-col gap-2'>

            {(title || description) && <div className={`px-6 py-3 ${wrapper ? wrapperStyles?.wrapper : ''}`}>
                {title && <h1 className={`${textVarients?.formTitle}`}>{title}</h1>}
                {description && <p className={`${textVarients?.description}`}>{description}</p>}
            </div>}

            <section className='flex flex-col gap-6'>
                {section && section?.length > 0 && section?.map((items, index) => {
                    const { title, description, wrapper, fields, layout, buttons, dependsOn, section_id } = items
                    return (
                        <React.Fragment>
                            {(dependsOn ? dependsOn?.values?.includes(formData?.[dependsOn?.target]) : true) && <div key={index} className={`flex flex-col gap-1 px-6 py-6 ${wrapper ? wrapperStyles?.wrapper : ''}`}>
                                {(title || description) && <div >
                                    {title && <h1 className={`${textVarients?.sectionTitle}`}>{title}</h1>}
                                    {description && <p className={`${textVarients?.description}`}>{description}</p>}
                                </div>}

                                {Array.isArray(fields) && fields.length > 0 && (
                                    <div className={layout ? layout : 'flex flex-col gap-7'}>
                                        {fields.map((field, key) => {
                                            const { dependsOn, options, reset, ...rest } = field
                                            const Component = formComponents[field?.component];

                                            if (Component) {
                                                return (
                                                    <React.Fragment>
                                                        {!(dependsOn?.type === 'hide'
                                                            ? dependsOn?.condition
                                                                ? !evaluateCondition(
                                                                    dependsOn?.condition?.operator,
                                                                    formData?.[dependsOn?.target],
                                                                    dependsOn?.condition?.value
                                                                )
                                                                : dependsOn?.values
                                                                    ? !dependsOn?.values.includes(formData?.[dependsOn?.target])
                                                                    : false
                                                            : false) && (
                                                                <div key={key} className='flex flex-col gap-1.5'>
                                                                    {field?.label && <Label className={`text-[16px] font-semibold ${field?.required ? textVarients?.required : ''}`}>{field?.label}</Label>}
                                                                    <Component
                                                                        key={key}
                                                                        disabled={
                                                                            dependsOn?.type === 'disable'
                                                                                ? dependsOn?.condition
                                                                                    ? !evaluateCondition(
                                                                                        dependsOn?.condition?.operator,
                                                                                        formData?.[dependsOn?.target],
                                                                                        dependsOn?.condition?.value
                                                                                    )
                                                                                    : dependsOn?.values
                                                                                        ? !dependsOn?.values.includes(formData?.[dependsOn?.target])
                                                                                        : false
                                                                                : false
                                                                        }
                                                                        options={dependsOn?.options ? allOptions?.[formData?.[dependsOn?.options]] : allOptions?.[options]}
                                                                        setSelectedTab={setSelectedTab}
                                                                        selectedTab={selectedTab}
                                                                        formData={formData}
                                                                        setFormData={setFormData}
                                                                        onChange={(e) => handleChange(e, reset, section_id, field)}
                                                                        onBlur={() => validation(field, section_id)}
                                                                        defaultValue={formData?.[field?.name]}
                                                                        {...rest} />
                                                                    {field?.required && validationMessage?.[field?.name] && <p className='text-xs font-normal text-red-500'>{validationMessage?.[field?.name]}</p>}
                                                                </div>)}
                                                    </React.Fragment>
                                                )
                                            } else {
                                                return 'No Component Found !'
                                            }
                                        })}
                                    </div>
                                )}
                                {buttons && buttons.length > 0 && (
                                    <div className="flex items-center justify-end gap-6">
                                        {buttons.map((button, index) => {
                                            const { label, target, targettedFunction, options, dependsOn, section_id, ...rest } = button;
                                            const optionData = allOptions?.[options] || [];

                                            const disabled = formValidation?.[section_id] && Object.keys(formValidation?.[section_id]).length > 0
                                                ? Object.values(formValidation?.[section_id]).includes(false)
                                                : buttonDisabled?.[section_id]

                                            return (
                                                <React.Fragment>
                                                    {(dependsOn ? dependsOn?.values?.includes(formData?.[dependsOn?.target]) : true) && <Button
                                                        key={index}
                                                        disabled={disabled}
                                                        onClick={() =>
                                                            targetComponent?.[target]?.[targettedFunction](optionData, target)
                                                        }
                                                        {...rest}
                                                    >
                                                        {label}
                                                    </Button>}
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>}
                        </React.Fragment>
                    )
                })}
            </section>

        </div>
    )
}

export default FormWrapper