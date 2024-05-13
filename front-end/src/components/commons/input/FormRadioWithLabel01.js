import styled from "styled-components"
import FormRadioInput01 from "./FormRadioInput01";

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
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: 1rem;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.2);
`;
const HideInput = styled.input`
    display: none;
`

export default function FormRadioWithLabel01({
    label
    , type
    , id
    , forwardRef
    , options
}) {
    return (
        <Wrapper>
            <HideInput ref={forwardRef} defaultValue={options[0].value}></HideInput>
            <Label>{label}</Label>
            <InputWrapper>
                {
                    options.map((option, i) =>
                        <FormRadioInput01
                            key={i}
                            option={option}
                            type={type}
                            id={id}
                            forwardRef={forwardRef}
                        ></FormRadioInput01>
                    )
                }
            </InputWrapper>
        </Wrapper>
    )
}