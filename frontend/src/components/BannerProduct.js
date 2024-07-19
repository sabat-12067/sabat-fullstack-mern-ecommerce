import React, { useState, useEffect, useCallback } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import img1 from "../assest/banner/img1.webp";
import img2 from "../assest/banner/img2.webp";
import img3 from "../assest/banner/img3.jpg";
import img4 from "../assest/banner/img4.jpg";
import img5 from "../assest/banner/img5.webp";
import img1Mobile from "../assest/banner/img1_mobile.jpg";
import img2Mobile from "../assest/banner/img2_mobile.webp";
import img3Mobile from "../assest/banner/img3_mobile.jpg";
import img4Mobile from "../assest/banner/img4_mobile.jpg";
import img5Mobile from "../assest/banner/img5_mobile.png";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const desktopImages = [img1, img2, img3, img4, img5];
  const mobileImages = [
    img1Mobile,
    img2Mobile,
    img3Mobile,
    img4Mobile,
    img5Mobile,
  ];
  const images = isMobile ? mobileImages : desktopImages;

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  },[images.length]);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  },[images.length]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);
  ;

  return (
    <div className="container mx-auto px-10 rounded">
      <div className="h-72 w-full bg-slate-200 relative overflow-hidden">
        <div className="absolute z-10 p-4 w-full h-full flex items-center justify-between ">
          <button
            className="bg-slate-200 rounded-full shadow-md p-1 hover:scale-150"
            onClick={prevImage}
          >
            <FaAngleLeft />
          </button>
          <button
            className="bg-slate-200 rounded-full shadow-md p-1 hover:scale-150 transition-all"
            onClick={nextImage}
          >
            <FaAngleRight />
          </button>
        </div>

        <div className="flex h-full w-full transition-transform  ease-in-out duration-500">
          {images.map((img, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full translate"
                key={img}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={img}
                  alt={`Banner ${index}`}
                  className="w-full h-full object-fill"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
