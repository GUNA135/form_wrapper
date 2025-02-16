import React, { useState, useEffect } from "react";
import Label from "./Label";
import Input from "./Input";

const AddLimitedInputs = (props) => {
    const { max = 3, maxSum = 100, componentLabel, formData, setFormData, name, onChange, ...rest } = props
    const MAX_INPUTS = max;
    const MAX_SUM = maxSum;

    useEffect(() => {
        if (!Array.isArray(formData?.[name])) {
            setFormData?.((prevData) => ({
                ...prevData,
                [name]: [{ label: componentLabel?.replace('{id}', 1), value: "" }]
            }));
        }
    }, [max, name, componentLabel, setFormData]);

    const handleChange = (index, value) => {
        if (!Array.isArray(formData?.[name])) return;

        const updatedData = [...formData[name]];
        const numericValue = parseFloat(value) || 0;

        updatedData[index].value = numericValue >= 0 ? numericValue : 0;
        setFormData?.((prevData) => ({ ...prevData, [name]: updatedData }));
    };

    const handleAddInput = () => {
        if (!Array.isArray(formData?.[name]) || formData[name].length >= MAX_INPUTS) return;

        setFormData?.((prevData) => ({
            ...prevData,
            [name]: [
                ...prevData[name],
                { label: componentLabel?.replace('{id}', prevData[name].length + 1), value: "" }
            ]
        }));
    };

    const handleRemoveInput = (index) => {
        if (!Array.isArray(formData?.[name]) || formData[name].length <= 1) return;

        setFormData?.((prevData) => ({
            ...prevData,
            [name]: prevData[name].filter((_, i) => i !== index)
        }));

        if (props?.onBlur) {
            props?.onBlur()
        }
    };

    const totalSum = (Array.isArray(formData?.[name]) ? formData[name] : [])
        .reduce((acc, item) => acc + (parseFloat(item.value) || 0), 0);

    const isMaxSumReached = totalSum >= MAX_SUM;
    const isMaxInputsReached = Array.isArray(formData?.[name]) && formData[name].length >= MAX_INPUTS;

    return (
        <div className="flex flex-col gap-4">
            {Array.isArray(formData?.[name]) && formData[name].map((item, index) => (
                <div key={index} className="flex flex-col w-full gap-2">
                    <Label>{componentLabel?.replace('{id}', index + 1)}</Label>
                    <div className="flex items-center gap-5">
                        <Input
                            key={formData?.[name]}
                            type="number"
                            value={item.value}
                            onChange={(e) => handleChange(index, e.target.value)}
                            {...rest}
                        />
                        <div className="flex items-center gap-4">
                            <button
                                className="border-[2px] border-borderColor text-primary font-bold py-[1px] px-3 rounded-4xl text-3xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => handleRemoveInput(index)}
                                disabled={index === 0}
                            >
                                -
                            </button>
                            <button
                                className="border-[2px] border-borderColor text-primary font-bold py-[1px] px-2.5 rounded-4xl text-3xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleAddInput}
                                disabled={isMaxInputsReached || isMaxSumReached || !formData?.[name]?.[index]?.value}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <p className="text-sm text-gray-600">Total: {totalSum} / {MAX_SUM}</p>
        </div>
    );
};

export default AddLimitedInputs;
