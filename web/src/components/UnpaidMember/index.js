import Image from "next/image";

import { getImgUrl } from "@/src/utils";
import Button from "@/src/components/Button";

export function UnpaidMemberItem({ data = {} }) {
  const { attributes } = data;
  const { name, address, state, phone, profile_photo } = attributes;

  let avatar_img = profile_photo?.data
    ? getImgUrl(profile_photo)
    : DEFAULT_AVATAR;
  return (
    <div className="py-6 lg:py-[50px] lg:pb-[70px] w-full border-b-2 border-b-darkGrey">
      <div className="flex flex-col lg:flex-row">
        <div>
          <div className="flex items-start">
            <Image
              className="mr-2 w-16 h-16 lg:mr-6 lg:w-fit lg:h-fit"
              src={avatar_img}
              width={125}
              height={125}
            />
            <div>
              <h3 className="mb-2 lg:mb-4 text-xl font-bold text-lightBlue">
                {name}
              </h3>
              <div className="flex flex-col gap-4 text-base ">
                <p>
                  Located in {address}, {state}
                </p>
                <p>(No current License or insurance on file)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:ml-auto mt-5 lg:mt-0">
          <Button href={`tel:${phone}`} className="min-w-[320px]" mode="white">
            Call
          </Button>
        </div>
      </div>
    </div>
  );
}
