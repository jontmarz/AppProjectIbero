import styled from "@emotion/styled";
import logo from "../assets/logo-ibero-transparent.png";

const Img = styled("img")({
    width: 300,
    objectFit: "cover",
    objectPosition: "center",
    marginTop: "2em"
})

export default function Logo() {
    return (
        <Img src={logo} alt="Logo" />
    )
}