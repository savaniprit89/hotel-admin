import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from '../../Hooks/useFetch'
import axios from "axios";
const Datatable = ({columns}) => {
 // const [data, setData] = useState(userRows);
 /*
 const location=useLocation()
const path=location.pathname.split('/')[1]

const {data,loading,error}=useFetch(`http://localhost:9000/${path}`)

const [list,setlist]=useState(data);
useEffect(()=>{
  setlist(data)
    },[data])
    console.log("sds",list)
  const handleDelete = async(id) => {
  
try{
  const user = localStorage.getItem('user');
        const json = JSON.parse(user);
        console.log("Sdssd")
        const token=json["token"];
        const headers = { Authorization: `Bearer ${token}`};
await axios.delete(`http://localhost:9000/${path}/${id}`,{headers:headers})
setlist(list.filter((item) => item.id !== id));
}catch(err){

}
  };
  
console.log("sajsaj",data);*/
const location = useLocation();
const path = location.pathname.split("/")[1];

const { data, loading, error } = useFetch(`https://booking-backend-6nn8.onrender.com/${path}`);
const [list, setList] = useState(data);
useEffect(() => {
  setList(data);
  console.log(data)
}, [data]);

const handleDelete = async (id) => {
  try {
    const user = localStorage.getItem('user');
        const json = JSON.parse(user);
        console.log("Sdssd")
        const token=json["token"];
        const headers = { Authorization: `Bearer ${token}`};
await axios.delete(`https://booking-backend-6nn8.onrender.com/${path}/${id}`,{headers:headers})
    setList(list.filter((item) => item._id !== id));
  } catch (err) {}
};
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {`${path}`}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
