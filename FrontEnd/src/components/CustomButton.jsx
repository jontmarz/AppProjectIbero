import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export default function CustomButton(props) {

    var color = props.color ? props.color : "#000";

    const BtnStyles = styled(Button)`
        background-color: ${color};
        color: #fff;
        transition: all 0.3s ease-in-out;
        padding: 0.5em 4em;
        margin: 0 0.5em;
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
        return (<BtnStyles component={Button} onClick={props.action} disabled={props.data}>{props.name}</BtnStyles>)
    }else {
        return(<BtnStyles type="submit" disabled={props.data} className="custom_button">{props.name}</BtnStyles>)
    }
}