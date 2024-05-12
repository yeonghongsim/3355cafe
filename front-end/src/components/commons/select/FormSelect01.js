import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 3.5rem;
    background-color: white;
    border: 0.1rem solid #d9d9d9;
    border-radius: 0.5rem;
    box-sizing: border-box;
    position: absolute;
    top: 100%;
    left: 0%;
    z-index: 2;
    display: ${(props) => (props.$isOn ? "flex" : "none")};
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    &:hover {
        cursor: pointer;
    }
`;

export default function FormSelect01({
    props
    , forwardRef
    , $isOn
}) {
    return (
        <Wrapper ref={forwardRef} $isOn={$isOn}>
        </Wrapper >
    )
}