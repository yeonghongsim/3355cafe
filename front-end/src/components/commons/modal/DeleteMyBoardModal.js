import { useEffect, useRef } from "react";
import styled from "styled-components"
import store from "../../../commons/store/store";
import { setBoardTypeList } from "../../../commons/store/boardTypeList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    height: 15rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: white;
    border-radius: 0.5rem;
    box-sizing: border-box;
`;
const ContentContainer = styled.div`
    width: 100%;
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 1rem;
    box-sizing: border-box;
`;
const BtnContainer = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
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
    background-color: ${(props) => (props.$bgColor)};
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

export default function DeleteMyBoardModal({
    isOn,
    handleModalClose,
    userId,
    whatDeleteBoardList
}) {
    const navigate = useNavigate();

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
    // 삭제를 위한 fetchhandler
    const fetchBoardTypeList = async () => {
        try {
            console.log(whatDeleteBoardList);
            console.log(userId);
            console.log('삭제 쿼리 시작');
            // // 게시글 삭제를 위한 통신 코드
            const fullURL = `http://localhost:8080/delete/myBoardList`;
            const response = await axios.delete(fullURL, {
                data: { whatDeleteBoardList, userId }
            });
            const newMyBoardList = response.data.boardList;
            store.dispatch(setBoardTypeList(newMyBoardList));
            navigate('/board');
        } catch (error) {
            console.error('Error getting itemType data:', error);
            throw error;
        }
    };

    return (
        <Wrapper $isOn={isOn}>
            <Container ref={sectionRef}>
                <ContentContainer>
                    <Text>{whatDeleteBoardList.length} 개의 게시글을 정말로 삭제하시겠습니까?</Text>
                </ContentContainer>
                <BtnContainer>
                    <Btn
                        $bgColor="darkgrey"
                        onClick={() => handleModalClose()}
                    >취소하기</Btn>
                    <Btn
                        $bgColor="red"
                        onClick={() => fetchBoardTypeList()}>삭제하기</Btn>
                </BtnContainer>
            </Container>
        </Wrapper>
    )
}