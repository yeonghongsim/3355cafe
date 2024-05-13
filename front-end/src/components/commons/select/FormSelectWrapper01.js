import styled from "styled-components"
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
    border-radius: 0.5rem;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
`;

export default function FormSelectWrapper01({
    label
    , type
    , id
    , name
    , forwardRef
    , isOnErr
}) {

    return (
        <Wrapper>
            <Label htmlFor={id}>{label}</Label>
            <SelectWrapper>
                <FormSelect01
                    id={id}
                    name={name}
                    type={type}
                    forwardRef={forwardRef}
                    isOnErr={isOnErr}
                ></FormSelect01>
            </SelectWrapper>
        </Wrapper>
    )
}