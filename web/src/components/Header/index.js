import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

import { LINKS } from "@/src/constants";
import BurgerOpen from "@/src/static/icons/burger_open.svg";
import BurgerClose from "@/src/static/icons/burger_close.svg";

function MobileMenu() {
  return (
    <nav className="w-full absolute mt-8 left-0 bg-purple py-10">
      <ul className="p-0 m-0 flex flex-col items-center">
        {LINKS.map(({ label, path }) => (
          <li
            key={label}
            className="text-white hover:text-darkBlue text-xl md:text-2xl py-5 px-2"
          >
            <Link href={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  const burger = open ? (
    <BurgerOpen onClick={handleOpen} />
  ) : (
    <BurgerClose onClick={handleOpen} />
  );
  return (
    <div className="sticky z-10 top-0 bg-darkBlue py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <Image
                className="w-[45px] h-[45px] lg:w-[74px] lg:h-[74px]"
                src="/img/logo.svg"
                width={74}
                height={74}
                alt="Logo"
              />
            </Link>

            <h2 className=" text-[14px] whitespace-nowrap ml-2 text-grey lg:ml-[40px] lg:text-[30px] 2xl:text-[50px] 2xl:ml-[80px]">
              NATIONAL ELECTRICAL REGISTRY
            </h2>
          </div>
          <div className="lg:hidden">
            {burger}
            {open && <MobileMenu />}
          </div>
          <nav className=" hidden lg:block text-base text-grey2">
            <ul className="p-0 m-0 flex items-center">
              {LINKS.map(({ label, path }) => (
                <li
                  key={label}
                  className="border-r-2 border-grey2 hover:text-white last:border-none px-2"
                >
                  <Link href={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
