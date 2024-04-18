import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export default function CustomButton(props) {

    var color = props.color ? props.color : "#000";
    var padding = props.padding ? props.padding : "0.5em 4em";
    var margin = props.margin ? props.margin : "0 0.5em";
    var height = props.height ? props.height : "auto";
    var width = props.width ? props.width : "auto";
    var txtHovColor = props.txtHovColor ? props.txtHovColor : "#000";

    const BtnStyles = styled(Button)`
        background-color: ${color};
        color: #fff;
        padding: ${padding};
        margin: ${margin};
        height: ${height};
        width: ${width};
        border-style: solid;
        border-width: 1px;
        border-color: ${color};
        transition: all 0.3s ease-in-out;
        &:hover {
            background-color: transparent;
            color: ${txtHovColor};
            border-style: solid;
            border-width: 1px;
            border-color: ${txtHovColor};
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