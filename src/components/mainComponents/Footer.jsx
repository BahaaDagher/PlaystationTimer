import styled from "@emotion/styled";
import { Colors } from "../../Theme";
import { FlexCenter } from "../FlexCenter";


export const Footer = styled(FlexCenter)(({ theme }) => ({
    width : "100%" , 
    backgroundColor : "#02020a" , 
    color  : "#fff" , 
    padding : "8px" ,
    textAlign : "center" , 
}));