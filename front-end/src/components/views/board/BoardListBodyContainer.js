import styled from "styled-components"
import { COLORS } from "../../../commons/styles/COLORS";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../../commons/hooks/Spinner";
import UnLoginAlertModal from "../../commons/modal/UnLoginAlertModal";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const RegisterBoardWithSearchBarSection = styled.section`
    width: 100%;
    height: 8vh;
    // background-color: #eee;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    justify-content: ${(props) => (props.$userInfo === null ?
        'flex-end' : 'space-between'
    )};
    // padding-right: 1rem;
    // box-sizing: border-box;
`;
const RegisterBoardBtnContainer = styled.div`
    width: 10rem;
    height: 4rem;
    background-color: #eee;
    border-radius: 0.5rem;
`;
const RegisterBoardBtn = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    background-color: ${COLORS.greenColor};
    &:hover {
        cursor: pointer;
    }
`;
const RegisterBoardBtnText = styled.p`
    font-size: 1.6rem;
    font-weight: bold;
    color: white;
`;
const SearchBarContainer = styled.div`
    width: 30rem;
    height: 4rem;
    gap: 0.5rem;
    // background-color: #eee;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const SearchBarInputWrapper = styled.div`
    width: calc(100% - 5rem);
    height: 4rem;
    border: 0.1rem solid darkgray;
    border-radius: 0.5rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const SearchBarInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding-left: 1rem;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: black;
    box-sizing: border-box;
    &:input:focus {
        border: none;
        outline: none;
    }
`;
const SearchBarImgWrapper = styled.div`
    width: 4.5rem;
    height: 4rem;
    background-color: ${COLORS.blueColor};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    &:hover {
        cursor: pointer;
    }
`;
const SearchBarImg = styled.img`
    width: 70%;
    height: 70%;
    flex-shrink: 0;
`;
const BoardListSection = styled.section`
    width: 100%;
    height: calc(100% - 8vh);
`;
const BoardListFullContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
`;
const EmptyBoardContainer = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const BoardListSmallContainer = styled.div`
    width: 100%;
    height: 45rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: hidden;
`;
const BoardListWrapper = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    transform: ${(props) => `translateX(${props.$transformX}px)`};
    transition: transform 0.55s ease-out;
    will-change: transform;
    // overflow-x: scroll;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const BoardListEachContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
`;

const BoardContainer = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    box-sizing: border-box;
    &:hover {
        cursor: pointer;
    }
`;
const BoardTypeWrapper = styled.div`
    width: 8%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #eee;
`;
const BoardWriterWrapper = styled.div`
    width: 12%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #d9d9d9;
`;
const BoardTitleWrapper = styled.div`
    width: 43%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    // background-color: #eee;
    font-size: 1.4rem;
    padding-left: 1rem;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const BoardEmotionWrapper = styled.div`
    width: 18%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #d9d9d9;
    // font-size: 1.4rem;
`;
const ThumsImg = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    padding-right: 1rem;
    flex-shirnk: 0;
`;
const BoardEmotionText = styled.p`
    font-size: 1.4rem;
    margin: 0;
    ${(props) =>
        props.$afterText && `
        &::after {
            content: '/';
            margin-left: 2.5rem;
            margin-right: 2.5rem;
        }
        `
    }
`;
const BoardViewsWrapper = styled.div`
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #eee;
    // font-size: 1.4rem;
`;
const BoardDateWrapper = styled.div`
    width: 9%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #d9d9d9;
    // font-size: 1.4rem;
`;
const PageNumListFullContainer = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;
const PageMoveContainer = styled.div`
    width: 3rem;
    height: 3rem;
`;
const PageNumListContainer = styled.div`
    width: 30rem;
    height: 3rem;
    overflow: hidden;
`;
const PageNumListWrapper = styled.div`
    width: fit-content;
    height: 100%;
    display: flex;
    transform: ${props => `translateX(-${(props.$nowPageLayer - 1) * 30}rem)`};
    transition: transform 0.55s ease;
    will-change: transform;
`;
const PageLayerSmallContainer = styled.div`
    width: 30rem;
    height: 3rem;
    flex-shrink: 0;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;
const PageNumTextContainer = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.$nowPageNum === props.$pageNum ? '#4B70F5' : 'white')};
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    border-radius: 50%;
    &:hover {
        cursor: pointer;
    }
`;
const PageNumText = styled.p`
    font-size: 1.5rem;
    font-weight: ${(props) => (props.$nowPageNum === props.$pageNum ? 'bold' : 'normal')};
    color: ${(props) => (props.$nowPageNum === props.$pageNum ? 'white' : 'black')};
    margin: 0;
`;
const PageMoveImgContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    border-radius: 50%;
    &:hover {
        cursor: pointer;
    }
