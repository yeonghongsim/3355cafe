import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LOGO from "../../../commons/logo/LOGO";

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
    console.log(myBoardList);
    return (
        <Wrapper>
            <BodySection>
                <LOGO></LOGO>
                <BoardListContainer>
                    <Layer $border={false}>
                        <CheckBoxContainer $borderRight={false}>chkall</CheckBoxContainer>
                        <ElseCheckBoxContainer>
                            <DeleteBtnContainer>
                                <BeleteBtn $bgColor="#686D76">선택 삭제</BeleteBtn>
                                <BeleteBtn $bgColor="#FF0000">전체 삭제</BeleteBtn>
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
                                    <CheckBoxContainer
                                        $borderRight={true}
                                    >chkbox</CheckBoxContainer>
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
        </Wrapper>
    )
}