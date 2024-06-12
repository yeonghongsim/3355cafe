import styled from "styled-components"
import LOGO from "../../commons/logo/LOGO";
import BarModal from "../../commons/modal/BarModal";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../../commons/hooks/Spinner";
import { setUser } from "../../../commons/store/userSlice";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const HeaderSection = styled.section`
    width: 100%;
    height: 12vh;
`;
const SmallWrapper = styled.div`
    width: 75%;
    height: 100%;
    margin: 0 auto;
`;
const HeaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const HeaderLogoContainer = styled.div`
    width: 15vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const HeaderEmpty = styled.div`
    width: 70vw;
    height: 100%;
`;
const HeaderToggleContainer = styled.div`
    width: 15vw;
    height: 100%;
`;
const BarImageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
`;
const BarImageWrapper = styled.div`
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    box-shadow: 0 0.5rem 0.5rem 0 rgba(0, 0, 0 , 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
    }
`;
const BarImage = styled.img`
    width: 50%;
    height: 50%;
`;
const BackTextContainer = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;
const BackText = styled.p`
    font-size: 1.8rem;
    font-weight: bold;
    color: black;
    margin: 0;
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;
const BodySection = styled.section`
    width: 100%;
    border-top: 0.1rem solid #d9d9d9;
    box-sizing: boder-box;
`;
const BoardInfoSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    // margin-top: 1rem;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.15);
`;
const BoardHeaderSection = styled.section`
    width: 100%;
`;
const HeaderLayer = styled.div`
    width: 100%;
    min-height: 3.5rem;
    background-color: white;
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-bottom: ${(props) => (props.$isLast ?
        '1px solid black' : 'none'
    )};
    border-left: 1px solid black;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.$justifyContent};
`;
const HeaderTextWrapper = styled.div`
    max-width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem 0 1rem;
    box-sizing: border-box;
    border-left: ${(props) => (props.$borderLeft ?
        '1px solid black' : 'none'
    )};
`;
const HeaderText = styled.p`
    font-size: ${(props) => props.$fontSize};
    font-weight: normal;
    color: black;
    margin: 0 auto;
`;
const BoardContentSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
`;
const BoardLikeOrUnlikeSection = styled.section`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const LikeUnlikeText = styled.p`
    font-size: 1.6rem;
    font-weight: normal;
    margin: 0;
    margin-left: 1.5rem;
    color: black;
    ${(props) =>
        props.$afterText && `
        &::after {
            content: '/';
            padding-left: 3rem;
            padding-right: 3rem;
        }
        `
    }
`;
const ThumsImg = styled.img`
    width: 3rem;
    height: 3rem;
    padding-right: 1rem;
    flex-shirnk: 0;
    &:hover {
        cursor: pointer;
    }
`;
const BoardReplySection = styled.section`
    width: 100%;
    margin-top: 3rem;
    background-color: #eee;
`;

