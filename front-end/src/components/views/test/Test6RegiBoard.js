// // // 최초 wysiwyg 코드
// // import { useRef, useState } from "react";
// // import styled from "styled-components"
// // import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// // import './custom-editor.css'
// // import { EditorState, convertToRaw } from "draft-js";
// // import { Editor } from "react-draft-wysiwyg";

// // const Wrapper = styled.div`
// //     width: 100%;
// //     height: 100%;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// // `;
// // const Form = styled.div`
// //     width: 80%;
// //     display: flex;
// //     flex-direction: column;
// //     align-items: flex-start;
// //     justify-content: flex-start;
// //     border-radius: 0.5rem;
// //     box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.15);
// //     background-color: white;
// //     padding: 0.5rem;
// //     gap: 0.5rem;
// //     box-sizing: border-box;
// // `;
// // const Layer = styled.div`
// //     width: 100%;
// //     display: flex;
// //     flex-direction: column;
// //     align-items: flex-start;
// //     justify-content: flex-start;
// // `;
// // const InputContainer = styled.div`
// //     width: 100%;
// //     display: flex;
// //     flex-direction: column;
// //     align-items: flex-start;
// //     justify-content: flex-start;
// //     gap: 0.5rem;
// // `;
// // const Label = styled.label`
// //     font-size: 1.8rem;
// //     font-weight: normal;
// //     margin: 0;
// // `;
// // const InputWrapper = styled.div`
// //     width: 100%;
// //     height: 3.5rem;
// //     background-color: white;
// //     border: 0.1rem solid black;
// //     border-radius: 0.5rem;
// //     box-sizing: border-box;
// //     display: flex;
// //     align-items: flex-start;
// //     justify-content: flex-start;
// // `;
// // const Input = styled.input`
// //     width: 100%;
// //     height: 100%;
// //     border: none;
// //     outline: none;
// //     padding-left: 1rem;
// //     border-radius: 0.5rem;
// //     font-size: 1.6rem;
// //     font-style: normal;
// //     font-weight: 400;
// //     line-height: normal;
// //     color: black;
// //     box-sizing: border-box;
// //     &:input:focus {
// //         border: none;
// //         outline: none;
// //     }
// // `;
// // const WysiwygContainer = styled.div`
// //     width: 100%;
// //     background-color: white;
// //     border: 0.1rem solid black;
// //     border-radius: 0.5rem;
// //     box-sizing: border-box;
// //     display: flex;
// //     align-items: flex-start;
// //     justify-content: flex-start;
// //     padding: 0.1rem;
// //     overflow: hidden;
// //     display: flex;
// //     align-items: flex-start;
// //     justify-content: flex-start;
// //     overflow-y: auto;
// // `;
// // const HideInput = styled.input`
// //     display: none;
// // `;
// // const BtnContainer = styled.div`
// //     width: 100%;
// //     height: 5rem;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// // `;
// // const Btn = styled.div`
// //     width: 12rem;
// //     height: 4rem;
// //     background-color: blue;
// //     border-radius: 0.5rem;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     font-size: 1.6rem;
// //     font-weight: bold;
// //     color: white;
// //     &:hover {
// //         cursor: pointer;
// //     }
// // `;

