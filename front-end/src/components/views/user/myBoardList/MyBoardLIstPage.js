import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LOGO from "../../../commons/logo/LOGO";
import CheckBoxWrapper01 from "../../../commons/input/CheckBoxWrapper01";
import CheckBoxWrapper02 from "../../../commons/input/CheckBoxWrapper02";
import NoCheckedBoardModal from "../../../commons/modal/NoCheckedBoardModal";
import { useEffect, useState } from "react";

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
const BoardListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.15rem;
    padding-top: 1.5rem;
    box-sizing: border-box;
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
`;
const BoardTypeWrapper = styled.div`
    width: 8%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // border-right: 0.1rem solid #d9d9d9;
    // box-sizing: border-box;
`;
const BoardTitleWrapper = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    // border-right: 0.1rem solid #d9d9d9;
    // padding-left: 0.2rem;
    // box-sizing: border-box;
`;
const PageNationContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Text = styled.p`
    font-size: 1.6rem;
    font-weight: normal;
    color: black;
    margin: 0;
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

export default function MyBoardLIstPage() {
    const location = useLocation();
    const myBoardList = location?.state.myBoardList;
    const [checkInfoList, setCheckInfoList] = useState([]);
    const [isOnModal, setIsOnModal] = useState(false);
    const handleModalClose = () => {
        setIsOnModal(false);
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
            const boardIdList = checkedBoardList.map((board) => board._id);
            console.log(boardIdList);
            console.log('삭제 쿼리 시작');
        }
    };
    const handleRemoveAllBoard = () => {
        console.log('remove all');
        console.log('삭제 쿼리 시작');
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
    return (
        <Wrapper>
            <BodySection>
                <LOGO></LOGO>
                <BoardListContainer>
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
                    {
                        myBoardList.length === 0 ?
                            'not found board' :
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
                                        <BoardContainer>
                                            <BoardTypeWrapper>
                                                <Text>{board.boardTypeName}</Text>
                                            </BoardTypeWrapper>
                                            <BoardTitleWrapper>
                                                <Text>{board.boardTitle}</Text>
                                            </BoardTitleWrapper>
                                        </BoardContainer>
                                    </ElseCheckBoxContainer>
                                </Layer>
                            )

                    }
                    <Layer $border={false}>
                        <PageNationContainer>page number</PageNationContainer>
                    </Layer>
                </BoardListContainer>
            </BodySection>
            <NoCheckedBoardModal
                isOn={isOnModal}
                handleModalClose={handleModalClose}
            ></NoCheckedBoardModal>
        </Wrapper>
    )
}