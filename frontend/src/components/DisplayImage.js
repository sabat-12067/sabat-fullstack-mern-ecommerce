import React from "react";
import { FaWindowClose } from "react-icons/fa";

const DisplayImage = ({ imageUrl, onClose }) => {
  console.log(imageUrl);
  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-2">
        <div className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer">
          <FaWindowClose onClick={onClose}/>
        </div>
        <div className="flex justify-center items-center p-5 max-h-[80vh] max-w-[80vh]">
          <img src={imageUrl} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
