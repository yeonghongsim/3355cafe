import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Body = styled.div`
    width: 40rem;
    height: 20rem;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.25);
    background-color: #eee;
    padding: 1rem;
    box-sizing: border-box;
    overflow: hidden; /* 텍스트가 넘치면 숨김 처리합니다. */
    text-overflow: ellipsis; /* 텍스트가 너무 길 경우 생략(...)합니다. */
    white-space: nowrap;
`;

export default function Test503() {
    return (
        <Wrapper>
            <Body>1sasdasdasdasdasdasdassdasdasdasdasd</Body>
        </Wrapper>
    )
}