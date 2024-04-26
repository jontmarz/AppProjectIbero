import React, { useState } from 'react'
import { useUserContext } from '../context/UserContext'
import { IconButton } from "@mui/material"
import { styled } from '@mui/material/styles'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { Link } from "react-router-dom";

export default function FixedButton(props) {

    const [showScroll, setShowScroll] = useState(false);
    const { logIn } = useUserContext()
    let bottom = props.bottom ? props.bottom : '30px';
    let right = props.right ? props.right : '30px';
    let BGColor = props.BGColor ? props.BGColor : 'secondary.main';
    let BGColorH = props.BGColorH ? props.BGColorH : 'primary.dark';

    const checkScrollTop = () => {
        if (!showScroll && window.scrollY > 100) {
            setShowScroll(true);
        } else if (showScroll && window.scrollY <= 100) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', checkScrollTop);

    const menu = logIn ? true : false
    
    return (
        <>
        {showScroll && (
            <IconButton
                onClick={scrollTop}
                sx={{
                    position: 'fixed',
                    bottom: `${bottom}`,
                    right: `${right}`,
                    backgroundColor: `${BGColor}`,
                    '&:hover': {
                        backgroundColor: `${BGColorH}`,
                    }
                }}
                aria-label="scroll-up"
            >
                <KeyboardArrowUpIcon color="white" />
            </IconButton>
        )}
        </>
    )
}
