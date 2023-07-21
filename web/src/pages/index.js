import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { ApiClient } from "../utils/api";
import { LINKS } from "@/src/constants/";
import SearchIcon from "@/src/static/icons/search.svg";
import SimpleSelect from "@/src/components/Select";

// const categories = [
//   {
//     id: 1,
//     attributes: {
//       name: "Residental Repairs & New Installations",
//       createdAt: "2023-07-05T11:38:49.984Z",
//       updatedAt: "2023-07-07T11:30:17.525Z",
//       publishedAt: "2023-07-05T11:46:07.786Z",
//     },
//   },
//   {
//     id: 2,
//     attributes: {
//       name: "Electric Vechicle Chargers",
//       createdAt: "2023-07-05T11:39:09.662Z",
//       updatedAt: "2023-07-07T11:30:26.732Z",
//       publishedAt: "2023-07-05T11:46:04.100Z",
//     },
//   },
// ];

// const pageData = {
//   attributes: {
//     main_text:
//       "Find a local electrician you can trust, because we trust them. If\n              we didn’t they wouldn’t be members of the National Electrical\n              Registry",
//     createdAt: "2023-07-07T08:04:43.211Z",
//     updatedAt: "2023-07-18T07:31:45.304Z",
//     publishedAt: "2023-07-07T08:06:49.109Z",
//     secondary_text:
//       " All members hold current master electrician licenses and\n              insurance.",
//     logo: "NATIONAL ELECTRICAL REGISTRY",
//     description:
//       "Find an electrician based on speciality, current licenses,\n            insurance, and location",
//     mobile_text:
//       " Real Master Electricians\n \n \n Real Electricians Contractors Nothing else",
//     mobile_description:
//       "Tired of the countless useless “review” sites in existence, The\nnational Electrical registry was created by electricians for customers\nlooking for nothing but the best in professionslism.\n          \n          \nWe hope to heal the industry by the providing access to the genuine\nelectrical contracting companies out there amidst those pretending to be.",
//   },
// };

export default function HomePage({ categories, pageData }) {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [zipcode, setZipCode] = useState("");

  function handleChange(e) {
    setZipCode(e?.target?.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    router.push({
      pathname: "/members",
      query: { category, zipcode },
    });
  }

  const {
    logo,
    main_text,
    secondary_text,
    description,
    mobile_text,
    mobile_description,
  } = pageData?.attributes;

  return (
    <main className="min-h-screen bg-darkGrey2">
      {/* Main info for desctop */}
      <div className=" hidden lg:block  bg-darkBlue pb-9">
        {/* Header for main */}
        <div className=" bg-darkBlue py-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl text-grey ">{logo}</h2>
              <nav className="text-base text-grey2">
                <ul className="p-0 m-0 flex items-center">
                  {LINKS.map(({ label, path }, idx) => (
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
        {/* Text Info */}
        <div className="container mx-auto">
          <div className="flex items-center pt-[160px] pb-[90px]">
            <Image
              className="mr-[6%]"
              src="/img/logo.svg"
              width={300}
              height={300}
              alt="Logo"
            />
            <h3 className="text-2xl text-grey">
              {main_text} <br />
              <br />
              {secondary_text}
            </h3>
          </div>
          <p className="text-[36px] text-center text-grey">{description}</p>
        </div>
      </div>
      {/* Main info for mobile */}
      <div className="bg-darkBlue py-[60px] px-4 lg:hidden">
        <h2 className=" text-sm text-white text-center font-bold">{logo}</h2>
        <Image
          className="mx-auto mt-10"
          src="/img/logo.svg"
          width={300}
          height={300}
          alt="Logo"
        />
      </div>
      {/* Filters */}
      <div className="min-h-full bg-darkBlue lg:bg-darkGrey2 py-4">
        <div className="container mx-auto px-4 lg:p-0">
          <form
            onSubmit={handleSubmit}
            className=" w-full lg:w-[70%] flex flex-col gap-5 lg:flex-row lg:gap-0 relative mx-auto lg:bg-grey rounded-md p-2 text-center text-2xl"
          >
            <div className=" w-full rounded-xl lg:rounded-none lg:w-[50%] bg-grey border-r-2 border-darkGrey2 ">
              <SimpleSelect data={categories} onChange={setCategory} />
            </div>

            <input
              name="zipcode"
              onChange={handleChange}
              className=" w-full lg:w-[50%] rounded-xl  bg-grey h-11 h-[64px] text-center px-5 !outline-none placeholder:text-black"
              placeholder="Zip code"
              type="number"
            />
            <button
              type="submit"
              className=" w-full  h-[64px]  lg:absolute right-2 top-2 bg-blue2 lg:w-[64px] flex items-center justify-center rounded-lg cursor-pointer"
            >
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>
      {/* Text info mobile */}
      <div className="px-4 py-12 bg-darkBlue text-center lg:hidden ">
        <div className=" text-darkGrey2 text-xl whitespace-pre-line">
          <ReactMarkdown children={mobile_text} />
        </div>

        <div className="my-10 text-xl bg-darkGrey text-purple rounded-lg py-6 px-3 whitespace-pre-line">
          <ReactMarkdown children={mobile_description} />
        </div>

        <ul className=" w-full border border-lightGrey">
          {LINKS.map(({ label, path }, idx) => (
            <li
              key={label}
              className=" text-2xl py-5 border border-b-lightGrey text-lightGrey2"
            >
              <Link href={path}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const api = new ApiClient();
  const { data: categories } = await api.get("categories?populate=*");
  const { data: pageData } = await api.get("main-page?populate=*");
  return {
    props: { categories, pageData },
  };
}