export default function BoardDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    // 목록 조회 전까지의 로딩
    const [isLoading, setIsLoading] = useState(true);
    const userInfo = useSelector((state) => state.user.user);
    const propsBoard = location.state?.board;
    let [board, setBoard] = useState();
    let [boardLikeList, setBoardLikeList] = useState([]);
    let [boardUnlikeList, setBoardUnlikeList] = useState([]);
    useEffect(() => {
        let beforeBoard = propsBoard;
        if (!beforeBoard.views.includes(userInfo._id)) {
            // console.log('views에 userId 추가 후 update 쿼리 실행')
            beforeBoard.views.push(userInfo._id);
            // update board views
            const fetchingAddUserIdInBoardViews = async () => {
                try {
                    const response = await fetch('http://localhost:8080/update/board/addUseridInViews', {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(beforeBoard),
                    });
                    if (response.ok) {
                        const data = await response.json();
                        const result = data.board;
                        setBoardLikeList(result.likeList);
                        setBoardUnlikeList(result.unLikeList);
                        setBoard(result);
                        setIsLoading(false);
                        // navigate(`/boardDetail/${data.board._id}`, { state: { boardId } });
                    } else {
                        console.log('Failed to update data');
                    }
                } catch (error) {
                    console.log('Error:', error);
                }
            };
            fetchingAddUserIdInBoardViews();
        } else {
            // console.log('get 쿼리 실행')
            // get board detail
            const fetchingBoardDetail = async () => {
                try {
                    const boardId = propsBoard._id;
                    const fullURL = `http://localhost:8080/boardDetail/${boardId}`;
                    const response = await axios.get(fullURL);
                    const result = await response.data;
                    setBoardLikeList(result.likeList);
                    setBoardUnlikeList(result.unLikeList);
                    setBoard(result);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error getting board detail data:', error);
                    throw error;
                }
            };
            fetchingBoardDetail();
        }
    }, [
        propsBoard,
        userInfo
    ]);
    // bar modal section
    let [isOnBarModal, setIsOnBarModal] = useState(false);
    // up-right side bar modal open/close
    const handleBarModal = (e) => {
        e.stopPropagation();
        setIsOnBarModal(!isOnBarModal);
    };
    // up-right side  modal close
    const handleModalClose = useCallback(() => {
        setIsOnBarModal(false);
        setTimeout(() => {
            setUser(null);
        }, 1000);
    }, []);
    const handlePageBack = () => {
        navigate('/board');
    };
    const handleLikeClick = async (board) => {
        // console.log('like btn click');
        let copy;
        if (!boardLikeList.includes(userInfo._id)) {
            copy = [...boardLikeList];
            copy.push(userInfo._id);
            setBoardLikeList(copy);
        }
        else if (boardLikeList.length !== 0 && boardLikeList.includes(userInfo._id)) {
            copy = boardLikeList.filter(id => id !== userInfo._id);
            setBoardLikeList(copy);
        }
        const data = {
            boardId: board.boardId,
            boardTitle: board.boardTitle,
            boardType: board.boardType,
            contentHTML: board.contentHTML,
            contentRaw: board.contentRaw,
            date: board.date,
            images: board.images,
            likeList: copy,
            unLikeList: boardUnlikeList,
            userId: board.userId,
            userName: board.userName,
            userPrimeId: board.userPrimeId,
            views: board.views,
        }
        try {
            const response = await fetch('http://localhost:8080/update/board/toggleLikeList', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // console.log('Success to update data');
            } else {
                console.log('Failed to update data');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    const handleUnlikeClick = async () => {
        // console.log('unlike btn click');
        let copy;
        if (!boardUnlikeList.includes(userInfo._id)) {
            copy = [...boardUnlikeList];
            copy.push(userInfo._id);
            setBoardUnlikeList(copy);
        }
        else if (boardUnlikeList.length !== 0 && boardUnlikeList.includes(userInfo._id)) {
            copy = boardUnlikeList.filter(id => id !== userInfo._id);
            setBoardUnlikeList(copy);
        }
        const data = {
            boardId: board.boardId,
            boardTitle: board.boardTitle,
            boardType: board.boardType,
            contentHTML: board.contentHTML,
            contentRaw: board.contentRaw,
            date: board.date,
            images: board.images,
            likeList: boardLikeList,
            unLikeList: copy,
            userId: board.userId,
            userName: board.userName,
            userPrimeId: board.userPrimeId,
            views: board.views,
        }
        try {
            const response = await fetch('http://localhost:8080/update/board/toggleUnlikeList', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // console.log('Success to update data');
            } else {
                console.log('Failed to update data');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <Wrapper>
            <HeaderSection>
                <SmallWrapper>
                    <HeaderContainer>
                        <HeaderLogoContainer>
                            <LOGO></LOGO>
                        </HeaderLogoContainer>
                        <HeaderEmpty></HeaderEmpty>
                        <HeaderToggleContainer>
                            <BarImageContainer>
                                <BarImageWrapper onClick={handleBarModal}>
                                    <BarImage src="/image/bars.svg"></BarImage>
                                </BarImageWrapper>
                                <BarModal
                                    isOn={isOnBarModal ? "true" : "false"}
                                    handleModalClose={handleModalClose}
                                ></BarModal>
                            </BarImageContainer>
                        </HeaderToggleContainer>
                    </HeaderContainer>
                </SmallWrapper>
            </HeaderSection>
            <BodySection>
                <SmallWrapper>
                    {
                        isLoading ? <Spinner></Spinner> :
                            <>
                                <BackTextContainer>
                                    <BackText onClick={() => handlePageBack()}>뒤로 가기</BackText>
                                </BackTextContainer>
                                <BoardInfoSection>
                                    <BoardHeaderSection>
                                        <HeaderLayer
                                            $isLast={false}
                                            $justifyContent="flex-end"
                                        >
                                            <HeaderTextWrapper $borderLeft={true}>
                                                <HeaderText $fontSize='1.4rem'>
                                                    {board?.userId}
                                                </HeaderText>
                                            </HeaderTextWrapper>
                                            <HeaderTextWrapper $borderLeft={true}>
                                                <HeaderText $fontSize='1.4rem'>
                                                    {board?.date.slice(0, 10)}
                                                </HeaderText>
                                            </HeaderTextWrapper>
                                            <HeaderTextWrapper $borderLeft={true}>
                                                <HeaderText $fontSize='1.4rem'>
                                                    조회수 {board?.views.length}
                                                </HeaderText>
                                            </HeaderTextWrapper>
                                        </HeaderLayer>
                                        <HeaderLayer
                                            $isLast={true}
                                            $justifyContent="center"
                                        >
                                            <HeaderTextWrapper $borderLeft={false}>
                                                <HeaderText $fontSize='1.8rem'>
                                                    {board?.boardTitle}
                                                </HeaderText>
                                            </HeaderTextWrapper>
                                        </HeaderLayer>
                                    </BoardHeaderSection>
                                    <BoardContentSection dangerouslySetInnerHTML={{ __html: board?.contentHTML }}>
                                    </BoardContentSection>
                                    <BoardLikeOrUnlikeSection>
                                        {
                                            boardLikeList.includes(userInfo._id) ?
                                                <ThumsImg
                                                    src="/image/onThumbs-up.svg"
                                                    onClick={() => handleLikeClick(board)}
                                                ></ThumsImg>
                                                : <ThumsImg
                                                    src="/image/offThumbs-up.svg"
                                                    onClick={() => handleLikeClick(board)}
                                                ></ThumsImg>
                                        }
                                        <LikeUnlikeText $afterText={true}>
                                            {boardLikeList.length}
                                        </LikeUnlikeText>
                                        {
                                            boardUnlikeList.includes(userInfo._id) ?
                                                <ThumsImg
                                                    src="/image/onThumbs-down.svg"
                                                    onClick={handleUnlikeClick}
                                                ></ThumsImg>
                                                : <ThumsImg
                                                    src="/image/offThumbs-down.svg"
                                                    onClick={handleUnlikeClick}
                                                ></ThumsImg>
                                        }
                                        <LikeUnlikeText $afterText={false}>
                                            {boardUnlikeList.length}
                                        </LikeUnlikeText>
                                    </BoardLikeOrUnlikeSection>
                                </BoardInfoSection>
                                <BoardReplySection>
                                    댓글 공간
                                </BoardReplySection>
                            </>
                    }
                </SmallWrapper>
            </BodySection >
        </Wrapper >
    )
}