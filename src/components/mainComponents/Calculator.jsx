import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { FlexCenter } from '../FlexCenter';
import { Colors } from '../../Theme';
import Swal from 'sweetalert2';
import { Flex } from '../Flex';
import { FlexSpaceBetween } from '../FlexSpaceBetween';
import { Footer } from './Footer';
import ps from "../../assets/ps.jpg"

export const Parent = styled(Flex)(({ theme }) => ({
  alignItems: "center",
  justifyContent : "space-between" , 
  height: "100vh",
  width: "100%",
  flexDirection: "column",
  backgroundImage :`url(${ps})` ,
  backgroundSize : "cover" ,
  position : "relative" ,
}));
export const Title = styled("div")(({ theme }) => ({
  fontSize: "40px",
  fontWeight: "600",
  color : Colors.bgBL ,
}));
export const Container = styled("div")(({ theme }) => ({
  padding: "20px",
  width: "95%",
  margin: "0 auto",
  borderRadius: "10px 10px 0 0", 
  height : "70%" , 
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
  borderBottom : "1px solid #fff" ,
  borderRight : "1px solid #fff" ,
  overflowY : "auto" ,
}));
export const TimerParent = styled("div")(({ theme }) => ({
  background: Colors.bgBL,
  padding: "10px 0",
  marginBottom: "15px",
  borderRadius: "10px",
  position: "relative",
}));
export const DeleteIcon = styled(FlexCenter)(({ theme }) => ({
  position: "absolute",
  backgroundColor :Colors.red ,
  textAlign:"center"  ,
  color : "#fff" , 
  width : "25px" , 
  height : "25px" , 
  fontSize : "14px" , 
  borderRadius : "50%" , 
  top : "-10px" , 
  right : "-12.5px" , 
  cursor : "pointer" , 
  outline : "3px solid #fff"
}));
export const Timer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap : "wrap" , 
  padding : "10px" , 
}));
export const TimeSection = styled(FlexCenter)(({ theme }) => ({
  width : "26%" ,
  fontSize : "15px" ,
  flexDirection : "column" ,
  [theme.breakpoints.down("600")] : {
    flexDirection : "row" ,
    justifyContent : "space-between" ,
    marginBottom : "10px" , 
    width : "100%" , 
  } , 
}));
export const Input = styled("input")(({ theme }) => ({
  padding: "5px 10px",
  borderRadius: "5px",
  width :"120px" , 
}));

export const Label = styled("label")(({ theme }) => ({
  marginBottom: "5px",
  fontSize : "15px" ,
  fontWeight : "600" ,
}));
export const CalcButton = styled(FlexCenter)(({ theme }) => ({
  background: Colors.main,
  fontWeight: "600",
  color: "white",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize : "18px",
  transition : "all 0.3s ease-in-out" ,
  [theme.breakpoints.down("400")] : {
    fontSize : "15px",
  } , 
  "&.normal" : {
    [theme.breakpoints.down("600")] : {
      width : "100%"
    } , 
  },
  

  "&:hover" : {
    background : Colors.hoverMain , 
  },
  "&.disappear" : {
    [theme.breakpoints.down("600")] : {
      width : "100%"
    } , 
    background : Colors.red ,
    "&:hover" : {
      background : Colors.hoverRed , 
    }, 
  },
  "&.all" : {
    background : Colors.green ,
    borderRadius : "0 0 10px 10px" ,
    "&:hover" : {
      background : Colors.hoverGreen , 
    }, 
  },
  "&.add" : {
    background : Colors.yellow ,
    color : "#000" , 
    borderRadius : "0 0 10px 10px" ,
    "&:hover" : {
      background : Colors.hoverYellow , 
    }, 
  },
  "&.clear" : {
    background : Colors.red ,
    color : "#fff" ,
    marginLeft: "10px" ,  
    borderRadius : "0 0 10px 10px" ,
    [theme.breakpoints.down("400")] : {
      marginLeft: "5px" , 
    } , 
    "&:hover" : {
      background : Colors.hoverRed , 
    }, 
  },
}));
export const OneResult = styled("div")(({ theme }) => ({
  textAlign : "center" ,
  fontSize : "20px" ,
  fontWeight : "600" ,
  padding : "10px" ,
  "&.all" : {
    color : "#fff" , 
  }
}));
export const TimeResult = styled("div")(({ theme }) => ({
  
}));
export const PriceResult = styled("div")(({ theme }) => ({

}));

