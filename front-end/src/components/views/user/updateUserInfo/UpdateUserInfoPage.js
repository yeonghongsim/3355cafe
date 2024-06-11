import { useSelector } from "react-redux";
import styled from "styled-components"
import FormInputWithLabel02 from "../../../commons/input/FormInputWithLabel02";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from 'browser-image-compression';
import UpdateUserInfoModal from "../../../commons/modal/UpdateUserInfoModal";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;
const BodySection = styled.section`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;

    @media screen and (max-width: 1024px){
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
`;
const FormContainer = styled.div`
    width: 50rem;
    height: 25rem;
    background-color: white;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.25);
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const Form = styled.form`
    width: 100%;
    height: 75%;
`;
const IdPwContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.5rem;
`;
const InfoContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const ImgContainer = styled.div`
    width: 15rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;
const ImgWrapper = styled.div`
    width: 12rem;
    height: 12rem;
    background-color: #d9d9d9;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    // margin-top: 2rem;
    box-sizing: border-box;
`;
const Img = styled.img`
    width: ${(props) => (props.$isSelectedImg ? '100%' : '55%')};
    height: ${(props) => (props.$isSelectedImg ? '100%' : '55%')};
    flex-shrink: 0;
`;
const ImgUplodaBtn = styled.div`
    width: 80%;
    height: 4rem;
    background-color: ${(props) => (props.$bgColor)};
    transition: all 0.8s;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    opacity: 0.8;
    &:hover {
        cursor: pointer;
        scale: 1.03;
        opacity: 1;
    }
`;
const NameNumberContainer = styled.div`
    width: calc(100% - 15rem);
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
    justify-content: center;
`;
const InputWrapper = styled.div`
    width: 100%;
    height: 8rem;
`;
const BtnContainer = styled.div`
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Btn = styled.div`
    width: 15rem;
    height: 5rem;
    background-color: #3572EF;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    transition: all 0.8s;
    &:hover {
        cursor: pointer;
        background-color: blue;
    }
`;
const HideInput = styled.input`
    display: none;
`;
const FootSection = styled.section`
    width: 70%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;
const LinkText = styled.p`
    font-size: 1.6rem;
    font-weight: normal;
    color: black;
    margin: 0;
    &:hover {
        cursor: pointer;
        color: blue;
        text-decoration: underline;
    }
