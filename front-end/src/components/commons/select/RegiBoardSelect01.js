import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 0.5rem 0 0 0.5rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const HideInput = styled.input`
    display: none;
`;
const InputWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Input = styled.input`
    width: 95%;
    height: 95%;
    border: none;
    outline: none;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: black;
    padding-left: 1rem;
    box-sizing: border-box;
    &:hover {
        cursor: pointer;
    }
    &:input:focus {
        border: none;
        outline: none;
    }
`;
const OptionWrapper = styled.div`
    width: 100%;
    background-color: white;
    border-left: 0.1rem solid #d9d9d9;
    border-right: 0.1rem solid #d9d9d9;
    box-sizing: border-box;
    position: absolute;
    top: 103%;
    left: 0;
    display: ${(props) => (props.$isOn ? 'flex' : 'none')};
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    z-index: 100;
`;
const Option = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: black;
    padding-left: 1rem;
    border-bottom: 0.1rem solid #d9d9d9;
    box-sizing: border-box;
    &:hover {
        cursor: pointer;
        background-color: #eee;
    }
`;

export default function RegiBoardSelect01({
    forwardRef,
    defaultTypeName,
    defaultTypeValue,
}) {
    // select input ref
    const renderInputRef = useRef(null);
    // option wrapper ref
    const selectRef = useRef(null);
    // option wrapper state
    let [isOn, setIsOn] = useState(false);
    // board type list
    const boardTypeList = useSelector((state) => state.boardTypeList.boardTypeList);
    // option on/off handler
    const handleOptionOpen = () => {
        setIsOn(!isOn);
    };
    // option click set input value
    const handleSetOptionValue = (boardType) => {
        forwardRef.current.value = boardType.value;
        renderInputRef.current.value = boardType.name;
        setIsOn(false);
    };
    useEffect(() => {
        function handleClickOutside(event) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOn(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectRef]);

    return (
        <Wrapper ref={selectRef}>
            <HideInput
                ref={forwardRef}
                defaultValue={defaultTypeValue}
            ></HideInput>
            <InputWrapper
                onClick={handleOptionOpen}
            >
                <Input
                    ref={renderInputRef}
                    placeholder="글 카테고리"
                    readOnly
                    defaultValue={defaultTypeName}
                ></Input>
            </InputWrapper>
            <OptionWrapper $isOn={isOn}>
                {
                    boardTypeList.map((boardType, i) => (
                        <Option
                            key={i}
                            onClick={() => handleSetOptionValue(boardType)}
                        >{boardType.name}</Option>
                    ))
                }
            </OptionWrapper>
        </Wrapper>
    )
}