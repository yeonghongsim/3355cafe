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

export default function CheckBoxWrapper02({
    id,
    toggleEachCheckBox,
    checkedBoxs,
    setCheckedBoxs
}) {
    const [isCheckedEach, setIsCheckedEach] = useState(false);
    const checkboxClick = (id) => {
        toggleEachCheckBox(id);
        setIsCheckedEach(!isCheckedEach);
        console.log(checkedBoxs);
        let copy = [...checkedBoxs];
        if (!copy.includes(id)) {
            copy.push(id);
        } else {
            copy.filter((boardId) => boardId !== id);
        }
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