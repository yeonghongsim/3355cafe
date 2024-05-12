import styled from "styled-components"
import ReactDatePicker from "../../commons/datePicker/ReactDatePicker";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function Test1() {
    return (
        <Wrapper>
            <ReactDatePicker></ReactDatePicker>
        </Wrapper>
    )
}
