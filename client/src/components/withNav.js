import { Outlet } from "react-router-dom"
import NavbarHomePage from "./navbarHomePage"
import React from "react"
const WithNav = () => {
    return <>
    <NavbarHomePage/>
    <Outlet/>
    </>
}
export default WithNav