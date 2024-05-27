import React from "react";
import "./HomeCard.css";
import homeCardImage from "../../assets/guestList.svg";

const HomeCard = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <div className="cardCover" style={{backgroundColor:`${item.bgColor}` }} key={item.id}>
          <div className="homeCardImage">
            <img src={item.image} alt="homeCardImage" />
          </div>
          <div className="cardHeading">{item.title}</div>
          <div className="cardDesc">{item.description}</div>
        </div>
      ))}
    </>
  );
};

export default HomeCard;
