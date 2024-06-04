import styled from "styled-components";
import { COLORS } from "../../../commons/styles/COLORS";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: ${(props) => (props.$isOn ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
`;
const ModalSection = styled.section`
    width: 40rem;
    height: 18rem;
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const ModalBody = styled.div`
    width: 100%;
    height: 13rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;
const Text = styled.p`
    font-size: 2rem;
    font-weight: normal;
    color: black;
    margin: 0;
`;
const BtnContainer = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
`;
const Btn = styled.div`
    width: 12rem;
    height: 4rem;
    background-color: ${props => props.$bgColor};
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.8rem;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`;

export default function UnLoginAlertModal({
    isOn,
    handleCloseModal
}) {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const goLoginPage = () => {
        navigate('/login');
    };
    // 모달 외각 클릭 조작 코드
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (sectionRef.current && !sectionRef.current.contains(e.target)) {
                // 모달 외부를 클릭했을 때 모달을 닫습니다.
                handleCloseModal(false);
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
        handleCloseModal
    ]);

    return (
        <Wrapper $isOn={isOn}>
            <ModalSection ref={sectionRef}>
                <ModalBody>
                    <Text>회원 전용 서비스입니다.</Text>
                    <Text>로그인 하시겠습니까?</Text>
                </ModalBody>
                <BtnContainer>
                    <Btn
                        $bgColor="darkgray"
                        onClick={handleCloseModal}
                    >취소</Btn>
                    <Btn
                        $bgColor={COLORS.blueColor}
                        onClick={goLoginPage}
                    >확인</Btn>
                </BtnContainer>
            </ModalSection>
        </Wrapper>
    )
}