// // export default function Test6RegiBoard() {
// //     const titleRef = useRef(null);
// //     const hideInputRef = useRef(null);
// //     // file input open
// //     // const handleFileInputClick = () => {
// //     //     hideInputRef.current.click();
// //     // };
// //     // 아래 부터 wysiwyg part
// //     const [editorState, setEditorState] = useState(() =>
// //         EditorState.createEmpty()
// //     );
// //     // 이미지 업로드 콜백 함수
// //     const handleImageUploadCallback = (file) => {
// //         return new Promise((resolve, reject) => {
// //             const reader = new FileReader();
// //             reader.onloadend = () => {
// //                 resolve({ data: { link: reader.result } });
// //             };
// //             reader.onerror = reject;
// //             reader.readAsDataURL(file);
// //         });
// //     };
// //     // 등록 버튼 클릭
// //     const handleRegiBoard = () => {
// //         const contentState = editorState.getCurrentContent();
// //         const contentRaw = convertToRaw(contentState);
// //         const data = {
// //             title: titleRef.current.value,
// //             content: JSON.stringify(contentRaw),
// //         };
// //         console.log(data);
// //     };
// //     return (
// //         <Wrapper>
// //             <Form>
// //                 <Layer>
// //                     <InputContainer>
// //                         <Label>제목</Label>
// //                         <InputWrapper>
// //                             <Input ref={titleRef}></Input>
// //                         </InputWrapper>
// //                     </InputContainer>
// //                 </Layer>
// //                 <Layer>
// //                     <WysiwygContainer>
// //                         <HideInput
// //                             type="file"
// //                             ref={hideInputRef}
// //                             multiple="multiple"
// //                         ></HideInput>
// //                         <Editor
// //                             editorState={editorState}
// //                             wrapperClassName="wrapper-class"
// //                             toolbarClassName="toolbar-class"
// //                             editorClassName="editor-class"
// //                             onEditorStateChange={setEditorState}
// //                             placeholder="내용을 입력하세요."
// //                             toolbar={{
// //                                 options: [
// //                                     'image',
// //                                     'inline',
// //                                     'blockType',
// //                                     'fontSize',
// //                                     'list',
// //                                     'textAlign',
// //                                     'colorPicker',
// //                                     'link',
// //                                     'embedded',
// //                                     'emoji',
// //                                     'remove',
// //                                     'history'
// //                                 ],
// //                                 image: {
// //                                     uploadCallback: handleImageUploadCallback,
// //                                     alt: { present: true, mandatory: false },
// //                                     previewImage: true,
// //                                     inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
// //                                     defaultSize: {
// //                                         height: 'auto',
// //                                         width: '100%',
// //                                     },
// //                                 },
// //                             }}
// //                         />
// //                     </WysiwygContainer>
// //                 </Layer>
// //                 <Layer>
// //                     <BtnContainer>
// //                         <Btn onClick={handleRegiBoard}>등록</Btn>
// //                     </BtnContainer>
// //                 </Layer>
// //             </Form>
// //         </Wrapper>
// //     )
// // }
// import { useRef, useState } from "react";
// import styled from "styled-components"
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import './custom-editor.css'
// import { EditorState, convertToRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";

// const Wrapper = styled.div`
//     width: 100%;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `;
// const Form = styled.div`
//     width: 80%;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: flex-start;
//     border-radius: 0.5rem;
//     box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.15);
//     background-color: white;
//     padding: 0.5rem;
//     gap: 0.5rem;
//     box-sizing: border-box;
// `;
// const Layer = styled.div`
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: flex-start;
// `;
// const InputContainer = styled.div`
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: flex-start;
//     gap: 0.5rem;
// `;
// const Label = styled.label`
//     font-size: 1.8rem;
//     font-weight: normal;
//     margin: 0;
// `;
// const InputWrapper = styled.div`
//     width: 100%;
//     height: 3.5rem;
//     background-color: white;
//     border: 0.1rem solid black;
//     border-radius: 0.5rem;
//     box-sizing: border-box;
//     display: flex;
//     align-items: flex-start;
//     justify-content: flex-start;
// `;
// const Input = styled.input`
//     width: 100%;
//     height: 100%;
//     border: none;
//     outline: none;
//     padding-left: 1rem;
//     border-radius: 0.5rem;
//     font-size: 1.6rem;
//     font-style: normal;
//     font-weight: 400;
//     line-height: normal;
//     color: black;
//     box-sizing: border-box;
//     &:input:focus {
//         border: none;
//         outline: none;
//     }
// `;
// const WysiwygContainer = styled.div`
//     width: 100%;
//     background-color: white;
//     border: 0.1rem solid black;
//     border-radius: 0.5rem;
//     box-sizing: border-box;
//     display: flex;
//     align-items: flex-start;
//     justify-content: flex-start;
//     padding: 0.1rem;
//     overflow: hidden;
//     display: flex;
//     align-items: flex-start;
//     justify-content: flex-start;
//     overflow-y: auto;
// `;
// const HideInput = styled.input`
//     display: none;
// `;
// const BtnContainer = styled.div`
//     width: 100%;
//     height: 5rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `;
// const Btn = styled.div`
//     width: 12rem;
//     height: 4rem;
//     background-color: blue;
//     border-radius: 0.5rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 1.6rem;
//     font-weight: bold;
//     color: white;
//     &:hover {
//         cursor: pointer;
//     }
// `;

