import { useLocation } from "react-router-dom";
import styled from "styled-components"
import LOGO from "../../commons/logo/LOGO";
import { useRef, useState } from "react";
import { COLORS } from "../../../commons/styles/COLORS";
import RegiBoardSelect01 from "../../commons/select/RegiBoardSelect01";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { useSelector } from "react-redux";
import draftToHtml from 'draftjs-to-html';
import UpdateBoardConfirmModal from "../../commons/modal/UpdateBoardConfirmModal";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const SmallWrapper = styled.div`
    width: 75%;
    height: 100%;
    margin: 0 auto;
`;
const HeaderSection = styled.section`
    width: 100%;
    height: 12vh;
    border-bottom: 0.1rem solid darkgray;
    box-sizing: border-box;
`;
const HeaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const BodySection = styled.section`
    width: 100%;
    margin-top: 1rem;
`;
const Form = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.15);
    padding: 1rem;
    gap: 0.5rem;
    box-sizing: border-box;
`;
const Layer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const TypeNTitleContainer = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border: 0.1rem solid black;
    border-radius: 0.5rem;
    box-sizing: border-box;
`;
const BoardTypeContainer = styled.div`
    width: 10rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const BoardTitleContainer = styled.div`
    width: calc(100% - 10rem);
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const TitleTextContainer = styled.div`
    width: 5rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 0.1rem solid black;
    border-right: 0.1rem solid black;
    box-sizing: border-box;
`;
const TitleText = styled.p`
    font-size: 1.6rem;
    font-weight: bold;
    color: black;
`;
const TitleInputContainer = styled.div`
    width: calc(100% - 5rem);
    height: 100%;
`;
const Input = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding-left: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: black;
    &:input:focus {
        border: none;
        outline: none;
    }
`;
const WysiwygContainer = styled.div`
    width: 100%;
    background-color: white;
    border: 0.1rem solid black;
    border-radius: 0.5rem;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0.1rem;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-y: auto;
`;
const BtnContainer = styled.div`
    width: 100%;
    height: 4rem;
    // background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const RegiBtn = styled.div`
    width: 12rem;
    height: 4rem;
    background-color: ${COLORS.blueColor};
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
const ErrorTextContainer = styled.div`
    width: 100%;
    // height: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;
const ErrorText = styled.p`
    font-size: 1.4rem;
    font-weight: normal;
    color: red;
    margin: 0;
    padding-right: 0.35rem;
    &::after {
        // content: ",";
        content: ${({ $sequence, $length }) => ($sequence < $length - 1 ? "','" : '""')};
    }
