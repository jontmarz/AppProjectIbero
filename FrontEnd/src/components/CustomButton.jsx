import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export default function CustomButton(props) {

    const BtnStyles = styled(Button,)`
        background-color: #000;
        color: #fff;
        transition: all 0.3s ease-in-out;
        padding: 0.5em 4em;
        &:hover {
            background-color: transparent;
            color: #000;
            border: 1px solid #000;
        }
    `;

    
    if (props.anchor) {
        return (<BtnStyles component={Link} to={props.anchor}>{props.name}</BtnStyles>)
    } else {
        return(<BtnStyles type="submit">{props.name}</BtnStyles>)
    }
}