// export default function Test6RegiBoard() {
//     const titleRef = useRef(null);
//     const hideInputRef = useRef(null);
//     const handleInputClick = () => {
//         titleRef.current.focus();
//     };
//     const [editorState, setEditorState] = useState(() =>
//         EditorState.createEmpty()
//     );
//     const handleImageUploadCallback = (file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 resolve({ data: { link: reader.result } });
//             };
//             reader.onerror = reject;
//             reader.readAsDataURL(file);
//         });
//     };
//     const handleRegiBoard = () => {
//         const contentState = editorState.getCurrentContent();
//         const contentRaw = convertToRaw(contentState);
//         const data = {
//             title: titleRef.current.value,
//             content: JSON.stringify(contentRaw),
//         };
//         console.log(data);
//     };

//     return (
//         <Wrapper>
//             <Form>
//                 <Layer>
//                     <InputContainer>
//                         <Label>제목</Label>
//                         <InputWrapper>
//                             <Input
//                                 ref={titleRef}
//                                 onClick={handleInputClick}
//                             ></Input>
//                         </InputWrapper>
//                     </InputContainer>
//                 </Layer>
//                 <Layer>
//                     <WysiwygContainer>
//                         <HideInput
//                             type="file"
//                             ref={hideInputRef}
//                             multiple="multiple"
//                         ></HideInput>
//                         <Editor
//                             editorState={editorState}
//                             wrapperClassName="wrapper-class"
//                             toolbarClassName="toolbar-class"
//                             editorClassName="editor-class"
//                             onEditorStateChange={setEditorState}
//                             placeholder="내용을 입력하세요."
//                             // 한국어 설정
//                             localization={{
//                                 locale: 'ko',
//                             }}
//                             toolbar={{
//                                 options: [
//                                     'image',
//                                     'inline',
//                                     'blockType',
//                                     'fontSize',
//                                     'list',
//                                     'textAlign',
//                                     'colorPicker',
//                                     'link',
//                                     'embedded',
//                                     'emoji',
//                                     'remove',
//                                     'history'
//                                 ],
//                                 image: {
//                                     uploadCallback: handleImageUploadCallback,
//                                     alt: { present: true, mandatory: false },
//                                     previewImage: true,
//                                     inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
//                                     defaultSize: {
//                                         height: 'auto',
//                                         width: '100%',
//                                     },
//                                 },
//                             }}
//                         />
//                     </WysiwygContainer>
//                 </Layer>
//                 <Layer>
//                     <BtnContainer>
//                         <Btn onClick={handleRegiBoard}>등록</Btn>
//                     </BtnContainer>
//                 </Layer>
//             </Form>
//         </Wrapper>
//     )
// }

// GPT를 사용한 ver.2
// wysiwyg 내 한글 관련 오류 해결 못했음
// 짧은 글내용과 이미지 1개는 db에 업로드 가능
// import { useRef, useState } from "react";
// import styled from "styled-components";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import './custom-editor.css';
// import { EditorState, convertToRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from 'draftjs-to-html';

