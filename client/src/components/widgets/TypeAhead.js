import React, { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useDispatch } from "react-redux";

export default function TypeAhead({ id, multiple, placeholder, value, setValue, getOptions }) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSearch = (query) => {
        setIsLoading(true);
        dispatch(getOptions(query)).then((response) => {
            setOptions(response.payload.results);
            setIsLoading(false);
        });
    };

    return (
        <AsyncTypeahead
            multiple={multiple}
            id={id}
            promptText={placeholder}
            searchText={"טוען..."}
            placeholder={placeholder}
            emptyLabel={"לא נמצאו תוצאות"}
            isLoading={isLoading}
            onSearch={handleSearch}
            useCache={false}
            onChange={(value) => {
                setValue(value);
            }}
            options={options}
            selected={value}
        />
    );
}