import styled from "styled-components"
import { useEffect, useRef, useState } from "react";
import FormSelect01 from "./FormSelect01";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.5rem;
`;
const Label = styled.label`
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
    margin: 0;
`;
const SelectWrapper = styled.div`
    width: 100%;
    height: 3.5rem;
    background-color: white;
    border: 0.1rem solid #d9d9d9;
    border-radius: 0.5rem;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
`;
const InputWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Input = styled.input`
    width: 95%;
    height: 95%;
    border: none;
    outline: none;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: black;
    padding-left: 0.5rem;
    &:hover {
        cursor: pointer;
    }
    &:input:focus {
        border: none;
        outline: none;
    }
`;

export default function FormSelectWrapper01({
    label
    , type
    , id
    , name
    , forwardRef
    , placeholder
    , isOnErr
    , readOnly
}) {
    const optionRef = useRef(null);
    const [isOnOptions, setIsOnOptions] = useState(false);

    const handleInputClick = () => {
        setIsOnOptions(!isOnOptions);
    };
    useEffect(() => {
        function handleClickOutside(event) {
            if (optionRef.current && !optionRef.current.contains(event.target)) {
                setIsOnOptions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [optionRef]);

    return (
        <Wrapper>
            <Label>{label}</Label>
            <SelectWrapper>
                <InputWrapper>
                    <Input
                        placeholder={placeholder}
                        readOnly={readOnly}
                        onClick={handleInputClick}
                    ></Input>
                </InputWrapper>
                <FormSelect01
                    forwardRef={optionRef}
                    $isOn={isOnOptions}
                ></FormSelect01>
            </SelectWrapper>
        </Wrapper>
    )
}