// const Wrapper = styled.div`
//     width: 100%;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `;
// const Form = styled.div`
//     width: 80%;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: flex-start;
//     border-radius: 0.5rem;
//     box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.15);
//     background-color: white;
//     padding: 0.5rem;
//     gap: 0.5rem;
//     box-sizing: border-box;
// `;
// const Layer = styled.div`
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: flex-start;
// `;
// const InputContainer = styled.div`
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: flex-start;
//     gap: 0.5rem;
// `;
// const Label = styled.label`
//     font-size: 1.8rem;
//     font-weight: normal;
//     margin: 0;
// `;
// const InputWrapper = styled.div`
//     width: 100%;
//     height: 3.5rem;
//     background-color: white;
//     border: 0.1rem solid black;
//     border-radius: 0.5rem;
//     box-sizing: border-box;
//     display: flex;
//     align-items: flex-start;
//     justify-content: flex-start;
// `;
// const Input = styled.input`
//     width: 100%;
//     height: 100%;
//     border: none;
//     outline: none;
//     padding-left: 1rem;
//     border-radius: 0.5rem;
//     font-size: 1.6rem;
//     font-style: normal;
//     font-weight: 400;
//     line-height: normal;
//     color: black;
//     box-sizing: border-box;
//     &:focus {
//         border: none;
//         outline: none;
//     }
// `;
// const WysiwygContainer = styled.div`
//     width: 100%;
//     background-color: white;
//     border: 0.1rem solid black;
//     border-radius: 0.5rem;
//     box-sizing: border-box;
//     display: flex;
//     align-items: flex-start;
//     justify-content: flex-start;
//     padding: 0.1rem;
//     overflow: hidden;
//     display: flex;
//     align-items: flex-start;
//     justify-content: flex-start;
//     overflow-y: auto;
// `;
// const HideInput = styled.input`
//     display: none;
// `;
// const BtnContainer = styled.div`
//     width: 100%;
//     height: 5rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `;
// const Btn = styled.div`
//     width: 12rem;
//     height: 4rem;
//     background-color: blue;
//     border-radius: 0.5rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 1.6rem;
//     font-weight: bold;
//     color: white;
//     &:hover {
//         cursor: pointer;
//     }
// `;

// export default function Test6RegiBoard() {
//     const titleRef = useRef(null);
//     const hideInputRef = useRef(null);
//     const [editorState, setEditorState] = useState(() =>
//         EditorState.createEmpty()
//     );
//     const [uploadedImages, setUploadedImages] = useState([]);

//     const handleImageUploadCallback = (file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setUploadedImages(prevImages => [...prevImages, file.name]);
//                 resolve({ data: { link: reader.result } });
//             };
//             reader.onerror = reject;
//             reader.readAsDataURL(file);
//         });
//     };

//     const handleRegiBoard = async () => {
//         const contentState = editorState.getCurrentContent();
//         const contentRaw = convertToRaw(contentState);
//         const contentHTML = draftToHtml(contentRaw);
//         const data = {
//             id: 'board_002',
//             title: titleRef.current.value,
//             content: JSON.stringify(contentRaw),
//             contentHTML: contentHTML,
//             images: uploadedImages,
//         };
//         console.log(data);
//         try {
//             const response = await fetch('http://localhost:8080/test/wysiwyg', {
//                 method: "POST",
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });

//             if (response.ok) {
//                 console.log('Wysiwyg Data saved successfully');
//                 // window.location.href = '/test6/2';
//             } else {
//                 console.log('Failed to save data');
//             }
//         } catch (error) {
//             console.log('Error:', error);
//         }
//     };

//     return (
//         <Wrapper>
//             <Form>
//                 <Layer>
//                     <InputContainer>
//                         <Label>제목</Label>
//                         <InputWrapper>
//                             <Input ref={titleRef}></Input>
//                         </InputWrapper>
//                     </InputContainer>
//                 </Layer>
//                 <Layer>
//                     <WysiwygContainer>
//                         <HideInput
//                             type="file"
//                             ref={hideInputRef}
//                             multiple="multiple"
//                         ></HideInput>
//                         <Editor
//                             editorState={editorState}
//                             wrapperClassName="wrapper-class"
//                             toolbarClassName="toolbar-class"
//                             editorClassName="editor-class"
//                             onEditorStateChange={setEditorState}
//                             placeholder="내용을 입력하세요."
//                             localization={{
//                                 locale: 'ko',
//                             }}
//                             toolbar={{
//                                 options: [
//                                     'image',
//                                     'inline',
//                                     'blockType',
//                                     'fontSize',
//                                     'list',
//                                     'textAlign',
//                                     'colorPicker',
//                                     'link',
//                                     'embedded',
//                                     'emoji',
//                                     'remove',
//                                     'history'
//                                 ],
//                                 image: {
//                                     uploadCallback: handleImageUploadCallback,
//                                     alt: { present: true, mandatory: false },
//                                     previewImage: true,
//                                     inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
//                                     defaultSize: {
//                                         height: 'auto',
//                                         width: '100%',
//                                     },
//                                 },
//                             }}
//                         />
//                     </WysiwygContainer>
//                 </Layer>
//                 <Layer>
//                     <BtnContainer>
//                         <Btn onClick={handleRegiBoard}>등록</Btn>
//                     </BtnContainer>
//                 </Layer>
//             </Form>
//         </Wrapper>
//     );
// }

