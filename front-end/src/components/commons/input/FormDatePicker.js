import styled from "styled-components"

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
const InputWrapper = styled.div`
    width: 100%;
    height: 3.5rem;
    background-color: white;
    border: 0.1rem solid #d9d9d9;
    border-radius: 0.5rem;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
// const Input = styled.input`
//     width: 95%;
//     border: none;
//     outline: none;
//     padding: 0.7rem 0 0 0.5rem;
//     border-radius: 0.5rem;
//     font-size: 1.6rem;
//     font-style: normal;
//     font-weight: 400;
//     line-height: normal;
//     color: black;
//     box-sizing: border-box;
//     &:focus {
//         border: none;
//         outline: none;
//     }
// `;

export default function FormDatePicker({
    label
    , type
    , id
    , name
    , forwardRef
    , placeholder
    , readOnly
}) {

    return (
        <Wrapper>
            <Label>{label}</Label>
            {/* <Label htmlFor={id}>{label}</Label> */}
            <InputWrapper>
                {/* <Input
                    type={type}
                    id={id}
                    name={name}
                    autoComplete="off"
                    ref={forwardRef}
                    placeholder={placeholder}
                    readOnly={readOnly}
                ></Input> */}
            </InputWrapper>
        </Wrapper>
    )
}