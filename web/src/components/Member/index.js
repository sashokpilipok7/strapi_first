import Image from "next/image";

import { getImgUrl } from "@/src/utils";
import { ROLES } from "@/src/constants";
import Button from "@/src/components/Button";

const DEFAULT_AVATAR = "/img/avatar.png";

export function MemberItem({ data = {} }) {
  const { id, attributes } = data;
  const {
    profile_photo,
    years_in_bussiness,
    license,
    categories,
    name,
    address,
    state,
    status,
    phone,
    gallary,
  } = attributes;

  let avatar_img = profile_photo?.data
    ? getImgUrl(profile_photo)
    : DEFAULT_AVATAR;
  return (
    <div className="py-6 lg:py-[50px] w-full border-b-2 border-b-darkGrey">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-[70%] xl:w-[65%]">
          <div className="flex items-start">
            <Image
              className="mr-2 w-16 h-16 lg:mr-6 lg:w-[125px] lg:h-[125px]"
              src={avatar_img}
              width={125}
              height={125}
            />
            <div>
              <h3 className="mb-2 lg:mb-4 text-xl font-bold text-lightBlue">
                {name}
              </h3>
              <div className="flex flex-col gap-4 text-base ">
                <p>In Business {years_in_bussiness} Years</p>
                <p>
                  Located in {address}, {state}
                </p>
                <p>
                  Licensed in: {license.map((item) => `${item?.license},`)}{" "}
                  (All)
                </p>
              </div>
            </div>
          </div>
          <div className="lg:ml-[150px]">
            {status === ROLES.main || status === ROLES.secondary ? (
              <p className="text-base mt-8">
                <span className=" font-bold">Specializing in: </span>
                <span className="text-lightBlue">
                  {categories?.data?.map(
                    ({ attributes }) => `${attributes.name} I`
                  )}
                </span>
              </p>
            ) : null}

            {/* Img Gallary */}
            {status === ROLES.main && (
              <div className="mt-8 flex justify-center gap-1 lg:gap-4 lg:justify-start ">
                <Image
                  src="/img/profile1.jpg"
                  className="w-[24%] lg:w-[20%]"
                  width={250}
                  height={175}
                />
                <Image
                  src="/img/profile1.jpg"
                  className="w-[24%] lg:w-[20%]"
                  width={250}
                  height={175}
                />
                <Image
                  src="/img/profile1.jpg"
                  className="w-[24%] lg:w-[20%]"
                  width={250}
                  height={175}
                />
                <Image
                  src="/img/profile1.jpg"
                  className="w-[24%] lg:w-[20%]"
                  width={250}
                  height={175}
                />
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 mx-auto lg:ml-auto lg:mr-0 lg:mt-0">
          <div className="flex items-center text-base bg-white px-5 py-3 rounded-md border border-blue text-center ">
            <Image
              className="mr-6"
              src="/img/checked.png"
              width={35}
              height={35}
            />
            Master electrician license & insurance{" "}
            <br className=" hidden lg:block" /> verified & on file
          </div>
          <div className="w-full flex gap-3 lg:flex-col lg:gap-6 lg:w-[80%] float-right mt-5">
            <Button
              href={`tel:${phone}`}
              mode={status === ROLES.main ? "blue" : "white"}
            >
              Call
            </Button>
            {status === ROLES.main && (
              <Button href={`/members/${id}`} mode="white">
                {" "}
                View member profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
