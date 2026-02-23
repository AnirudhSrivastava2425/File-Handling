import { useState } from 'react'
import './App.css'
import Modal from './components/modal/Modal'
import FileUpload from './components/file-upload/FileUpload'

function App() {
  const [status, setStatus] = useState(false)

  const [file, setFile] = useState([])

  const filesUpload = (files) => {
    let filesArr = files.map((elem) => ({
      elem,
      preview: URL.createObjectURL(elem),
      type: elem.type,
    }))

    setFile((prev) => [...prev, ...filesArr])
  }

  const handleFileDelete = (index) => {
    let updatedFiles = file.filter((_, i) => i !== index)
    setFile(updatedFiles)
    console.log(file)
  }
  return (
    <>

      <Modal status={status} closeMethod={() => setStatus(false)}>
        <FileUpload status={status} closeMethod={() => setStatus(false)} dropMethod={filesUpload} />
      </Modal>

      <h1>File Management | Drag-n-Drop</h1>
      <p>Let's look into how to create a file drag-n-drop modal which is reusable across our application.</p>
      <br />
      <button onClick={() => setStatus(true)}>Upload Files</button>
      <br />
      <br />
      <div className="preview-img">
        {file[0] ? file.map((elem, index) => (
          <div className="preview-wrapper" onClick={() => handleFileDelete(index)}>
            {elem.type.startsWith("image/") ? (<img key={elem.name} className='preview-images' src={elem.preview} alt={elem.name} />)
              : elem.type === "application/pdf" ?
                (<iframe
                  src={elem.preview}
                  title="pdf-preview"
                  className="preview-pdf"
                />) : "Not Supported"}
            {/* <img key={elem.name} className='preview-images' onClick={() => handleFileDelete(index)} src={elem.preview} alt={elem.name} /> */}
          </div>
        )) : "No files added."}</div>
    </>
  )
}

export default App
