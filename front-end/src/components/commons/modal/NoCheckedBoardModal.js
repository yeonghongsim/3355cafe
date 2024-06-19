import { useEffect, useRef } from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: ${(props) => (props.$isOn ? 'flex' : 'none')};
    // display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
`;
const Container = styled.div`
    width: 40rem;
    height: 5rem;
    background-color: white;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem 0 1rem;
    box-sizing: border-box;
`;
const Text = styled.p`
    font-size: 1.8rem;
    font-weight: normal;
    color: black;
    margin: 0;
`;
const Btn = styled.div`
    width: 10.5rem;
    height: 3.5rem;
    background-color: darkgrey;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`;

export default function NoCheckedBoardModal({
    isOn,
    handleModalClose
}) {
    const sectionRef = useRef(null);
    // 모달 외각 클릭 조작 코드
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (sectionRef.current && !sectionRef.current.contains(e.target)) {
                // 모달 외부를 클릭했을 때 모달을 닫습니다.
                handleModalClose(false);
            }
        };
        // 컴포넌트가 마운트될 때 document에 이벤트 리스너를 등록합니다.
        document.addEventListener("mousedown", handleOutsideClick);
        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };

    }, [
        isOn,
        handleModalClose
    ]);

    return (
        <Wrapper $isOn={isOn}>
            <Container ref={sectionRef}>
                <Text>선택된 게시글이 없습니다.</Text>
                <Btn onClick={() => handleModalClose()}>닫기</Btn>
            </Container>
        </Wrapper>
    )
}