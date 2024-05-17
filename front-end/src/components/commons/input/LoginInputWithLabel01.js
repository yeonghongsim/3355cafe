import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    // height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    box-sizing: border-box;
`;
const Label = styled.label`
    font-size: 1.8rem;
    font-weight: bold;
    color: black;
    margin: 0;
    margin-top: 1rem;
`;
const InputWrapper = styled.div`
    width: 100%;
    height: 5rem;
    // background-color: #d9d9d9;
    box-sizing: border-box;
    border: 0.1rem solid #d9d9d9;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Input = styled.input`
    width: 100%;
    height: 95%;
    border: none;
    outline: none;
    padding-left:0.5rem;
    border-radius: 0.5rem;
    font-size: 1.8rem;
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

export default function LoginInputWithLabel01({
    placeholder
    , label
    , id
    , name
    , type
    , forwardRef
}) {
    return (
        <Wrapper>
            <Label htmlFor={id}>{label}</Label>
            <InputWrapper>
                <Input
                    id={id}
                    name={name}
                    type={type}
                    autoComplete="off"
                    placeholder={placeholder}
                    ref={forwardRef}
                ></Input>
            </InputWrapper>
        </Wrapper>
    )
}