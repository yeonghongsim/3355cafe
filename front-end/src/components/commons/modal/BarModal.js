import { useEffect, useRef } from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    width: 25rem;
    max-height: ${(props) => (props.isOn ? "100rem" : 0)};
    background-color: white;
    border-radius: 0.5rem;
    position: absolute;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.2);
    top: 90%;
    right: 0;
    overflow: hidden;
    opacity: ${(props) => (props.isOn ? 1 : 0)};
    transition: all .9s ease-out;
    z-index: 200;
    padding: 1rem;
    box-sizing: border-box;
`;
const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const Tester1 = styled.div`
    width: 100%;
    height: 5rem;
    background-color: #eee;
`;
const Tester2 = styled.div`
    width: 100%;
    height: 8rem;
    background-color: #d9d9d9;
`;
const Tester3 = styled.div`
    width: 100%;
    height: 4rem;
    background-color: #eee;
`;

export default function BarModal({ props, isOn, handleModalClose }) {
    const modalRef = useRef(null);

    useEffect(() => {
        let handleClickOutside;
        if (isOn) {
            handleClickOutside = (e) => {
                if (modalRef.current && !modalRef.current.contains(e.target)) {
                    handleModalClose();
                }
            };
            window.addEventListener("click", handleClickOutside);
        }
        return () => {
            window.removeEventListener("click", handleClickOutside);
        }
    }, [
        isOn
        , handleModalClose
        , modalRef
    ]);

    return (
        <Wrapper isOn={isOn} ref={modalRef}>
            <ModalContainer>
                <Tester1>프로필 영역 / 프로필 사진,아이디, 게시글(n개)</Tester1>
                <Tester2>유저 사용정보 / 정보관리, 게시글관리</Tester2>
                <Tester3>로그인버튼</Tester3>
                <Tester3>가입버튼</Tester3>
            </ModalContainer>
        </Wrapper>
    )
}