import React, {FC, ReactNode, useEffect, useState} from "react";
import {useTheme } from 'vcc-ui'

interface Props {
    data:  Array<ReactNode>,
}
const SpringCarousel: FC<Props> = ({data}) => {
    const theme = useTheme();
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        if (!window) return
        function handleResize() {
             const mobile = window.innerWidth < 480
             if (mobile !== isMobile) setIsMobile(mobile);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [theme, isMobile]);
    return (
    );
}
export default SpringCarousel
