import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UpdateImages = ({updateFileId}) => {
   const [files, setFiles] = useState();
   const [fileName, setFileName] = useState();
  //  const [fileData, setFileData] = useState([]);
   
   let handleFName =(event) => {
      setFileName(event.target.value);
   }
   let handleFiles =(event) => {
    setFiles(event.target.files[0]);
   }
   
   useEffect(()=> {
    axios.get(`https://imagecrudoperationss.onrender.com/updates/${updateFileId}`)
    .then((res)=>{
      setFileName(res.data.fileName)
      setFiles(res.data.files)
      // setFileData(res.data);
    }).catch((error)=> {
      console.log("error >>> ",  error)
    })
   }, [updateFileId])


   let updateFiles=(event)=> {
         event.preventDefault();
         let formData = new FormData();
         formData.append('file', files);
         formData.append('fileName', fileName);

        //  axios.put(`http://localhost:8000/update/${updateFileId}`, formData)
        //  .then((res)=>{
        //   res.json()
        //  }).catch((error)=> {
        //   console.log(error)
        //  })

        fetch(`http://localhost:8000/update/${updateFileId}`, {
          method:"PUT",
          body:formData,
          "Content-Type":"application/json"
        })
        .then((res)=> {
            res.json()
        }).catch((error)=> {
          console.log(error)
        })
   }
  return (
    <div>
        <div className='updateImages'> 
        <h2>Update Images </h2>
        <input type="text" value={fileName}  name="fileName" onChange={handleFName} />
        <input type="file"  onChange={handleFiles} alt="not found" multiple />
        <div>
            <h3>Preview Images</h3>
            {files && 
             (   
              <div>      
                <img src={URL.createObjectURL(files)} className="previewImg" alt="not found"/>
              </div>
            )
            }
        </div>
      </div>
      <div>
        <button onClick={updateFiles}> UPDATES</button>
      </div>
   </div>
  )
}

export default UpdateImages