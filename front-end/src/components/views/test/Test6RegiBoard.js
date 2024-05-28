import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Form = styled.div`
    width: 60rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 0.5rem;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.15);
    background-color: white;
    padding: 0.5rem;
    box-sizing: border-box;
`;
const Layer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const InputContainer = styled.div`
    width: 100%;
    height: 5rem;
    background-color: #eee;
`;
const TextareaContainer = styled.div`
    width: 100%;
    height: 50rem;
    background-color: #d9d9d9;
`;
const BtnContainer = styled.div`
    width: 100%;
    height: 5rem;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function Test6RegiBoard() {
    return (
        <Wrapper>
            <Form>
                <Layer>
                    <InputContainer>제목</InputContainer>
                </Layer>
                <Layer>
                    <TextareaContainer>내용</TextareaContainer>
                </Layer>
                <Layer>
                    <BtnContainer>btn</BtnContainer>
                </Layer>
            </Form>
        </Wrapper>
    )
}