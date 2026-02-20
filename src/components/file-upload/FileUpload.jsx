import React, { useRef, useState } from 'react'
import './fileUpload.css'

const FileUpload = ({status, closeMethod,dropMethod}) => {

    const [drag, setDrag] = useState(false)

    const handleDragOver = (e) => {
        e.preventDefault()
        setDrag(true)
    }

    const handleDragLeave = () => {
        setDrag(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDrag(false);

        const files = Array.from(e.dataTransfer.files);
        console.log('inside',files);
        dropMethod(files);
        closeMethod();
    };
    
    const handleFilesDrop = (el) =>{
        const files = Array.from(el);
        console.log('inside',files);
        dropMethod(files);
        closeMethod();
    }

    const fileInput = useRef(null);

    return (
        <div
            className='file-upload-holder'
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInput.current.click()}
            style={{
                borderColor:drag?'blue':'green'
            }}
        >
            Drag and drop your files in this area or click to upload files from local storage.
            <input type="file" multiple style={{ display: 'none' }} ref={fileInput} onChange={(e)=>handleFilesDrop(e.target.files)} />

        </div>
    )
}

export default FileUpload   
