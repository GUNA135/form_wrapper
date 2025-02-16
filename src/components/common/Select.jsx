import React, { useEffect, useRef, useState } from 'react';

const Select = (props) => {
  const { defaultValue, name, onChange, options = [], placeholder, onBlur, disabled = false } = props;
  const [openOption, setOpenOption] = useState(false);

  const selectRef = useRef(null);

  const isOpenOrCloseOption = () => {
    if (!disabled) {
      setOpenOption(!openOption);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpenOption(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const valueToLabelMap = new Map(options.map(item => [item.value, item.label]));

  const getLabelByValue = (value) => valueToLabelMap.get(value) || 'Not Found';

  const handleSelect = (value) => {
    if (disabled) return;

    const e = {
      target: {
        name: name,
        value: value
      }
    };

    if (onChange) {
      onChange(e);

      setTimeout(() => {
        setOpenOption(false);
      }, 0);
    }
  };

  useEffect(() => {
    if (onBlur && defaultValue && defaultValue?.length > 0) {
      onBlur();
    }
  }, [defaultValue]);

  return (
    <div
      className={`border-[2px] h-[50px] relative w-full text-textPrimary box-border select-none rounded-sm border-borderColor
        ${disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'focus-within:border-primary'}
      `}
      ref={selectRef}
      tabIndex="0"
    >
      <p
        className={`text-[16px] font-medium h-full flex items-center px-2 box-border relative z-[10] 
          ${disabled ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer'}
        `}
        onClick={isOpenOrCloseOption}
      >
        {defaultValue && defaultValue?.toString()?.length > 0
          ? getLabelByValue(defaultValue)
          : placeholder}
      </p>

      {openOption && !disabled && (
        <div
          className="border-[2px] border-borderColor min-h-[40px] max-h-[200px] overflow-auto box-border rounded-sm bg-white z-20 absolute top-full left-0 w-full mt-1 shadow-md"
        >
          {options &&
            options.length > 0 &&
            options.map((option, index) => (
              <p
                key={index}
                onClick={() => handleSelect(option?.value)}
                className="h-[40px] text-[16px] font-medium flex items-center px-2 hover:bg-hoverBg cursor-pointer box-border"
              >
                {option?.label}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

export default Select;
