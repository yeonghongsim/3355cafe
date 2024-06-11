import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const BodySection = styled.section`
    width: 80rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: white;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    padding: 0.5rem;
    box-sizing: border-box;
`;
const Layer = styled.div`
    width: 100%;
`;
const BackOrUpdateTextContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem 0 1rem;
    box-sizing: border-box;
`;
const BackOrUpdateText = styled.p`
    font-size: 1.65rem;
    font-weight: normal;
    color: black;
    &:hover {
        color: blue;
        text-decoration: underline;
        cursor: pointer;
    }
`;
const ProfileContainer = styled.div`
    width: 100%;
    height: 20rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const ProfileImgContainer = styled.div`
    width: 20rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ProfileImgWrapper = styled.div`
    width: 12rem;
    height: 12rem;
    background-color: #d9d9d9;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`;
const ProfileImg = styled.img`
    // width: 65%;
    width: ${(props) => (props.$selectedImg ? '100%' : '65%')};
    // height: 65%;
    height: ${(props) => (props.$selectedImg ? '100%' : '65%')};
    flex-shrink: 0;
`;
const ProfileTextContainer = styled.div`
    width: calc(100% - 20rem);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;
`;
const ProfileText = styled.p`
    font-size: 1.6rem;
    font-weight: normal;
    margin: 0;
`;
const BirthText = styled.span`
    font-size: 1.6rem;
    font-weight: normal;
    margin: 0;
    padding-left: 0.5rem;
`;

export default function UserInfoPage() {
    const userInfo = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const birthYear = userInfo?.birth.split('/')[2];
    const birthMonth = userInfo?.birth.split('/')[0];
    const birthDay = userInfo?.birth.split('/')[1];
    let selectedImg;
    if (userInfo?.profileImgURL !== null) {
        selectedImg = true;
    } else {
        selectedImg = false;
    }
    const moveToHomePage = (path) => {
        navigate(path);
    };

    return (
        <Wrapper>
            <BodySection>
                <Layer>
                    <BackOrUpdateTextContainer>
                        <BackOrUpdateText
                            onClick={() => moveToHomePage('/')}
                        >홈페이지로 가기</BackOrUpdateText>
                        <BackOrUpdateText
                            onClick={() => moveToHomePage('/update/userInfo')}
                        >내 정보 수정</BackOrUpdateText>
                    </BackOrUpdateTextContainer>
                </Layer>
                <Layer>
                    <ProfileContainer>
                        <ProfileImgContainer>
                            <ProfileImgWrapper>
                                {
                                    userInfo?.profileImgName === null ?
                                        <ProfileImg src="/image/profile.svg"></ProfileImg>
                                        : <ProfileImg
                                            src={userInfo?.profileImgURL}
                                            alt={userInfo?.profileImgName}
                                            $selectedImg={selectedImg}
                                        ></ProfileImg>
                                }
                            </ProfileImgWrapper>
                        </ProfileImgContainer>
                        <ProfileTextContainer>
                            <ProfileText>이름 : {userInfo?.userName}</ProfileText>
                            <ProfileText>성별 : {userInfo?.gender}</ProfileText>
                            <ProfileText>생일 :
                                <BirthText>{birthYear}</BirthText>년
                                <BirthText>{birthMonth}</BirthText>월
                                <BirthText>{birthDay}</BirthText>일
                            </ProfileText>
                            <ProfileText>연락처 : {userInfo?.phoneNumber}</ProfileText>
                        </ProfileTextContainer>
                    </ProfileContainer>
                </Layer>
            </BodySection>
        </Wrapper>
    )
}