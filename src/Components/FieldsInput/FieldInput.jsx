import React from 'react';
import style from './FieldInput.module.css';

const FieldInput = ({
    id,
    type = "date",
    //label
    label,
    classNameLabel = '',
    //input
    classNameInput = '',
    name,
    value,
    onChange,
    isChecked,
    width,
    maxWidth,
    allowedit,
}) => {
    if (type === true || false) {
        return (
            <div className={`${style.main} form-check form-switch`}>
                <label className={`$ form-check-label`} htmlFor={id}>{label}</label>
                <input onChange={onChange} checked={isChecked} style={{ margin: "0", marginBottom: "-10px", padding: "6px", width: "30px" }} className="form-check-input" type="checkbox" role="switch" id={id} />
            </div>
        );
    }

    return (
        <div className={`${style.main} mt-1 col-3  `} style={{ backgroundColor: '#fafafa' }}>
            <label htmlFor={id} className={classNameLabel}>{label}</label>
            <div style={{ width: '100%' }}>
                <input
                    
                    id={id}
                    type={type}
                    className={classNameInput}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default FieldInput;