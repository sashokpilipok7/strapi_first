import React, { useState, useMemo } from "react";
import Image from "next/image";
import clsx from "clsx";

import { getImgUrl } from "@/src/utils";
import ArrowIcon from "@/src/static/icons/select_arrow.svg";

const MOCK_DATA = [
  {
    id: "1",
    attributes: {
      icon: "/img/logo.svg",
      name: "Residental Repairs & New Installations",
    },
  },
  {
    id: "2",
    attributes: {
      icon: "/img/logo.svg",
      name: "Generators",
    },
  },
];

function SimpleSelect({
  data = MOCK_DATA,
  onChange = () => {},
  mode,
  defaultValue = "",
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const label = useMemo(() => {
    return data.find((item) => item.id === Number(value))?.attributes?.name;
  }, [data, value]);

  function handleOpen() {
    setOpen(!open);
  }

  function onChangeValue(item) {
    setValue(item);
    onChange(item);
  }
  return (
    <div className="relative w-full">
      <div
        onClick={handleOpen}
        className={clsx(
          mode === "white" ? "text-left" : "text-center",
          " leading-[64px] px-5 !outline-none cursor-pointer whitespace-nowrap overflow-hidden"
        )}
      >
        {label || "Select Category"}
        <ArrowIcon className="absolute right-4 top-6" />
      </div>
      <ul
        className={clsx(
          open ? "block" : "hidden",
          "absolute mt-3 left-0 rounded-2xl bg-grey ",
          mode === "white" && "bg-white min-w-[320px] lg:min-w-full"
        )}
      >
        {data.map(({ id, attributes: { icon, name } }) => (
          <li
            key={id}
            onClick={() => onChangeValue(id)}
            className="flex p-6 items-center text-sm cursor-pointer"
          >
            <Image src={getImgUrl(icon)} width={60} height={100} alt="icon" />
            <span className="ml-8">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SimpleSelect;
