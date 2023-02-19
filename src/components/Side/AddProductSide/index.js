import React from "react";
import { useSelector } from "react-redux";
import Layout from "../Layout";

function AddProductSide({item}) {
  const body = (
    <p>{item.name}</p>
  )
    return (
        <Layout item={item}>
            {body}
        </Layout>
    )
}

export default AddProductSide;
