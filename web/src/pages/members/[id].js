import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactMarkdown from "react-markdown";

import SimpleModal from "@/src/components/Modal";
import { transformImageUri, getImgPath, getImgUrl } from "@/src/utils";
import Button from "@/src/components/Button";
import { ApiClient } from "@/src/utils/api";

import Header from "@/src/components/Header";

function MemberPage({ member }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(null);

  function handleClose() {
    setIsOpen(false);
  }

  function handleOpen(img) {
    setIsOpen(true);
    setActiveImg(img);
  }

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          slidesToShow: 2,
        },
      },
    ],
  };

  const {
    name,
    phone,
    email,
    website,
    top_info,
    main_info,
    footer_info,
    gallary,
  } = member?.attributes;
  const websiteName = website?.slice(7);
  return (
    <main className="min-h-screen bg-hoary">
      <Header />
      <div className="container px-4 mx-auto pt-10 pb-[80px] text-center">
        <h2 className="mb-4 text-lightBlue uppercase  font-bold text-base lg:text-2xl  xl:text-4xl">
          {name}
        </h2>
        {/* Top and Main info */}
        <div className="flex flex-col items-center gap-8 lg:gap-[80px] text-sm lg:text-2xl whitespace-pre-line">
          <Image
            src={getImgUrl(top_info?.image)}
            className=" w-fit h-fit mx-auto"
            width={800}
            height={600}
            alt="Main img"
          />
          <div>
            <ReactMarkdown
              transformImageUri={transformImageUri}
              children={top_info?.description}
            />
          </div>
          <div className="w-full lg:w-[768px] mx-auto">
            <Button href={`tel:${phone}`} className="!text-3xl lg:!text-4xl">
              Call
            </Button>
          </div>
          <ReactMarkdown
            transformImageUri={transformImageUri}
            children={main_info}
          />
        </div>

        {/* Footer info */}
        <div className=" mt-8 lg:mt-12 flex flex-col gap-6 lg:gap-8 text-sm lg:text-2xl">
          <ReactMarkdown
            transformImageUri={transformImageUri}
            children={footer_info}
          />
        </div>
        {/* Links */}
        <ul className="mt-4 lg:mt-16 text-sm lg:text-2xl flex flex-col gap-5 lg:gap-10">
          <li>
            Phone number: <a href={`tel:${phone}`}>{phone}</a>
          </li>
          <li>
            Email: <a href={`mailto:${email}`}>{email}</a>
          </li>
          <li>
            Website: <a href={website}>{websiteName}</a>
          </li>
        </ul>
        {/* Slider */}
        <Slider className="mt-10 lg:mt-[100px]" {...settings}>
          {gallary?.data?.map((item) => (
            <div key={item.id} className="px-1 lg:px-10">
              <Image
                onClick={() => handleOpen(getImgPath(item))}
                src={getImgPath(item)}
                className=" cursor-pointer w-full h-fit mx-auto"
                width={500}
                height={370}
                alt="gallary item"
              />
            </div>
          ))}
        </Slider>
      </div>
      <SimpleModal isOpen={isOpen} closeModal={handleClose}>
        <Image
          src={activeImg}
          className=" max-w-full w-full h-fit mx-auto"
          width={1000}
          height={370}
          alt="gallary item"
        />
      </SimpleModal>
    </main>
  );
}

export default MemberPage;

// export async function getStaticPaths() {
//   const api = new ApiClient();

//   const { data: members } = await api.get(`members?populate=*`);

//   const paths = members.map((item) => ({
//     params: { id: String(item.id) },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const { id } = params;
//   const api = new ApiClient();
//   const { data: member } = await api.get(`members/${id}?populate=deep,3`);
//   return {
//     props: { member },
//   };
// }

export async function getServerSideProps(context) {
  const { id } = context.query;
  const api = new ApiClient();

  const { data: member } = await api.get(`members/${id}?populate=deep,3`);
  return {
    props: { member },
  };
}
