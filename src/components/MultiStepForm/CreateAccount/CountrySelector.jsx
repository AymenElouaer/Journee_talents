import  { useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import countryList from 'react-select-country-list';

function CountrySelector({ value, onChange, isMulti }) {
    const options = useMemo(() => countryList().getData(), []);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            height: '45px',
            fontSize: '18px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            paddingLeft: '10px',
            width: '100%',
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0 8px',
            display: 'flex',
            flexWrap: 'nowrap',
        }),
        multiValue: (provided) => ({
            ...provided,
            fontSize: '15px',
            backgroundColor: '#e4e4e4',
            borderRadius: '4px',
            padding: '2px 5px',
            margin: '2px',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: '#333',
            fontWeight: '500',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            cursor: 'pointer',
            color: '#ff4d4f',
            ':hover': {
                color: '#ff0000',
            },
        }),
        placeholder: (provided) => ({
            ...provided,
            fontSize: '15px',
            color: '#919498',
            '@media (max-width: 768px)': {
            fontSize: '12px', // Smaller font size on small screens
        },
        }),
    };

    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            styles={customStyles}
            isMulti={isMulti}
            closeMenuOnSelect={true}
            placeholder="- - Sélectionner - -"
        />
    );
}
CountrySelector.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    onChange: PropTypes.func.isRequired,
    isMulti: PropTypes.bool
};

export default CountrySelector;