`;

export default function UpdateUserInfoPage() {
    const navigate = useNavigate();
    // get userInfo from store
    const userInfo = useSelector((state) => state.user.user);
    // console.log(userInfo);
    // refs
    const userIdRef = useRef(null);
    const userPwRef = useRef(null);
    const userNameRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const imgRef = useRef(null);
    // error states
    let [isOnErrUserId, setIsOnErrUserId] = useState(false);
    let [isOnErrUserPw, setIsOnErrUserPw] = useState(false);
    let [isOnErrUserName, setIsOnErrUserName] = useState(false);
    let [isOnErrPhoneNumber, setIsOnErrPhoneNumber] = useState(false);
    // 회원 이미지 정보로 초기 데이터 세팅
    let profileImage;
    if (userInfo?.profileImgURL === null) {
        profileImage = '/image/profile.svg';
    } else {
        profileImage = userInfo?.profileImgURL;
    }
    // 선택된 사진 URL
    let [selectedImg, setSelectedImg] = useState(profileImage);
    // console.log(selectedImg);
    // 사진 선택 유무
    let noneProfileImg;
    if (profileImage === '/image/profile.svg') {
        noneProfileImg = false;
    } else {
        noneProfileImg = true;
    }
    // img selected boolean
    let [isSelectedImg, setIsSelectedImg] = useState(noneProfileImg);
    // changed img info
    let [changedImgInfo, setChangedImgInfo] = useState({
        profileImgName: userInfo?.profileImgName,
        profileImgURL: userInfo?.profileImgURL
    });
    // confirmModal
    let [isOnUpdateModal, setIsOnUpdateModal] = useState(false);
    // whatUpdate ? loginfo or userInfo
    let [whatUpdate, setWhatUpdate] = useState('');
    // prepareData
    let [prepareData, setPrepareData] = useState({});
    const handleCloseModal = () => {
        setIsOnUpdateModal(false);
    };
    const handleUpdateUserLog = () => {
        const userId = userIdRef.current.value;
        const userPassword = userPwRef.current.value;
        const data = {
            userId: userId,
            userPassword: userPassword,
        }
        // console.log(data);
        // 데이터 유효성 검사하기
        // 아이디
        // 숫자,영문 각 최소 하나 이상 포함한 6-15자리
        const idValid = /^(?!.*[!@#$%^&*(),.?":{}|<>])(?!.*[ㄱ-ㅎㅏ-ㅣ가-힣])(?=.*[a-zA-Z])(?=.*\d).{6,15}$/.test(userId);
        if (!idValid) {
            // console.log('부적합');
            setIsOnErrUserId(true);
        } else {
            // console.log('적합');
            setIsOnErrUserId(false);
        }
        // 비밀번호
        // 조건 : 숫자,영문,특수기호 각 최소 하나이상 포함 10-20자리
        const pwValid = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z])(?=.*\d)(?=\S+$).{10,20}$/.test(userPassword);
        if (!pwValid) {
            // console.log('부적합');
            setIsOnErrUserPw(true);
        } else {
            // console.log('적합');
            setIsOnErrUserPw(false);
        }
        if (idValid && pwValid) {
            setIsOnUpdateModal(true);
            setWhatUpdate('logInfo');
            setPrepareData(data);
        } else {
            setWhatUpdate('');
            setPrepareData({});
        }
    };
    const handleUpdateUserInfo = () => {
        const userName = userNameRef.current.value;
        const phoneNumber = phoneNumberRef.current.value;
        const data = {
            profileImgURL: changedImgInfo.profileImgURL,
            profileImgName: changedImgInfo.profileImgName,
            userName: userName,
            phoneNumber: phoneNumber,
        }
        // console.log(data)
        // 데이터 유효성 검사하기
        // 프로필이름
        // 프로필경로
        // 유저 이름
        // 조건 : 한글만 입력되어 있는지
        const nameValid = /^[가-힣]+$/u.test(data.userName);
        if (!nameValid) {
            // console.log('부적합');
            setIsOnErrUserName(true);
        } else {
            // console.log('적합');
            setIsOnErrUserName(false);
        }
        // 연락처
        const phoneNumberValidBefore = /^[0-9]*$/.test(data.phoneNumber);
        const phoneNumberValid = !phoneNumberValidBefore || data.phoneNumber.length !== 8;
        if (phoneNumberValid) {
            // console.log('부적합');
            setIsOnErrPhoneNumber(true);
        } else {
            // console.log('적합');
            setIsOnErrPhoneNumber(false);
        }
        // phoneNumber change XXXXXXXX -> 010-XXXX-XXXX
        data.phoneNumber = '010-' + data.phoneNumber.slice(0, 4) + '-' + data.phoneNumber.slice(4, 8);
        if (nameValid && !phoneNumberValid) {
            setIsOnUpdateModal(true);
            setWhatUpdate('userInfo');
            setPrepareData(data);
        } else {
            setWhatUpdate('');
            setPrepareData({});
        }
    };
    // 파일 삭제 및 모든 정보 초기화
    const handleFileRemove = () => {
        // console.log('img file delete btn click');
        setSelectedImg('/image/profile.svg');
        setIsSelectedImg(false);
        setChangedImgInfo({
            profileImgName: null,
            profileImgURL: null
        });
    };
    // 이미지 파일 등록 버튼 클릭
    const handleFileClick = () => {
        imgRef.current.click();
    };
    // Blob 데이터를 Base64로 인코딩하는 함수
    const readFileAsDataURL = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(file);
        });
    };
    // 이미지 파일 축소
    const compressAndEncodeImage = async (file) => {
        const options = {
            maxSizeMB: 0.5, // 최대 파일 크기 (0.5MB로 설정)
            maxWidthOrHeight: 800, // 이미지 최대 폭 또는 높이 800px
            useWebWorker: true, // 웹 워커 사용 여부
        };
        try {
            const compressedFile = await imageCompression(file, options);
            const compressedDataURL = await readFileAsDataURL(compressedFile);
            return compressedDataURL;
        } catch (error) {
            console.error('이미지 압축 오류: ', error);
            return null;
        }
    };
    // 파일 변경 함수
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // 이미지 압축 후 Base64로 인코딩
                const compressedImage = await compressAndEncodeImage(file);
                if (compressedImage) {
                    const fileUrl = compressedImage;
                    setSelectedImg(fileUrl);
                    setIsSelectedImg(true);
                    setChangedImgInfo({
                        profileImgName: file.name,
                        profileImgURL: fileUrl
                    });
                } else {
                    // 압축에 실패한 경우에 대한 처리 (예: 알림, 기타 로직 추가)
                    console.error('이미지 압축에 실패했습니다.');
                }
            } catch (error) {
                console.error("Error encoding file:", error);
            }
        }
    };
    const handleInputFireSpace = (e) => {
        const newValue = e.target.value.replace(/\s+/g, '');
        if (newValue !== e.target.value) {
            // 공백이 제거된 경우, input 필드의 값을 업데이트합니다.
            e.target.value = newValue;
        }
    };
    const moveToHomePage = (path) => {
        navigate(path);
    };
    return (
        <Wrapper>
            <BodySection>
                <FormContainer>
                    <Form>
                        <IdPwContainer>
                            <InputWrapper>
                                <FormInputWithLabel02
                                    label="아이디"
                                    id="userId"
                                    name="userId"
                                    forwardRef={userIdRef}
                                    defaultValue={userInfo?.userId}
                                    onInput={handleInputFireSpace}
                                    placeholder="숫자,영문 혼합 6-15자리"
                                    isOnErr={isOnErrUserId}
                                    type="text"
                                    readOnly={true}
                                ></FormInputWithLabel02>
                            </InputWrapper>
                            <InputWrapper>
                                <FormInputWithLabel02
                                    label="비밀번호"
                                    id="userPassword"
                                    name="userPassword"
                                    forwardRef={userPwRef}
                                    placeholder="숫자,영문,특수기호 혼합 10-20자리"
                                    onInput={handleInputFireSpace}
                                    isOnErr={isOnErrUserPw}
                                    type="password"
                                    readOnly={false}
                                ></FormInputWithLabel02>
                            </InputWrapper>
                        </IdPwContainer>
                    </Form>
                    <BtnContainer>
                        <Btn
                            onClick={handleUpdateUserLog}
                        >변경하기</Btn>
                    </BtnContainer>
                </FormContainer>
                <FormContainer>
                    <Form>
                        <InfoContainer>
                            <ImgContainer>
                                <ImgWrapper>
                                    <Img
                                        src={selectedImg}
                                        alt={userInfo?.profileImgName}
                                        $isSelectedImg={isSelectedImg}
                                    ></Img>
                                </ImgWrapper>
                                {
                                    isSelectedImg ?
                                        <ImgUplodaBtn
                                            onClick={handleFileRemove}
                                            $bgColor="#FF0000"
                                        >이미지 삭제</ImgUplodaBtn>
                                        : <ImgUplodaBtn
                                            onClick={handleFileClick}
                                            $bgColor="#3572EF"
                                        >이미지 업로드</ImgUplodaBtn>
                                }
                            </ImgContainer>
                            <HideInput
                                ref={imgRef}
                                type="file"
                                id="imgFile"
                                onChange={handleFileChange}
                            ></HideInput>
                            <NameNumberContainer>
                                <InputWrapper>
                                    <FormInputWithLabel02
                                        label="이름"
                                        id="userName"
                                        name="userName"
                                        forwardRef={userNameRef}
                                        defaultValue={userInfo?.userName}
                                        placeholder="한글명"
                                        onInput={handleInputFireSpace}
                                        isOnErr={isOnErrUserName}
                                        type="text"
                                        readOnly={false}
                                    ></FormInputWithLabel02>
                                </InputWrapper>
                                <InputWrapper>
                                    <FormInputWithLabel02
                                        label="연락처"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        forwardRef={phoneNumberRef}
                                        placeholder="'010' 제외 숫자 8자리"
                                        onInput={handleInputFireSpace}
                                        isOnErr={isOnErrPhoneNumber}
                                        type="text"
                                        readOnly={false}
                                    ></FormInputWithLabel02>
                                </InputWrapper>
                            </NameNumberContainer>
                        </InfoContainer>
                    </Form>
                    <BtnContainer>
                        <BtnContainer>
                            <Btn
                                onClick={handleUpdateUserInfo}
                            >변경하기</Btn>
                        </BtnContainer>
                    </BtnContainer>
                </FormContainer>
            </BodySection>
            <FootSection>
                <LinkText onClick={() => moveToHomePage('/userInfo')}>뒤로 가기</LinkText>
                <LinkText onClick={() => moveToHomePage('/')}>홈페이지</LinkText>
            </FootSection>
            <UpdateUserInfoModal
                isOn={isOnUpdateModal}
                handleCloseModal={handleCloseModal}
                whatUpdate={whatUpdate}
                prepareData={prepareData}
            ></UpdateUserInfoModal>
        </Wrapper>
    )
}