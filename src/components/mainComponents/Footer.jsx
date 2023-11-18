import styled from "@emotion/styled";
import { Colors } from "../../Theme";
import { FlexCenter } from "../FlexCenter";


export const Footer = styled(FlexCenter)(({ theme }) => ({
    width : "100%" , 
    backgroundColor : "#000" , 
    color  : "#fff" , 
    padding : "5px" ,
    textAlign : "center" , 
}));