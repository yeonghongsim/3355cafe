import { useRef, useState } from "react";
import styled from "styled-components"
import CheckBoxWrapper01 from "../../commons/input/CheckBoxWrapper01";
import CheckBoxWrapper02 from "../../commons/input/CheckBoxWrapper02";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Body = styled.div`
    width: 60rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: white;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.25);
    border-radius: 1rem;
`;
const Head = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const RemoveBtnContainer = styled.div`
    min-width: 1rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    padding-right: 1rem;
    box-sizing: border-box;
`;
const RemoveBtn = styled.div`
    width: 10.5rem;
    height: 3.5rem;
    background-color: ${(props) => (props.$bgColor)};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`;
const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.1rem;
`;
const Layer = styled.div`
    width: 100%;
    height: 4rem;
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
`;
const BoardContainer = styled.div`
    width: calc(100% - 4rem);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 1rem;
    box-sizing: border-box;
    color: black;
    font-size: 1.6rem;
    font-weight: normal;
`;

export default function Text7Checkbox() {
    const allCheckBoxRef = useRef(null);
    const [checkedBoxs, setCheckedBoxs] = useState([]);
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const imsiList = [
        { id: 1, content: '1번째' },
        { id: 2, content: '2번째' },
        { id: 3, content: '3번째' },
        { id: 4, content: '4번째' },
        { id: 5, content: '5번째' }
    ];
    const removeCheckedBox = () => {
        console.log('removeCheckedBox click');
    };
    const toggleAllCheckBox = () => {
        setIsCheckedAll(!isCheckedAll);
    }
    // list.map으로 반복된 checkbox를 컨트롤 하고 싶다.
    // 1. 각각의 checkbox를 click할때마다 개별의 checked는 true와 false로 상태의 변화 발생
    // 2. checked가 true라면 checkedBoxs에 추가, false라면 checkedBoxs에서 제거
    // 2. checked된 input의 길이 == list의 길이 라면 id:allcheck인 checkbox도 checked.
    // 3. checked된 input의 길이 != list의 길이 라면 id:allcheck인 checkbox도 unchecked.
    const toggleEachCheckBox = (id) => {
        console.log(`click : ${id}`);
    };
    console.log(imsiList.length);
    console.log(checkedBoxs.length);
    console.log(checkedBoxs);
    return (
        <Wrapper>
            <Body>
                <Head>
                    <CheckBoxContainer>
                        <CheckBoxContainer>
                            <CheckBoxWrapper01
                                forwardRef={allCheckBoxRef}
                                id='checkAll'
                                isCheckedAll={isCheckedAll}
                                toggleAllCheckBox={toggleAllCheckBox}
                            ></CheckBoxWrapper01>
                        </CheckBoxContainer>
                    </CheckBoxContainer>
                    <RemoveBtnContainer>
                        <RemoveBtn
                            $bgColor="#686D76"
                            onClick={() => removeCheckedBox()}
                        >선택 삭제</RemoveBtn>
                        <RemoveBtn $bgColor="#FF0000">전체 삭제</RemoveBtn>
                    </RemoveBtnContainer>
                </Head>
                <Content>
                    {
                        imsiList.map((imsiData, i) => (
                            <Layer key={i}>
                                <CheckBoxContainer>
                                    <CheckBoxWrapper02
                                        id={imsiData.id}
                                        toggleEachCheckBox={toggleEachCheckBox}
                                        checkedBoxs={checkedBoxs}
                                        setCheckedBoxs={setCheckedBoxs}
                                    ></CheckBoxWrapper02>
                                </CheckBoxContainer>
                                <BoardContainer>{imsiData.content}</BoardContainer>
                            </Layer>
                        ))
                    }
                </Content>
            </Body>
        </Wrapper>
    )
}