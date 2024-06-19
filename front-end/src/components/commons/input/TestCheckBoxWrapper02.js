import { useState } from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ToggleImg = styled.img`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    &:hover {
        cursor: pointer;
    }
`;
const HideInput = styled.input`
    display: none;
`;

export default function TestCheckBoxWrapper02({
    id,
    checkedBoxs,
    setCheckedBoxs,
    handleEachCheckBox,
}) {
    const [isCheckedEach, setIsCheckedEach] = useState(false);
    const checkboxClick = (id) => {
        setIsCheckedEach(!isCheckedEach);
        let copy = [...checkedBoxs];
        if (!copy.includes(id)) {
            // console.log('add');
            copy.push(id);
        } else {
            // console.log('remove');
            copy = copy.filter((boardId) => boardId !== id);
        }
        copy.sort((a, b) => a - b);
        setCheckedBoxs(copy);
    };

    return (
        <Wrapper>
            {
                isCheckedEach ?
                    <ToggleImg
                        src="/image/checkbox-checked.svg"
                        draggable="false"
                        onClick={() => checkboxClick(id)}
                    ></ToggleImg> :
                    <ToggleImg
                        src="/image/checkbox-unchecked.svg"
                        draggable="false"
                        onClick={() => checkboxClick(id)}
                    ></ToggleImg>
            }
            <HideInput
                type="checkbox"
                id={id}
                checked={isCheckedEach}
                onChange={() => checkboxClick(id)}
            ></HideInput>
        </Wrapper>
    )
}