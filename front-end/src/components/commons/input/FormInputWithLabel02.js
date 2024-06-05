import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0.5rem;
    box-sizing: border-box;
`;
const Label = styled.label`
    font-size: 1.6rem;
    font-weight: normal;
    color: black;
    margin: 0;
`;
const InputWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // border: 0.1rem solid #d9d9d9;
    border: ${(props) => (props.$isOnErr ? '0.1rem solid red' : '0.1rem solid #d9d9d9')};
    border-radius: 0.5rem;
    box-sizng: border-box;
`;
const Input = styled.input`
    width: 95%;
    border: none;
    outline: none;
    padding-left: 0.5rem;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: black;
    box-sizing: border-box;
    &:input:focus {
        border: none;
        outline: none;
    }
`;

export default function FormInputWithLabel02({
    label,
    forwardRef,
    id,
    name,
    defaultValue,
    placeholder,
    onInput,
    isOnErr,
    type,
    readOnly
}) {
    return (
        <Wrapper>
            <Label htmlFor={name}>{label}</Label>
            <InputWrapper
                $isOnErr={isOnErr}
            >
                <Input
                    id={id}
                    name={name}
                    ref={forwardRef}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onInput={onInput}
                    autoComplete="off"
                    type={type}
                    readOnly={readOnly}
                ></Input>
            </InputWrapper>
        </Wrapper>
    )
}