import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAll_Users} from '../api/index'
import { setAllUserDetails } from '../context/actions/AllUsersAction'
import DataTable from './DataTable'

const DBUsers = () => {

  const allUsers = useSelector((state)=>state.allUsers)
  const dispatch = useDispatch()

  console.log(allUsers);

  useEffect(()=>{
    if(!allUsers){
      getAll_Users()
      .then(data =>{
        dispatch(setAllUserDetails(data));
      })
    }
  },[])

  const col = []

  return (
    <div>
      {/* <div className="flex items-center justify-center gap-4 pt-6 w-full">
        <DataTable
          columns={col}
          data={products ? products : []}
          title="List of Products"
          actions={[
            {
              icon: "edit",
              tooltip: "Edit data",
              onClick: (event, rowData) => {
                alert("you want to edit" + rowData.productId);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete Data",
              onClick: (event, rowData) => {
                if (window.confirm("Are you sure, you want to delete")) {
                  console.log(rowData.productId, "<<<<<<<");
                  deleteProduct(rowData.productId).then(() => {
                    dispatch(alertSuccess("Product Deleted"));
                    setTimeout(() => {
                      dispatch(alertNULL());
                    }, 3000);
                    getAll_Products().then((data) => {
                      dispatch(setAllProducts(data));
                    });
                  });
                } else {
                }
              },
            },
          ]}
        />
      </div> */}
    </div>
  );
}
 
export default DBUsers