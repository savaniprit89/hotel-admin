import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const navigate=useNavigate();
  const [file, setFile] = useState("");
  const [info,setinfo]=useState({});
  const handlechange=(e)=>{
    setinfo(prev=>({...prev,[e.target.id]:e.target.value}))
  };
const handleclick= async (e) => {
  e.preventDefault();
const data=new FormData();
data.append("file",file);
data.append("upload_preset","upload")

try {
 const uploadres=await axios.post("https://api.cloudinary.com/v1_1/dhzh0vxzv/image/upload",data)
 const {url}=uploadres.data
 
  const newuser={
    ...info,img:url
  }
  console.log(newuser);
  await axios.post("https://booking-backend-6nn8.onrender.com/auth/register",newuser)
navigate("/users")
} catch (error) {
  console.log(error);
}
}
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handlechange} type={input.type} placeholder={input.placeholder}  id={input.id}/>
                </div>
              ))}
              <button onClick={handleclick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
