import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export default function CustomButton(props) {

    const BtnStyles = styled(Button)`
        background-color: #000;
        color: #fff;
        transition: all 0.3s ease-in-out;
        padding: 0.5em 4em;
        &:hover {
            background-color: transparent;
            color: #000;
            border: 1px solid #000;
        }
        &.Mui-disabled { color: #fff; }
    `;

    
    if (props.anchor) {
        return (<BtnStyles component={Link} to={props.anchor} className="custom_button">{props.name}</BtnStyles>)
    } else if(props.action) {
        return (<BtnStyles component={Button} onClick={props.action}>{props.name}</BtnStyles>)
    }else {
        return(<BtnStyles type="submit" disabled={props.data} className="custom_button">{props.name}</BtnStyles>)
    }
}