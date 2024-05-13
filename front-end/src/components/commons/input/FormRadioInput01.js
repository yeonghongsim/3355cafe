import styled from "styled-components"

const InputWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;
const Input = styled.input`
    border: none;
    outline: none;
    &:focus {
        border: none;
        outline: none;
    }
    margin: 0;
    &:hover {
        cursor: pointer;
    }
`;
const Label = styled.label`
    font-size: 1.6rem;
    font-weight: normal;
    color: black;
    margin: 0;
    padding-left: 0.1rem;
    &:hover {
        cursor: pointer;
    }
`;

export default function FormRadioInput01({
    option
    , type
    , id
    , forwardRef
}) {
    const handleGenderValue = (value) => {
        forwardRef.current.value = value;
    };

    return (
        <InputWrapper>
            <Input
                type={type}
                id={option.value}
                name={id}
                defaultChecked={option.index === 1}
                value={option.value}
                onChange={() => handleGenderValue(option.value)}
            ></Input>
            <Label htmlFor={option.value}>{option.label}</Label>
        </InputWrapper>
    )
}