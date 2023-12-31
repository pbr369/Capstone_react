import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

export default function Star({ stars, reviews }) {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon fill-yellow-400" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon fill-yellow-400" />
        ) : (
          <FaRegStar className="icon fill-yellow-400" />
        )}
      </span>
    );
  }) 
  return (
    <div className="icon-style">
      <div className="flex">{ratingStar}</div>
      <div>
        <p>({reviews} sold)</p>
      </div>
    </div>
  );
}