`;

export default function UpdateBoardPage() {
    const location = useLocation();
    const boardTypeList = useSelector((state) => state.boardTypeList.boardTypeList);
    const board = location?.state.board;
    // select board type ref
    const boardTypeRef = useRef(null);
    // input title ref
    const titleInputRef = useRef(null);
    // input value length control
    const [inputValue, setInputValue] = useState(board.boardTitle);
    let [errorList, setErrorList] = useState([]);
    let [isOnErrBoardType, setIsOnErrBoardType] = useState(false);
    let [isOnErrBoardTitle, setIsOnErrBoardTitle] = useState(false);
    let [isOnErrBoardContent, setIsOnErrBoardContent] = useState(false);
    let isOnAnyErr = isOnErrBoardType || isOnErrBoardTitle || isOnErrBoardContent;
    const handleInputChange = (e) => {
        if (e.target.value.length <= 40) {
            setInputValue(e.target.value);
        }
    };
    // confirm modal state
    let [isOnConfirmModal, setIsOnConfirmModal] = useState(false);
    // prepared data
    let [prepareData, setPrepareData] = useState({});

    // wysiwyg 관련 내용들
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(convertFromRaw(JSON.parse(board.contentRaw)))
    );
    // 업로드한 이미지를 알아보기 위한 state
    const [uploadedImages, setUploadedImages] = useState(board.images);
    // image size 관련 오류로 인해 사이즈 조정 코드
    const resizeImage = (file, maxWidth, maxHeight) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const image = new Image();
                image.src = event.target.result;
                image.onload = () => {
                    let width = image.width;
                    let height = image.height;
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(image, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        resolve(new File([blob], file.name, { type: 'image/jpeg' }));
                    }, 'image/jpeg');
                };
                image.onerror = reject;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    // wysiwyg의 toolbar에서 image 버튼을 클릭했을 때 사용하는 코드
    const handleImageUploadCallback = async (file) => {
        try {
            const resizedImage = await resizeImage(file, 800, 600);
            const reader = new FileReader();
            reader.readAsDataURL(resizedImage);
            return new Promise((resolve) => {
                reader.onloadend = () => {
                    setUploadedImages(prevImages => [...prevImages, file.name]);
                    resolve({ data: { link: reader.result, alignment: 'center' } });
                };
            });
        } catch (error) {
            console.error('이미지 축소 중 오류 발생:', error);
            return Promise.reject(error);
        }
    };

    // resi btn click
    const handleRegiBtnClick = () => {
        const contentState = editorState.getCurrentContent();
        const contentRaw = convertToRaw(contentState);
        const contentHTML = draftToHtml(contentRaw);
        const matchedBoard = boardTypeList.find((element) => element.value === boardTypeRef.current.value);
        const data = {
            boardTypeValue: matchedBoard.value,
            boardTypeName: matchedBoard.name,
            boardTitle: inputValue,
            contentRaw: JSON.stringify(contentRaw),
            contentHTML: contentHTML,
            images: uploadedImages,
        };
        // 데이터 유효성 검사하기
        const errors = [];
        // 1. 글 타입 확인하지 않았을 때
        const isTypeError = data.boardTypeValue === '';
        if (isTypeError) {
            setIsOnErrBoardType(true);
            if (!errors.includes('카테고리')) {
                errors.push('카테고리');
                setErrorList(errors);
            }
        } else {
            setIsOnErrBoardType(false);
            if (errors.includes('카테고리')) {
                const copy = errors.filter(error => error !== '카테고리');
                setErrorList(copy);
            }
        }
        // 2. 글 제목을 입력하지 않았을 때
        const isTitleError = data.boardTitle.length === 0
        if (isTitleError) {
            setIsOnErrBoardTitle(true);
            if (!errors.includes('제목')) {
                errors.push('제목');
                setErrorList(errors);
            }
        } else {
            setIsOnErrBoardTitle(false);
            if (errors.includes('제목')) {
                const copy = errors.filter(error => error !== '제목');
                setErrorList(copy);
            }
        }
        // 3. 글 내용을 입력하지 않았을 때
        // 내용부가 비었을때의 contentHTML의 내용 <p></p>
        const isContentEmpty = !contentRaw.blocks.some(block => block.text.trim() !== '');
        if (isContentEmpty) {
            setIsOnErrBoardContent(true);
            if (!errors.includes('내용')) {
                errors.push('내용');
                setErrorList(errors);
            }
        } else {
            setIsOnErrBoardContent(false);
            if (errors.includes('내용')) {
                const copy = errors.filter(error => error !== '내용');
                setErrorList(copy);
            }
        };
        if (isTypeError || isTitleError || isContentEmpty) {
            // console.log('오류 발생');
            setIsOnConfirmModal(false);
            return;
        } else {
            // console.log(data);
            setPrepareData(data);
            setIsOnConfirmModal(true);
        }
    }
    const handleModalClose = () => {
        setIsOnConfirmModal(false);
    };

    return (
        <Wrapper>
            <HeaderSection>
                <SmallWrapper>
                    <HeaderContainer>
                        <LOGO></LOGO>
                    </HeaderContainer>
                </SmallWrapper>
            </HeaderSection>
            <BodySection>
                <SmallWrapper>
                    <Form>
                        <Layer>
                            {
                                isOnAnyErr &&
                                <ErrorTextContainer>
                                    {
                                        errorList.map((error, i) =>
                                            <ErrorText
                                                key={i}
                                                $sequence={i}
                                                $length={errorList.length}
                                            >{error}</ErrorText>
                                        )
                                    }
                                    <ErrorText>
                                        을(를) 확인해 주세요.
                                    </ErrorText>
                                </ErrorTextContainer>
                            }
                        </Layer>
                        <Layer>
                            <TypeNTitleContainer>
                                <BoardTypeContainer>
                                    <RegiBoardSelect01
                                        forwardRef={boardTypeRef}
                                        defaultTypeName={board.boardTypeName}
                                        defaultTypeValue={board.boardTypeValue}
                                    ></RegiBoardSelect01>
                                </BoardTypeContainer>
                                <BoardTitleContainer>
                                    <TitleTextContainer>
                                        <TitleText>제목</TitleText>
                                    </TitleTextContainer>
                                    <TitleInputContainer>
                                        <Input
                                            ref={titleInputRef}
                                            placeholder="40자 이내로 작성해주세요."
                                            // defaultValue={board.boardTitle}
                                            value={inputValue}
                                            onChange={handleInputChange}
                                        ></Input>
                                    </TitleInputContainer>
                                </BoardTitleContainer>
                            </TypeNTitleContainer>
                        </Layer>
                        <Layer>
                            <WysiwygContainer>
                                <Editor
                                    editorState={editorState}
                                    wrapperClassName="wrapper-class"
                                    toolbarClassName="toolbar-class"
                                    editorClassName="editor-class"
                                    onEditorStateChange={setEditorState}
                                    placeholder="내용을 입력하세요."
                                    localization={{
                                        locale: 'ko',
                                    }}
                                    toolbar={{
                                        options: [
                                            'image',
                                            'inline',
                                            'blockType',
                                            'fontSize',
                                            // 'list',
                                            'textAlign',
                                            'colorPicker',
                                            // 'link',
                                            // 'embedded',
                                            'emoji',
                                            'remove',
                                            'history'
                                        ],
                                        image: {
                                            uploadCallback: handleImageUploadCallback,
                                            alt: { present: true, mandatory: false },
                                            previewImage: true,
                                            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                            defaultSize: {
                                                height: 'auto',
                                                width: '60%',
                                            },
                                        },
                                    }}
                                />
                            </WysiwygContainer>
                        </Layer>
                        <Layer>
                            <BtnContainer>
                                <RegiBtn onClick={handleRegiBtnClick}>
                                    수정 하기
                                </RegiBtn>
                            </BtnContainer>
                            <UpdateBoardConfirmModal
                                isOn={isOnConfirmModal}
                                handleModalClose={handleModalClose}
                                prepareData={prepareData}
                                boardId={board?._id}
                            ></UpdateBoardConfirmModal>
                        </Layer>
                    </Form>
                </SmallWrapper>
            </BodySection>
        </Wrapper>
    )
}