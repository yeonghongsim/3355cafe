import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LOGO from "../../../commons/logo/LOGO";
import CheckBoxWrapper01 from "../../../commons/input/CheckBoxWrapper01";
import CheckBoxWrapper02 from "../../../commons/input/CheckBoxWrapper02";
import NoCheckedBoardModal from "../../../commons/modal/NoCheckedBoardModal";
import DeleteMyBoardModal from "../../../commons/modal/DeleteMyBoardModal";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const BodySection = styled.section`
    width: 80rem;
    border-radius: 1rem;
    background-color: white;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.25);
    padding: 1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const BoardListFullContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: 1.5rem;
    box-sizing: border-box;
`;
const BoardListContainer = styled.div`
    width: 100%;
    height: ${(props) => (props.$boardsLength === 0 ? '10rem' : '0rem')};
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    overflow: hidden;
`;
const BoardListWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    scroll-behavior: smooth;
    flex: 1;
    // 얇게
    scrollbar-width: thin;
    // 색상
    scrollbar-color: #666 #eee;
`;
const Layer = styled.div`
    width: 100%;
    height: 4rem;
    border: ${(props) => (props.$border ? '0.1rem solid #d9d9d9' : 'none')};
    border-radius: 0.5rem;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const CheckBoxContainer = styled.div`
    width: 4rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: ${(props) => (props.$borderRight ? '0.1rem solid #d9d9d9' : 'none')};
    box-sizing: border-box;
`;
const ElseCheckBoxContainer = styled.div`
    width: calc(100% - 4rem);
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const BoardContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    &:hover {
        cursor: pointer;
    }
`;
const BoardTypeWrapper = styled.div`
    width: 8rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // border-right: 0.1rem solid #d9d9d9;
    // box-sizing: border-box;
`;
const BoardTitleWrapper = styled.div`
    width: calc(100% - 8rem);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    // border-right: 0.1rem solid #d9d9d9;
    // padding-left: 0.2rem;
    // box-sizing: border-box;
`;
const Text = styled.p`
    font-size: 1.6rem;
    font-weight: normal;
    color: black;
    margin: 0;
    &:hover {
        color: ${(props) => (props.$isLink ? 'blue' : 'black')};
        text-decoration: ${(props) => (props.$isLink ? 'underline' : 'none')};
        cursor: ${(props) => (props.$isLink ? 'pointer' : 'normal')};
    }
`;
const DeleteBtnContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    gap: 1rem;
`;
const BeleteBtn = styled.div`
    width: 10rem;
    height: 3.5rem;
    background-color: ${(props) => props.$bgColor};
    border-radius: 0.5rem;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
    }
`;
const EmptyBoardContainer = styled.div`
    width: 100%;
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;
    padding-left: 1rem;
    box-sizing: border-box;
