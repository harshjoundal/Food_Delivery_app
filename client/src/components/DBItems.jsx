import React, { useEffect } from "react";
import DataTable from "./DataTable";
import {HiCurrencyRupee} from 'react-icons/hi'
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAll_Products } from "../api";
import { setAllProducts } from "../context/actions/productAction";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";

const DBItems = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAll_Products().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
 }, []);

  const col =[  
          {
            title: "Image",
            field: "imageURL",
            render: (rowData) => (
              <img
                src={rowData.imageURL}
                alt=""
                className="w-32 h-16 object-contain rounded-md"
              />
            ),
          },
          {
            title: "Name",
            field: "product_name",
          },
          {
            title: "Category",
            field: "product_category",
          },
          {
            title: "Price",
            field: "product_price",
            render: (rowData) => (
              <p className="text-xl font-semibold text-textColor flex items-center justify-center">
                <HiCurrencyRupee className="text-red-400" />
                {parseFloat(rowData.product_price).toFixed(2)}
              </p>
            ),
          }
        ]
  return (
    <div className="flex items-center justify-center gap-4 pt-6 w-full">
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
              if( window.confirm("Are you sure, you want to delete")){
                  console.log(rowData.productId,"<<<<<<<");
                  deleteProduct(rowData.productId)
                  .then(()=>{
                      dispatch(alertSuccess("Product Deleted"))
                      setTimeout(()=>{
                          dispatch(alertNULL())
                      },3000)
                      getAll_Products().then((data) => {
                        dispatch(setAllProducts(data));
                      });
                  })
              }
              else{

              }
            },
          },
        ]}
      />
    </div>
  );
};

export default DBItems;