export const Result = styled("div")(({ theme }) => ({
  width : "95%" ,
}));
export const ButtonsContainer = styled(FlexSpaceBetween)(({ theme }) => ({

}));
export const Price = styled("span")(({ theme }) => ({
  color : "red" ,
  fontSize : "25px" ,  

}));

const Calculator = () => {

  const formatNumberToArabic = (number) => {
    return number.toLocaleString('ar-EG');
  };

  const TimeConvert = (time)=> {
    let sHours , sMinutes 
    sHours = parseInt(time.split(":")[0])
    sMinutes = parseInt(time.split(":")[1])
    return (sHours*60)  + sMinutes
  }
  
  const [timeSections, setTimeSections] = useState([
    { startTime: "", endTime: "", price: "", totalTime: {hours : 0 , minutes :0}, totalPrice: 0 , show : false },
  ]);

  useEffect(() => {
    console.log(timeSections);
    timeSections.map((section , index) => {
      if (section.startTime !== "" && section.endTime !== "" && section.price !== "") {
        let firstTime = TimeConvert(section.startTime)
        let secondTime = TimeConvert(section.endTime)

        let totalTime = secondTime - firstTime
        if (totalTime < 0) {
          totalTime += 1440
        }
        let pricePerMinute =section.price/ 60
        let totalPrice = parseFloat( (totalTime * pricePerMinute).toFixed(2));

        section.totalPrice= totalPrice

        let hours = Math.floor(totalTime / 60)
        let minutes = totalTime % 60
        
        section.totalTime.hours = hours

        section.totalTime.minutes = minutes
      }
    }
    )
  }, [timeSections]);

  const addTimeSection = () => {
    setTimeSections((prevSections) => [
      ...prevSections,
      { startTime: "", endTime: "", price: "", totalTime: {hours : 0 , minutes :0}, totalPrice: 0 , show : false},
    ]);
  };

  const editTimeSection = (index , section) => {
    setTimeSections((prevSections) =>
    prevSections.map((prevSection, i) =>
      i === index
        ? section
        : prevSection
    ))
  };

  const calcOneTimePrice = (section , index) => {
    let firstTime = TimeConvert(section.startTime)
    let secondTime = TimeConvert(section.endTime)

    console.log("firstTime", firstTime) 
    console.log("secondTime", secondTime)
    if ( section.startTime==""  || section.endTime=="" || section.price=="" || isNaN(section.price) ) {
      Swal.fire({
        icon: "error",
        text: "يجب ادخال جميع البيانات",
      });
    }
    else {
      section.show = !section.show
    }
    
    editTimeSection(index , section)
    console.log("***************************", )

  }

  const [allTime , setAllTime] = useState(
    {
      time : {hours : 0 , minutes : 0 } , 
      price : 0
    }
  )
  const [showAllTime , setShowAllTime] = useState(false)

  const calcAllTimeAndPrice = () => {
    console.log(timeSections);
    let hours = 0 , minutes = 0 , price = 0
    let problem = false 

    timeSections.map((section , index) => {
      if (section.startTime !== "" && section.endTime !== "" && section.price !== "" && !isNaN(section.price) ) {
        hours += section.totalTime.hours
        minutes += section.totalTime.minutes
        price += section.totalPrice
      }
      else {
        problem = true
      }     
    })
   
    if (problem) {
      Swal.fire({
        icon: "error",
        text: "برجاء التأكد من جميع البيانات",
      });
      return
    }

    let hoursFromMinutes = Math.floor(minutes / 60)
    let minutesFromMinutes = minutes % 60
    hours += hoursFromMinutes
    minutes = minutesFromMinutes
    setAllTime({
      time : {hours : hours , minutes : minutes } , 
      price : price
    })
    setShowAllTime(true)
  };

  const DeleteTime = (index) => {
    setShowAllTime(false) ; 
    console.log("delete", index);
    setTimeSections((prevSections) =>
      prevSections.filter((prevSection, i) =>
        i !== index
      )
    )
  };


  const DeleteAll = (index) => {
    setShowAllTime(false)
    setTimeSections([{ startTime: "", endTime: "", price: "", totalTime: {hours : 0 , minutes :0}, totalPrice: 0 , show : false }])

  };

  return (
    <>
      <Parent>
        <Title>
        Playstation
        </Title>
        <Container>
          {timeSections.map((section, index) => (
            <TimerParent>
              <DeleteIcon onClick={()=>{DeleteTime(index)}}>×</DeleteIcon>
              <Timer key={index}>
                <TimeSection>
                  <Label htmlFor={`sTime${index}`}>من</Label>
                  <Input
                    type="time"
                    id={`sTime${index}`}
                    value = {section.startTime}
                    onChange={(e) => {
                      setShowAllTime(false) ; 
                      setTimeSections((prevSections) =>
                        prevSections.map((prevSection, i) =>
                          i === index
                            ? { ...prevSection, startTime: e.target.value  , show : false}
                            : prevSection
                        )
                      )
                    }
                    }
                  />
                </TimeSection>
                <TimeSection>
                  <Label htmlFor={`ETime${index}`}>إلي</Label>
                  <Input
                    type="time"
                    id={`ETime${index}`}
                    value = {section.endTime}
                    onChange={(e) =>{
                      setShowAllTime(false) ; 
                      setTimeSections((prevSections) =>
                        prevSections.map((prevSection, i) =>
                          i === index
                            ? { ...prevSection, endTime: e.target.value , show : false }
                            : prevSection
                        )
                      )
                    }
                    }
                  />
                </TimeSection>
                <TimeSection>
                  <Label htmlFor={`price${index}`}>السعر</Label>
                  <Input
                    type="number"
                    id={`price${index}`}
                    value = {section.price}
                    onChange={(e) =>{
                      setShowAllTime(false) ; 
                      setTimeSections((prevSections) =>
                        prevSections.map((prevSection, i) =>
                          i === index
                            ? { ...prevSection, price: parseFloat(e.target.value)  , show : false }
                            : prevSection
                        )
                      )
                    }
                    }
                  />
                </TimeSection>
                  {
                    !section.show ? 
                    <CalcButton className = "normal" onClick={()=>{calcOneTimePrice(section , index)}}>إحسب</CalcButton> : 
                    <CalcButton className = "disappear" onClick= {()=>{
                      setTimeSections((prevSections) =>
                        prevSections.map((prevSection, i) =>
                          i === index
                            ? { ...prevSection, show:!prevSection.show  }
                            : prevSection
                        )
                      )
                    }}>إخفاء</CalcButton>
                  }  
              </Timer>
              {
                section.show &&
                <OneResult>
                  <TimeResult>الوقت : {formatNumberToArabic(section.totalTime.hours) +' ساعه  و '+ formatNumberToArabic (section.totalTime.minutes) + ' دقيقة'}</TimeResult>
                  <PriceResult>السعر : <Price>{formatNumberToArabic(section.totalPrice) + ' جنيه '}</Price>  </PriceResult>
                </OneResult>
              }
            </TimerParent>
          ))}
        </Container>
        <Result>
          <ButtonsContainer>
            <CalcButton onClick={addTimeSection} className = "add">أضف</CalcButton>
            <Flex>
            <CalcButton onClick={DeleteAll} className= "clear"> قائمة جديدة</CalcButton>
            <CalcButton onClick={calcAllTimeAndPrice} className= "all">الإجمالي</CalcButton>
            </Flex>
          </ButtonsContainer>
          {
            showAllTime && 
            <OneResult className='all'>
              <TimeResult>الوقت : {formatNumberToArabic(allTime.time.hours) +' ساعه  و '+ formatNumberToArabic (allTime.time.minutes) + ' دقيقة'}</TimeResult>
              <PriceResult>السعر : <Price>{formatNumberToArabic(allTime.price) + ' جنيه '}</Price> </PriceResult>
            </OneResult>
          }
        </Result>
        <Footer style = {{direction : "ltr"}}>&copy; Bahaa Dagher , 2023 </Footer>
      </Parent>
    </>
  )
}

export default Calculator