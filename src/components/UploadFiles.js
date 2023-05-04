import './UploadFiles.css';

const UploadFiles = ( {onUploadedFile} ) => {
    
  return (
    <div className='uploadDiv'>
        <label className='upFile'>Upload XSF File</label>
        <input type = 'file' multiple onChange = {onUploadedFile}/>
    </div>
  )
}

export default UploadFiles