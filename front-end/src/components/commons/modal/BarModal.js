import { useEffect, useRef } from "react";
import styled from "styled-components"
import LoginBtn from "../button/LoginBtn";
import SignupBtn from "../button/SignupBtn";

const Wrapper = styled.div`
    width: 25rem;
    max-height: ${(props) => (props.ison === 'true' ? "100rem" : 0)};
    background-color: white;
    border-radius: 0.5rem;
    position: absolute;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.2);
    top: 90%;
    right: 0;
    overflow: hidden;
    opacity: ${(props) => (props.ison === 'true' ? 1 : 0)};
    transition: all 1.2s ease-in-out;
    z-index: 200;
    padding: 0.5rem;
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
const ProfileContainer = styled.div`
    width: 100%;
    height: 6rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const ProfileImageContainer = styled.div`
    width: 6rem;
    height: 100%;
    padding: 0.3rem;
    box-sizing: border-box;
`;
const ProfileImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d9d9d9;
`;
const ProfileImage = styled.img`
    width: 60%;
    height: 60%;
    flex-shrink: 1;
`;
const ProfileNameContainer = styled.div`
    width: calc(100% - 6rem);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 1rem;
    box-sizing: border-box;
    gap: 0.5rem;
`;
const ProfileName = styled.p`
    font-size: 1.8rem;
    font-weight: normal;
    color: black;
    margin: 0;
`;
const ProfileText = styled.span`
    font-size: 1.4rem;
    font-weight: normal;
    color: black;
    margin: 0;
    padding-left: 0.5rem;
`;
const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    box-sizing: border-box;
`;
const ContentText = styled.p`
    font-size: 1.6rem;
    font-weight: normal;
    color: black;
    margin: 0;
    &:hover {
        color: blue;
        cursor: pointer;
        text-decoration: underline;
    }
    &:hover::after {
        color: black;
    }
    ${props => props.aftertext && `
    &::after {
        content: "|";
        padding: 0 0.5rem 0 0.5rem;
        font-size: 1.2rem;
        font-weight: bold;
    }
    `}
`;
const ButtonContainer = styled.div`
    width: 100%;
    height: 5rem;
    padding: 0.5rem;
    box-sizing: border-box;
`;

export default function BarModal({
    props
    , ison
    , handleModalClose
}) {
    const modalRef = useRef(null);

    useEffect(() => {
        let handleClickOutside;
        if (ison) {
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
        ison
        , handleModalClose
        , modalRef
    ]);

    return (
        <Wrapper ison={ison} ref={modalRef}>
            <ModalContainer>
                <ProfileContainer>
                    <ProfileImageContainer>
                        <ProfileImageWrapper>
                            <ProfileImage src="/image/profile.svg"></ProfileImage>
                        </ProfileImageWrapper>
                    </ProfileImageContainer>
                    <ProfileNameContainer>
                        <ProfileName>Guest
                            <ProfileText>님</ProfileText>
                        </ProfileName>
                    </ProfileNameContainer>
                </ProfileContainer>
                <ContentContainer>
                    <ContentText aftertext="true">회원 정보</ContentText>
                    <ContentText aftertext="false">게시글(n)</ContentText>
                </ContentContainer>
                <ButtonContainer>
                    <LoginBtn></LoginBtn>
                </ButtonContainer>
                <ButtonContainer>
                    <SignupBtn></SignupBtn>
                </ButtonContainer>
            </ModalContainer>
        </Wrapper>
    )
}