`;

export default function MyBoardLIstPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = useSelector((state) => state.user.user);
    // const myBoardList = location?.state.myBoardList;
    const myBoardList = useSelector((state) => state.myBoardList.myBoardList);
    const [whatDeleteBoardList, setWhatDeleteBoardList] = useState([]);
    const [checkInfoList, setCheckInfoList] = useState([]);
    const [isOnModal, setIsOnModal] = useState(false);
    const [isOnDeleteModal, setIsOnDeleteModal] = useState(false);
    const handleModalClose = () => {
        setIsOnModal(false);
    };
    const handleDeleteModalClose = () => {
        setIsOnDeleteModal(false);
    };
    useEffect(() => {
        const initializeCheckBoxList = async () => {
            const initialCheckBoxList = myBoardList.map(board => ({
                _id: board._id,
                isChecked: false,
            }));
            setCheckInfoList(initialCheckBoxList);
        };
        initializeCheckBoxList();
    }, [
        myBoardList,
    ]);
    const handleRemoveSelectedBoard = () => {
        // console.log('remove selected');
        const checkedBoardList = checkInfoList.filter((info) => info.isChecked === true);
        if (checkedBoardList.length === 0) {
            setIsOnModal(true);
        } else {
            setWhatDeleteBoardList(checkedBoardList.map((board) => board._id));
            // 삭제 전 확인 질문
            setIsOnDeleteModal(true);
            // fetchBoardTypeList(boardIdList, userId);
        }
    };
    const handleRemoveAllBoard = () => {
        setWhatDeleteBoardList(checkInfoList.map((info) => info._id));
        setIsOnDeleteModal(true);
        // fetchBoardTypeList(boardIdList, userId);
    };
    const [allCheckBox, setAllCheckBox] = useState(false);
    const handleAllCheckBox = () => {
        setAllCheckBox(!allCheckBox);
        let copy = [...checkInfoList];
        if (!allCheckBox) {
            const initialCopy = copy.map(board => ({
                _id: board._id,
                isChecked: true
            }));
            copy = initialCopy;
        } else {
            const initialCopy = copy.map(board => ({
                _id: board._id,
                isChecked: false
            }));
            copy = initialCopy;
        }
        setCheckInfoList(copy);
    };
    const handleEachCheckBox = (i) => {
        const copy = [...checkInfoList];
        copy[i].isChecked = !copy[i].isChecked;
        setCheckInfoList(copy);
        const allChecked = checkInfoList.every((info) => info.isChecked === true);
        if (allChecked) {
            setAllCheckBox(true);
        } else {
            setAllCheckBox(false);
        }
    };
    const listWrapperRef = useRef(null);
    useEffect(() => {
        const handleScroll = (event) => {
            const element = listWrapperRef.current;
            if (!element) return;

            const isAtTop = element.scrollTop === 0;
            const isAtBottom = element.scrollTop + element.clientHeight >= element.scrollHeight;

            if ((isAtTop && event.deltaY < 0) || (isAtBottom && event.deltaY > 0)) {
                event.preventDefault();
                event.stopPropagation();
            }
        };

        const element = listWrapperRef.current;
        element.addEventListener('wheel', handleScroll, { passive: false });
        return () => {
            element.removeEventListener('wheel', handleScroll);
        };
    }, []);
    const moveToBoardDetailPage = (board) => {
        // console.log(location.pathname);
        const prevPathname = location.pathname;
        navigate(`/boardDetail/${board._id}`, { state: { board, prevPathname } });
    };
    const moveToPage = (forward) => {

        if (forward === 'home') {
            navigate('/');
        } else {
            navigate('/register/board');
        }
    };

    return (
        <Wrapper>
            <BodySection>
                <LOGO></LOGO>
                {
                    myBoardList.length === 0 ?
                        <EmptyBoardContainer>
                            <Text $isLink={false}>작성하신 게시글이 없습니다.</Text>
                            <Text
                                $isLink={true}
                                onClick={() => moveToPage('regiBoard')}
                            >게시글 작성하러 가기</Text>
                            <Text
                                $isLink={true}
                                onClick={() => moveToPage('home')}
                            >홈페이지로 가기</Text>
                        </EmptyBoardContainer> : null
                }
                <BoardListFullContainer>
                    {
                        myBoardList.length === 0 ?
                            null :
                            <Layer $border={false}>
                                <CheckBoxContainer $borderRight={false}>
                                    <CheckBoxWrapper01
                                        id='allCheck'
                                        allCheckBox={allCheckBox}
                                        handleAllCheckBox={handleAllCheckBox}
                                    ></CheckBoxWrapper01>
                                </CheckBoxContainer>
                                <ElseCheckBoxContainer>
                                    <DeleteBtnContainer>
                                        <BeleteBtn
                                            $bgColor="#686D76"
                                            onClick={() => handleRemoveSelectedBoard()}
                                        >선택 삭제</BeleteBtn>
                                        <BeleteBtn
                                            $bgColor="#FF0000"
                                            onClick={() => handleRemoveAllBoard()}
                                        >전체 삭제</BeleteBtn>
                                    </DeleteBtnContainer>
                                </ElseCheckBoxContainer>
                            </Layer>
                    }
                    <BoardListContainer $boardsLength={myBoardList.length}>
                        <BoardListWrapper ref={listWrapperRef}>
                            {
                                myBoardList.length === 0 ?
                                    null :
                                    myBoardList.map((board, i) =>
                                        <Layer
                                            key={i}
                                            $border={true}
                                        >
                                            <CheckBoxContainer $borderRight={true}>
                                                <CheckBoxWrapper02
                                                    index={i}
                                                    id={`chkBox${i}`}
                                                    name={`chkBox${i}`}
                                                    checkInfo={checkInfoList[i]}
                                                    handleEachCheckBox={handleEachCheckBox}
                                                ></CheckBoxWrapper02>
                                            </CheckBoxContainer>
                                            <ElseCheckBoxContainer>
                                                <BoardContainer onClick={() => moveToBoardDetailPage(board)}>
                                                    <BoardTypeWrapper>
                                                        <Text $isLink={false}>{board.boardTypeName}</Text>
                                                    </BoardTypeWrapper>
                                                    <BoardTitleWrapper>
                                                        <Text $isLink={false}>{board.boardTitle}</Text>
                                                    </BoardTitleWrapper>
                                                </BoardContainer>
                                            </ElseCheckBoxContainer>
                                        </Layer>
                                    )
                            }
                        </BoardListWrapper>
                    </BoardListContainer>
                </BoardListFullContainer>
            </BodySection>
            <NoCheckedBoardModal
                isOn={isOnModal}
                handleModalClose={handleModalClose}
            ></NoCheckedBoardModal>
            <DeleteMyBoardModal
                isOn={isOnDeleteModal}
                handleModalClose={handleDeleteModalClose}
                userId={userInfo._id}
                whatDeleteBoardList={whatDeleteBoardList}
            >
            </DeleteMyBoardModal>
        </Wrapper>
    )
}