import { useState } from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Content = styled.div`
    width: 50rem;
    height: 50rem;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Btn = styled.div`
    width: 21rem;
    height: 7rem;
    border-radius: 0.5rem;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`;
const ResultText = styled.p`
    color: black;
    font-size: 3rem;
    font-weight: bold;
`;


export default function Test3If() {
    const test1 = useState(false);
    // const test1 = useState(true);
    const test2 = useState(false);
    // const test2 = useState(true);
    const test3 = useState(false);
    // const test3 = useState(true);

    let [result, setResult] = useState('');
    const handleClick = () => {
        // test1, test2, test3 상태 중 하나라도 true인지 검사
        if (test1[0] || test2[0] || test3[0]) {
            // 하나라도 true라면 result = true
            setResult('true');
        } else {
            // 전부다 false 라면 result = false
            setResult('false');
        }

    };

    return (
        <Wrapper>
            <Content>
                <Btn onClick={() => handleClick()}>결과보기</Btn>
                <ResultText>
                    result = {result}
                </ResultText>
            </Content>
        </Wrapper>
    )
}