// ver.3
// img file 여러개여도 업로드 성공 - 최종 끝
import { useRef, useState } from "react";
import styled from "styled-components";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './custom-editor.css';
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Form = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 0.5rem;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.15);
    background-color: white;
    padding: 0.5rem;
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
const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.5rem;
`;
const Label = styled.label`
    font-size: 1.8rem;
    font-weight: normal;
    margin: 0;
`;
const InputWrapper = styled.div`
    width: 100%;
    height: 3.5rem;
    background-color: white;
    border: 0.1rem solid black;
    border-radius: 0.5rem;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const Input = styled.input`
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
    &:focus {
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
const HideInput = styled.input`
    display: none;
`;
const BtnContainer = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Btn = styled.div`
    width: 12rem;
    height: 4rem;
    background-color: blue;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    font-weight: bold;
    color: white;
    &:hover {
        cursor: pointer;
    }
`;

export default function Test6RegiBoard() {
    const titleRef = useRef(null);
    const hideInputRef = useRef(null);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [uploadedImages, setUploadedImages] = useState([]);

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
    const handleImageUploadCallback = async (file) => {
        try {
            const resizedImage = await resizeImage(file, 800, 600); // 최대 너비와 높이를 설정하세요
            const reader = new FileReader();
            reader.readAsDataURL(resizedImage);
            return new Promise((resolve) => {
                reader.onloadend = () => {
                    setUploadedImages(prevImages => [...prevImages, file.name]);
                    resolve({ data: { link: reader.result } });
                };
            });
        } catch (error) {
            console.error('이미지 축소 중 오류 발생:', error);
            return Promise.reject(error);
        }
    };

    const handleRegiBoard = async () => {
        const contentState = editorState.getCurrentContent();
        const contentRaw = convertToRaw(contentState);
        const contentHTML = draftToHtml(contentRaw);
        const data = {
            id: 'board_003',
            title: titleRef.current.value,
            content: JSON.stringify(contentRaw),
            contentHTML: contentHTML,
            images: uploadedImages,
        };
        console.log(data);
        try {
            const response = await fetch('http://localhost:8080/test/wysiwyg', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // console.log('Wysiwyg Data saved successfully');
                window.location.href = '/test6/2';
            } else {
                console.log('Failed to save data');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <Wrapper>
            <Form>
                <Layer>
                    <InputContainer>
                        <Label>제목</Label>
                        <InputWrapper>
                            <Input ref={titleRef}></Input>
                        </InputWrapper>
                    </InputContainer>
                </Layer>
                <Layer>
                    <WysiwygContainer>
                        <HideInput
                            type="file"
                            ref={hideInputRef}
                            multiple="multiple"
                        ></HideInput>
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
                                    'list',
                                    'textAlign',
                                    'colorPicker',
                                    'link',
                                    'embedded',
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
                                        width: '100%',
                                    },
                                },
                            }}
                        />
                    </WysiwygContainer>
                </Layer>
                <Layer>
                    <BtnContainer>
                        <Btn onClick={handleRegiBoard}>등록</Btn>
                    </BtnContainer>
                </Layer>
            </Form>
        </Wrapper>
    );
}
