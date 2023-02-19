import React from "react";
import { useSelector } from "react-redux";
import Layout from "../Layout";

function AccountSide({item}) {
  const Body = (
    <p>{item.name}</p>
  )
    return (
        <Body/>
    )
}

export default AccountSide;
