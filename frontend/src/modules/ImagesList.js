import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateImages from './UpdateImages';

// let LIVEHOSTING_URL = 'https://imagecrudoperationss.onrender.com/'

const ImagesList = () => {
  const [ImgData, setImgData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fileId, setFileId] = useState();
  const [remove, setRemove] = useState();
   
  useEffect(() => {
    axios.get(`https://imagecrudoperationss.onrender.com/getImage`)
    .then((res)=> {
      if([res.data.image].length >1){
        setImgData(res.data.image)
      }else{
        setImgData(res.data)
      }
           
    }).catch((error)=> {
      console.log(error)
    })
  }, [ImgData])

  let handleEdit =(event) => {
      setFileId(event.target.value);
      setIsUpdate(true)
  }

  let handleDelete=(event)=> {
       event.preventDefault();
       setRemove(event.target.value)
  }

  useEffect(()=> {

    fetch(`https://imagecrudoperationss.onrender.com/remove/${remove}`, {
      method:"DELETE",
    }).then((res)=> {
       res.json()
    }).catch((error)=> {
      console.log(error)
    })

  }, [remove])
   
  let imgDatas =((ImgData.length > 1) ? ImgData.map((val, idx)=> {
       return(
        <tr key={idx}>
        <td>{idx + 1}</td>
        <td>
        {val.fileName}
        </td>
        <td >
       { ([ val.image].length > 0) ?  val.image.map((imgName, keyVal)=> {
        return (
        
          <img key={keyVal} className="tableImage" src={`https://imagecrudoperationss.onrender.com/public/${imgName}`} alt='not found'/>
       
        )
       }) 
        :
          <img className="tableImage" src={`https://imagecrudoperationss.onrender.com/public/${val.image}`} alt='not found'/>
        }
        </td>
        <td>
          <button value={val._id} bolean='true' onClick={handleEdit}>Edit</button>

          {/* {(isUpdate && (val._id === fileId)) &&
          <button>UPDATE</button>} */}
          <button value={val._id} onClick={handleDelete}>Delete</button>
        </td>
       </tr>
       )
  }) : 
     <div style={{textAlign:'center'}}>
      <span style={{textAlign:'center'}}>
        No Data found
      </span>
     </div>
  )
  return (
    <div>
      {
        (isUpdate) &&(fileId) && 
        <UpdateImages 
          updateFileId={fileId}
         />
      }
      <div>
      <h2>Images</h2>
          <table>
            <thead>
               <tr>
               <th>Index</th>
                <th>FileName</th>
                <th>FileView</th>
                <th>Operations</th>
               </tr>
            </thead>
            <tbody>
              {imgDatas}
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default ImagesList