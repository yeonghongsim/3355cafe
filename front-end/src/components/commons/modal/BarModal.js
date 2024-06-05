import { useEffect, useRef } from "react";
import styled from "styled-components"
import LoginBtn from "../button/LoginBtn";
import SignupBtn from "../button/SignupBtn";
import LogoutBtn from "../button/LogoutBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    width: 25rem;
    max-height: ${(props) => (props.$isOn === 'true' ? "100rem" : 0)};
    background-color: white;
    border-radius: 0.5rem;
    position: absolute;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.2);
    top: 90%;
    right: 0;
    overflow: hidden;
    opacity: ${(props) => (props.$isOn === 'true' ? 1 : 0)};
    transition: max-height .9s ease-in-out, opacity .78s ease-in-out;
    // transition: all 0.9s ease-in-out;
    z-index: 200;
    padding: 0.5rem;
    box-sizing: border-box;
    // display: ${(props) => (props.$isOn ? 'block' : 'none')};
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
    ${props => props.$afterText && `
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
const BoardLengthText = styled.span`
    font-size: 1.8rem;
    font-weight: normal;
    color: black;
    margin: 0;
    padding: 0 0.3rem 0 0.3rem;
`;

export default function BarModal({
    isOn
    , handleModalClose
}) {
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.user);
    const myBoardList = useSelector((state) => state.myBoardList.myBoardList);
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
    const moveToUserInfoPage = () => {
        navigate('/userInfo');
    };

    return (
        <Wrapper $isOn={isOn} ref={modalRef}>
            <ModalContainer>
                <ProfileContainer>
                    <ProfileImageContainer>
                        <ProfileImageWrapper>
                            <ProfileImage src="/image/profile.svg"></ProfileImage>
                        </ProfileImageWrapper>
                    </ProfileImageContainer>
                    <ProfileNameContainer>
                        <ProfileName>
                            {
                                userInfo === null ?
                                    'Guest' : userInfo.userName
                            }
                            <ProfileText>님</ProfileText>
                        </ProfileName>
                    </ProfileNameContainer>
                </ProfileContainer>
                {
                    userInfo === null ?
                        <>
                            <ButtonContainer>
                                <LoginBtn></LoginBtn>
                            </ButtonContainer>
                            <ButtonContainer>
                                <SignupBtn></SignupBtn>
                            </ButtonContainer>
                        </>
                        :
                        <>
                            <ContentContainer>
                                <ContentText
                                    $afterText="true"
                                    onClick={moveToUserInfoPage}
                                >회원 정보</ContentText>
                                <ContentText $afterText="false">
                                    내 게시글(
                                    <BoardLengthText>{myBoardList.length}</BoardLengthText>
                                    )개</ContentText>
                            </ContentContainer>
                            <ButtonContainer>
                                <LogoutBtn
                                    handleModalClose={handleModalClose}
                                ></LogoutBtn>
                            </ButtonContainer>
                        </>
                }
            </ModalContainer>
        </Wrapper>
    )
}