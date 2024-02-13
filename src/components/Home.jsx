import ResponsiveAppBar from "./Appbar";
import { useState, useEffect } from 'react';



export default function  Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
        <ResponsiveAppBar />
        
        </>
    )
}