import { useEffect, useRef } from "react";
import styled from "styled-components"
import { COLORS } from "../../../commons/styles/COLORS";
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    display: ${(props) => (props.$isOn ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    z-index: 200;
`;
const ContentSection = styled.section`
    width: 40rem;
    // height: 15rem;
    background-color: white;
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const ContentContainer = styled.div`
    width: 100%;
    height: 8.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const BtnContainer = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
`;
const Btn = styled.div`
    width: 10rem;
    height: 4rem;
    background-color: ${(props) => props.$bgColor};
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
const Text = styled.p`
    font-size: 2.4rem;
    font-weight: bold;
    color: black;
    margin: 0;
`;

export default function ResiBoardConfirmModal({
    isOn,
    prepareDate,
    handleModalClose
}) {
    const navigate = useNavigate();
    // ref
    const sectionRef = useRef(null);
    // 외각 클릭 모달 닫기
    useEffect(() => {
        function handleClickOutside(event) {
            if (sectionRef.current && !sectionRef.current.contains(event.target)) {
                handleModalClose(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleModalClose]);

    // save to db
    const handleRegiBoard = async () => {
        try {
            const response = await fetch('http://localhost:8080/register/board', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prepareDate)
            });

            if (response.ok) {
                navigate('/board');
            } else {
                console.log('Failed to save data');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };


    return (
        <Wrapper $isOn={isOn}>
            <ContentSection ref={sectionRef}>
                <ContentContainer>
                    <Text>게시글을 등록 하시겠습니까?</Text>
                </ContentContainer>
                <BtnContainer>
                    <Btn
                        $bgColor="darkgray"
                        onClick={handleModalClose}
                    >취소</Btn>
                    <Btn
                        $bgColor={COLORS.blueColor}
                        onClick={handleRegiBoard}
                    >확인</Btn>
                </BtnContainer>
            </ContentSection>
        </Wrapper>
    )
}