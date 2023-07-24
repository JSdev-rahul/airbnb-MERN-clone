import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { FaUmbrellaBeach } from "react-icons/fa";
import { FaFortAwesome } from "react-icons/fa";
import {
  GiFarmTractor,
  GiWoodCabin,
  GiTreehouse,
  GiCornerFlag,
  GiWaterPolo,
  GiBeachBall,
  GiPickOfDestiny,
} from "react-icons/gi";
import { TbBeach } from "react-icons/tb";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { AiOutlineCoffee } from "react-icons/ai";
import { SiAntdesign } from "react-icons/si";
import { MdOutlineForest } from "react-icons/md";
import { BsFillHouseDoorFill, BsTropicalStorm } from "react-icons/bs";

const placeTypes = [
  { name: "Beach", icon: <FaUmbrellaBeach /> },
  { name: "Farm", icon: <GiFarmTractor /> },
  { name: "Fort", icon: <FaFortAwesome /> },
  { name: "Beach", icon: <TbBeach /> },
  { name: "cabins", icon: <GiWoodCabin /> },
  { name: "Treehouses", icon: <GiTreehouse /> },
  { name: "top of the world", icon: <GiCornerFlag /> },
  { name: "Amazing pools", icon: <LiaSwimmingPoolSolid /> },
  { name: "Lake front", icon: <GiWaterPolo /> },
  { name: "Rooms", icon: <BsFillHouseDoorFill /> },
  { name: "Beach front", icon: <GiBeachBall /> },
  { name: "tropical", icon: <BsTropicalStorm /> },
  { name: "Tiny house", icon: <GiPickOfDestiny /> },
  { name: "Bed & Break fast", icon: <AiOutlineCoffee /> },
  { name: "Design", icon: <SiAntdesign /> },
  { name: "National parks", icon: <MdOutlineForest /> },
  { name: "Tiny house", icon: <GiPickOfDestiny /> },
  { name: "Bed & Break fast", icon: <AiOutlineCoffee /> },
  { name: "Design", icon: <SiAntdesign /> },
  { name: "National parks", icon: <MdOutlineForest /> },

  // Add more place types and icons as needed
];
export const PlaceTypesList = () => {
  return (
    <div>
      <div>
        <div className="border w-full mt-4 "></div>
      </div>

      <div className="flex overflow-x-auto hover:text-black mx-8 mt-4 gap-8 items-center flex-nowrap cursor-pointer">
        {placeTypes.map((placeType) => (
          <div
            key={placeType.name}
            className="flex hover:text-black flex-col items-center flex-1 mb-4"
          >
            <div
              className="
            text-2xl
              text-gray-500
              rounded-full p-4 hover:text-black flex items-center justify-center hover:bg-gray-200"
            >
              {placeType.icon}
            </div>
            <span className="text-xs hover:text-black text-gray-500 text-center whitespace-nowrap">
              {placeType.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
