import React, {  useState } from "react";
// import axios from "axios";



const UploadImages = () => {

 const [files, setFiles] = useState();
 const [fileName, setFileName] = useState([]);
 const [addMore, setAddMore] = useState([localStorage.getItem('rowArray')]);
 
 let addMoreFiles =()=> {
     let data ={
      files:'',
      fileName:[...fileName]
     }
     setAddMore([...addMore, data]);
     localStorage.setItem('rowArray',[...addMore]);
 }

 let removeFiles =(index) => {
    let restFiles = [...addMore];
      restFiles.splice(index, 1);
      setAddMore(restFiles);
      localStorage.setItem('rowArray',[...addMore]);
 }

  let handleFiles = (event) =>{
      setFiles(event.target.files) 
  }
  let handleFName=(event)=> {
    setFileName(event.target.value);
  }

  let uploadFile =(event) => {
      event.preventDefault();

      let formData = new FormData();
      for(let i=0; i<files.length; i++){
        formData.append("file", files[i])
      }
      formData.append('fileName', fileName)
        console.log(formData)
      //  axios.post("http://localhost:8000/img/upload", formData)
      //  .then((res)=> {
      //   console.log(res)
      //  }).catch((error) => {
      //   console.log(error)
      //  })

      fetch("https://imagecrudoperationss.onrender.com/img/upload", {
         method:"POST",
         body:formData,
         "Content-Type":"application/json"
      }).then(async(res)=> {
        await res.json();
      }).catch((error)=> {
        console.log(error)
      })

  }
  return (
    <div>
      <div className="imageUploads">
        <h2>Uploads Images </h2>
        <input type="text" name="fileName" onChange={handleFName} placeholder="fileName"/>
        <input type="file" onChange={handleFiles} alt="not found" multiple />
        {/* <div>
            <h3>Preview Images</h3>
            {files && 
             (   
              <div>      
                <img src={URL.createObjectURL(files)} className="previewImg" alt="not found"/>
              </div>
            )
            }
        </div> */}
        {

          addMore.map((dataVal, idx)=> {
            return(
              <div key={idx} >
              <input type="text" name={`fileName${idx}`}   placeholder="Filename"/>
              <input type="file" onChange={handleFiles} placeholder="files" multiple />
              <button onClick={()=>{removeFiles(idx)}}>Remove</button>
              </div>
            )
          })
        }
        <div>
            <button onClick={addMoreFiles} >ADD +</button>
        </div>
      </div>
      <div>
        <button onClick={uploadFile}> Uploads</button>
      </div>
    </div>
  );
};

export default UploadImages;