`;
const PageMoveImg = styled.img`
    width: 50%;
    height: 50%;
    flex-shrink: 0;
`;
const Text = styled.p`
    font-size: 1.65rem;
    font-weight: normal;
    color: black;
    margin: 0;
    padding: 0;
`;

export default function BoardListBodyContainer({
    $location
}) {
    // page navigate
    const navigate = useNavigate();
    const location = useLocation();
    // 목록 조회 전까지의 로딩
    const [isLoading, setIsLoading] = useState(true);
    // 알람 모달 state
    let [isOnAlertModal, setIsOnAlertModal] = useState(false);
    const handleCloseAlertModal = () => {
        setIsOnAlertModal(false);
    };
    // get userinfo in store
    const userInfo = useSelector((state) => state.user.user);
    // board list from fetch get
    let [boardList, setBoardList] = useState([]);
    const [nowPageNum, setNowPageNum] = useState(1);
    const [lastPageNum, setLastpageNum] = useState(0);
    const [nowPageLayer, setNowPageLayer] = useState(1);
    const [pageNumList, setPageNumList] = useState([]);
    // dragging state
    const boardListWrapperRef = useRef(null);
    const [startX, setStartX] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [transformX, setTransformX] = useState(0);
    const [howMuchDrag, setHowMuchDrag] = useState(0);
    // search input ref
    const searchInputRef = useRef(null);
    // fetching board list
    useEffect(() => {
        if ($location.split('/').length === 2) {
            // console.log('board page');
            setIsLoading(true);
            searchInputRef.current.value = '';
            if (location?.state !== null) {
                console.log(location?.state);
                const prevPageNum = location?.state.prevPageNum;
                // setNowPageNum(prevPageNum);
                // console.log(prevPageNum);
                setNowPageNum(prevPageNum);
                // console.log(prevPageLayer);
                setTransformX(-1080 * (prevPageNum - 1));
                handlePageLayer(prevPageNum);
            }
            const fetchItems = async () => {
                try {
                    const fullURL = `http://localhost:8080/boardList`;
                    const response = await axios.get(fullURL);
                    const boardList = await response.data;
                    if (boardList.length === 0) {
                        setBoardList([]);
                        setIsLoading(false);
                    } else {
                        let boardListFullCopy = [];
                        let boardListSmallCopy = [];
                        let count = 1;
                        let pageNumFullCopy = [];
                        let pageNumSmallCopy = [];

                        for (let i = 0; i < boardList.length; i++) {
                            boardListSmallCopy.push(boardList[i]);
                            // 각 리스트 <= 9개 게시글
                            if ((i + 1) % 9 === 0) {
                                boardListFullCopy.push(boardListSmallCopy);
                                boardListSmallCopy = [];
                                pageNumSmallCopy.push(count);
                                if (count % 3 === 0) {
                                    pageNumFullCopy.push(pageNumSmallCopy);
                                    pageNumSmallCopy = [];
                                }
                                count += 1;
                            }
                            // 마지막 리스트 <= 9개 미만의 게시글
                            if (i === boardList.length - 1) {
                                boardListFullCopy.push(boardListSmallCopy);
                                pageNumSmallCopy.push(count);
                                pageNumFullCopy.push(pageNumSmallCopy);
                            }
                        };
                        // 저장한 모든 리스트를 갖는 전체 리스트
                        setBoardList(boardListFullCopy);
                        setPageNumList(pageNumFullCopy);
                        setLastpageNum(pageNumFullCopy[pageNumFullCopy.length - 1][[pageNumFullCopy.length - 1].length]);
                        setIsLoading(false);
                    }
                } catch (error) {
                    // console.error('Error getting itemType data:', error);
                    throw error;
                }
            };
            // fetchUserItems를 의존성 배열에 추가
            fetchItems();
        } else if ($location.split('/')[2] !== 'search') {
            // console.log('board/more page');
            searchInputRef.current.value = '';
            setIsLoading(true);
            if (location?.state !== null) {
                console.log(location?.state);
                const prevPageNum = location?.state.prevPageNum;
                // setNowPageNum(prevPageNum);
                // console.log(prevPageNum);
                setNowPageNum(prevPageNum);
                // console.log(prevPageLayer);
                setTransformX(-1080 * (prevPageNum - 1));
                handlePageLayer(prevPageNum);
            }
            const moreURL = $location.split('/')[2];
            // console.log(moreURL);
            const fetchItems = async () => {
                try {
                    const fullURL = `http://localhost:8080/boardList/${moreURL}`;
                    const response = await axios.get(fullURL);
                    const boardList = await response.data;
                    if (boardList.length === 0) {
                        setBoardList([]);
                        setIsLoading(false);
                    } else {
                        let boardListFullCopy = [];
                        let boardListSmallCopy = [];
                        let count = 1;
                        let pageNumFullCopy = [];
                        let pageNumSmallCopy = [];

                        for (let i = 0; i < boardList.length; i++) {
                            boardListSmallCopy.push(boardList[i]);
                            // 각 리스트 <= 9개 게시글
                            if ((i + 1) % 9 === 0) {
                                boardListFullCopy.push(boardListSmallCopy);
                                boardListSmallCopy = [];
                                pageNumSmallCopy.push(count);
                                if (count % 3 === 0) {
                                    pageNumFullCopy.push(pageNumSmallCopy);
                                    pageNumSmallCopy = [];
                                }
                                count += 1;
                            }
                            // 마지막 리스트 <= 9개 미만의 게시글
                            if (i === boardList.length - 1) {
                                boardListFullCopy.push(boardListSmallCopy);
                                pageNumSmallCopy.push(count);
                                pageNumFullCopy.push(pageNumSmallCopy);
                            }
                        };
                        // 저장한 모든 리스트를 갖는 전체 리스트
                        setBoardList(boardListFullCopy);
                        setPageNumList(pageNumFullCopy);
                        setLastpageNum(pageNumFullCopy[pageNumFullCopy.length - 1][[pageNumFullCopy.length - 1].length]);
                        setIsLoading(false);
                    }
                } catch (error) {
                    // console.error('Error getting itemType data:', error);
                    throw error;
                }
            };
            // fetchUserItems를 의존성 배열에 추가
            fetchItems();
        } else {
            setIsLoading(true);
            if (location?.state !== null) {
                console.log(location?.state);
                const prevPageNum = location?.state.prevPageNum;
                // setNowPageNum(prevPageNum);
                // console.log(prevPageNum);
                setNowPageNum(prevPageNum);
                // console.log(prevPageLayer);
                setTransformX(-1080 * (prevPageNum - 1));
                handlePageLayer(prevPageNum);
            }
            // console.log('board/search page');
            const searchData = location?.state.searchData;
            searchInputRef.current.value = searchData;
            let fetchItems;
            if (searchData === '') {
                // console.log('value none');
                fetchItems = async () => {
                    try {
                        const fullURL = `http://localhost:8080/boardList`;
                        const response = await axios.get(fullURL);
                        const boardList = await response.data;
                        if (boardList.length === 0) {
                            setBoardList([]);
                            setIsLoading(false);
                        } else {
                            let boardListFullCopy = [];
                            let boardListSmallCopy = [];
                            let count = 1;
                            let pageNumFullCopy = [];
                            let pageNumSmallCopy = [];

                            for (let i = 0; i < boardList.length; i++) {
                                boardListSmallCopy.push(boardList[i]);
                                // 각 리스트 <= 9개 게시글
                                if ((i + 1) % 9 === 0) {
                                    boardListFullCopy.push(boardListSmallCopy);
                                    boardListSmallCopy = [];
                                    pageNumSmallCopy.push(count);
                                    if (count % 3 === 0) {
                                        pageNumFullCopy.push(pageNumSmallCopy);
                                        pageNumSmallCopy = [];
                                    }
                                    count += 1;
                                }
                                // 마지막 리스트 <= 9개 미만의 게시글
                                if (i === boardList.length - 1) {
                                    boardListFullCopy.push(boardListSmallCopy);
                                    pageNumSmallCopy.push(count);
                                    pageNumFullCopy.push(pageNumSmallCopy);
                                }
                            };
                            // 저장한 모든 리스트를 갖는 전체 리스트
                            setBoardList(boardListFullCopy);
                            setPageNumList(pageNumFullCopy);
                            setLastpageNum(pageNumFullCopy[pageNumFullCopy.length - 1][[pageNumFullCopy.length - 1].length]);
                            // setNowPageNum(location?.state.prevPageNum);
                            setIsLoading(false);
                        }
                        // console.log(result);
                    } catch (error) {
                        // console.error('Error getting itemType data:', error);
                        throw error;
                    }
                };
            } else {
                // console.log('value ok');
                fetchItems = async () => {
                    try {
                        const fullURL = `http://localhost:8080/boardList/search/${searchData}`;
                        const response = await axios.get(fullURL);
                        const boardList = await response.data;
                        if (boardList.length === 0) {
                            setBoardList([]);
                            setIsLoading(false);
                        } else {
                            let boardListFullCopy = [];
                            let boardListSmallCopy = [];
                            let count = 1;
                            let pageNumFullCopy = [];
                            let pageNumSmallCopy = [];

                            for (let i = 0; i < boardList.length; i++) {
                                boardListSmallCopy.push(boardList[i]);
                                // 각 리스트 <= 9개 게시글
                                if ((i + 1) % 9 === 0) {
                                    boardListFullCopy.push(boardListSmallCopy);
                                    boardListSmallCopy = [];
                                    pageNumSmallCopy.push(count);
                                    if (count % 3 === 0) {
                                        pageNumFullCopy.push(pageNumSmallCopy);
                                        pageNumSmallCopy = [];
                                    }
                                    count += 1;
                                }
                                // 마지막 리스트 <= 9개 미만의 게시글
                                if (i === boardList.length - 1) {
                                    boardListFullCopy.push(boardListSmallCopy);
                                    pageNumSmallCopy.push(count);
                                    pageNumFullCopy.push(pageNumSmallCopy);
                                }
                            };
                            // 저장한 모든 리스트를 갖는 전체 리스트
                            setBoardList(boardListFullCopy);
                            setPageNumList(pageNumFullCopy);
                            setLastpageNum(pageNumFullCopy[pageNumFullCopy.length - 1][[pageNumFullCopy.length - 1].length]);
                            setNowPageNum(location?.state.prevPageNum);
                            setIsLoading(false);
                        }
                    } catch (error) {
                        // console.error('Error getting itemType data:', error);
                        throw error;
                    }
                };
            }
            // fetchUserItems를 의존성 배열에 추가
            fetchItems();
        }
    }, [
        $location,
        location
    ]);
    // click btn, move to register board
    const handleClickResisterBoardBtn = () => {
        navigate('/register/board');
    };
    // search input ref get value
    const handleSearchImgClick = async () => {
        const searchData = searchInputRef.current.value;
        navigate(`/board/search`, { state: { searchData: searchData } });
    };
    const [clickedBoard, setClickedBoard] = useState({});
    // mouse event area
    const handleMouseDown = (e, board) => {
        if (board === null) {
            setStartX(e.pageX);
            setDragging(true);
            setHowMuchDrag(0);
        } else {
            setClickedBoard(board);
        }
    };
    const handleMouseMove = (e) => {
        if (!dragging) return;
        const deltaX = (e.pageX - startX);
        setHowMuchDrag((prevHowMuchDrag) => prevHowMuchDrag + deltaX);
        setTransformX((prevTransformX) => prevTransformX + deltaX);
        setStartX(e.pageX);
    };
    const handleMouseUp = () => {
        setStartX(null);
        setDragging(false);
        setHowMuchDrag(0);
        if (howMuchDrag === 0 && dragging) {
            console.log('----------------------------');
            console.log('just click');
            // 저장한 클릭된 게시글을 가져온다.
            // console.log(clickedBoard);
            const board = clickedBoard;
            const prevPathname = location.pathname;
            const searchData = searchInputRef.current.value;
            const prevPageNum = nowPageNum;
            // 상세 게시글 페이지로 이동
            navigate(`/boardDetail/${board._id}`, { state: { board, prevPathname, searchData, prevPageNum } });

        } else if (howMuchDrag >= 50) {
            if (nowPageNum > 1) {
                // console.log('slide to prev container');
                const initialPageNum = nowPageNum - 1;
                setTransformX(-1080 * (initialPageNum - 1));
                setNowPageNum(initialPageNum);
                handlePageLayer(initialPageNum);
            } else {
                // console.log('slide to first container');
                setTransformX(0);
                handlePageLayer(nowPageNum);
            }
        } else if (howMuchDrag <= -50) {
            if (nowPageNum < lastPageNum) {
                // console.log('slide to next container');
                const initialPageNum = nowPageNum + 1;
                setTransformX(-1080 * (initialPageNum - 1));
                setNowPageNum(initialPageNum);
                handlePageLayer(initialPageNum);
            } else {
                // console.log('slide to last container');
                setTransformX(-1080 * (lastPageNum - 1));
                handlePageLayer(lastPageNum - 1);
            }
        } else {
            // console.log('slide to now container');
            const initialPageNum = nowPageNum;
            setTransformX(-1080 * (initialPageNum - 1));
            handlePageLayer(initialPageNum);
        }
    };
    // const moveToBoardDetailPage = async (board) => {
    //     const prevPathname = location.pathname;
    //     const searchData = searchInputRef.current.value;
    //     console.log(prevPathname);
    //     console.log(searchData);
    //     console.log(board);
    //     // navigate(`/boardDetail/${board._id}`, { state: { board, prevPathname, searchData } });
    // };
    const handleClickPageNum = (pageNum) => {
        setNowPageNum(pageNum);
        setTransformX(-1080 * (pageNum - 1));
        handlePageLayer(pageNum);
    };
    const handlePageLayer = (pageNum) => {
        const initialPageLayer = Math.ceil(pageNum / 3);
        setNowPageLayer(initialPageLayer);
    };
    const togglePageMove = (forward) => {
        if (forward === 'prev') {
            // console.log('click prev');
            const initialPageNum = nowPageNum - 1;
            setNowPageNum(initialPageNum);
            handlePageLayer(initialPageNum);
            setTransformX(-1080 * (initialPageNum - 1));
        } else {
            // console.log('click next');
            const initialPageNum = nowPageNum + 1;
            setNowPageNum(initialPageNum);
            handlePageLayer(initialPageNum);
            setTransformX(-1080 * (initialPageNum - 1));
        }
    };

    return (
        <Wrapper>
            <RegisterBoardWithSearchBarSection $userInfo={userInfo}>
                {
                    userInfo !== null ?
                        <RegisterBoardBtnContainer>
                            <RegisterBoardBtn
                                onClick={handleClickResisterBoardBtn}>
                                <RegisterBoardBtnText>글쓰기</RegisterBoardBtnText>
                            </RegisterBoardBtn>
                        </RegisterBoardBtnContainer> : null
                }
                <SearchBarContainer>
                    <SearchBarInputWrapper>
                        <SearchBarInput
                            ref={searchInputRef}
                            placeholder="검색어를 입력해주세요."
                        ></SearchBarInput>
                    </SearchBarInputWrapper>
                    <SearchBarImgWrapper
                        onClick={() => handleSearchImgClick()}
                    >
                        <SearchBarImg src="/image/search.svg"></SearchBarImg>
                    </SearchBarImgWrapper>
                </SearchBarContainer>
            </RegisterBoardWithSearchBarSection>
            <BoardListSection>
                {
                    isLoading ?
                        <Spinner></Spinner> :
                        <BoardListFullContainer>
                            {
                                boardList.length === 0 ?
                                    <EmptyBoardContainer>
                                        <Text>게시글이 없습니다.</Text>
                                    </EmptyBoardContainer>
                                    :
                                    <>
                                        <BoardListSmallContainer>
                                            <BoardListWrapper
                                                ref={boardListWrapperRef}
                                                $transformX={transformX}
                                                onMouseDown={(e) => handleMouseDown(e, null)}
                                                onMouseMove={handleMouseMove}
                                                onMouseUp={handleMouseUp}
                                                onMouseLeave={handleMouseUp}
                                            >
                                                {
                                                    boardList.map((boards, i) =>
                                                        <BoardListEachContainer
                                                            key={i}
                                                        >
                                                            {
                                                                boards.map((board, j) =>
                                                                    <BoardContainer
                                                                        key={j}
                                                                        onMouseDown={(e) => handleMouseDown(e, board)}
                                                                    >
                                                                        <BoardTypeWrapper>
                                                                            <Text>[ {board.boardTypeName} ]</Text>
                                                                        </BoardTypeWrapper>
                                                                        <BoardWriterWrapper>
                                                                            <Text> {board.userId} </Text>
                                                                        </BoardWriterWrapper>
                                                                        <BoardTitleWrapper>
                                                                            <Text> {board.boardTitle} </Text>
                                                                        </BoardTitleWrapper>
                                                                        <BoardEmotionWrapper>
                                                                            {
                                                                                board.likeList.includes(userInfo?._id) ?
                                                                                    <ThumsImg src="/image/onThumbs-up.svg" draggable="false"></ThumsImg>
                                                                                    : <ThumsImg src="/image/offThumbs-up.svg" draggable="false"></ThumsImg>
                                                                            }
                                                                            <BoardEmotionText $afterText={true}>{board.likeList.length}</BoardEmotionText>
                                                                            {
                                                                                board.unLikeList.includes(userInfo?._id) ?
                                                                                    <ThumsImg src="/image/onThumbs-down.svg" draggable="false"></ThumsImg>
                                                                                    : <ThumsImg src="/image/offThumbs-down.svg" draggable="false"></ThumsImg>
                                                                            }
                                                                            <BoardEmotionText $afterText={false}>{board.unLikeList.length}</BoardEmotionText>
                                                                        </BoardEmotionWrapper>
                                                                        <BoardViewsWrapper>
                                                                            <Text>조회수 : {board.views.length}</Text>
                                                                        </BoardViewsWrapper>
                                                                        <BoardDateWrapper>
                                                                            <Text>{board.date.slice(2, 10)}</Text>
                                                                        </BoardDateWrapper>
                                                                    </BoardContainer>
                                                                )
                                                            }
                                                        </BoardListEachContainer>
                                                    )
                                                }
                                            </BoardListWrapper>
                                        </BoardListSmallContainer>
                                        <PageNumListFullContainer>
                                            <PageMoveContainer>
                                                {
                                                    nowPageNum === 1 || pageNumList.length === 1 ? null :
                                                        <PageMoveImgContainer
                                                            onClick={() => togglePageMove('prev')}
                                                        >
                                                            <PageMoveImg
                                                                src="/image/chevron-left.svg"
                                                                draggable="false"
                                                            ></PageMoveImg>
                                                        </PageMoveImgContainer>
                                                }
                                            </PageMoveContainer>
                                            <PageNumListContainer>
                                                <PageNumListWrapper
                                                    $nowPageLayer={nowPageLayer}
                                                >
                                                    {
                                                        pageNumList.map((pageLayer, i) =>
                                                            <PageLayerSmallContainer
                                                                key={i}
                                                            >
                                                                {
                                                                    pageLayer.map((pageNum, j) =>
                                                                        <PageNumTextContainer
                                                                            key={j}
                                                                            $nowPageNum={nowPageNum}
                                                                            $pageNum={pageNum}
                                                                            onClick={() => handleClickPageNum(pageNum)}
                                                                        >
                                                                            <PageNumText
                                                                                $nowPageNum={nowPageNum}
                                                                                $pageNum={pageNum}
                                                                            >
                                                                                {pageNum}
                                                                            </PageNumText>
                                                                        </PageNumTextContainer>
                                                                    )
                                                                }
                                                            </PageLayerSmallContainer>
                                                        )
                                                    }
                                                </PageNumListWrapper>
                                            </PageNumListContainer>
                                            <PageMoveContainer>
                                                {
                                                    nowPageNum === lastPageNum || pageNumList.length === 1 ? null :
                                                        <PageMoveImgContainer>
                                                            <PageMoveImg
                                                                src="/image/chevron-right.svg"
                                                                draggable="false"
                                                                onClick={() => togglePageMove('next')}
                                                            ></PageMoveImg>
                                                        </PageMoveImgContainer>
                                                }
                                            </PageMoveContainer>
                                        </PageNumListFullContainer>
                                    </>
                            }
                        </BoardListFullContainer>
                }
            </BoardListSection>
            <UnLoginAlertModal
                isOn={isOnAlertModal}
                handleCloseModal={handleCloseAlertModal}
            ></UnLoginAlertModal>
        </Wrapper >
    )
}