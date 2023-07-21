import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { getImgUrl, getImgPath, getCityFromZip } from "@/src/utils";
import { ApiClient } from "@/src/utils/api";
import SearchIcon from "@/src/static/icons/search.svg";
import LocationIcon from "@/src/static/icons/location.svg";
import SimpleSelect from "@/src/components/Select";
import { ROLES, STATUS_ORDER } from "@/src/constants";
import Button from "@/src/components/Button";
import Header from "@/src/components/Header";

const DEFAULT_AVATAR = "/img/avatar.png";
function MemberItem({ data = {} }) {
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
              alt="avatar"
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
              <div className="mt-8 flex justify-center gap-1 lg:gap-4 lg:justify-start overflow-hidden ">
                {gallary?.data?.map((item) => (
                  <Image
                    key={item.id}
                    src={getImgPath(item)}
                    className="w-[24%] lg:w-[20%]"
                    width={250}
                    height={175}
                    alt="photo"
                  />
                ))}
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
              alt="check"
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

function UnpaidMemberItem({ data = {} }) {
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
              alt="avatar"
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

function MembersPage({ members, categories }) {
  const router = useRouter();
  const { category: catFromQuery, zipcode: zipFromQuery } = router.query;
  // const [list, setList] = useState(members);
  const [category, setCategory] = useState(catFromQuery);
  const [zipcode, setZipCode] = useState(zipFromQuery);

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

  return (
    <main className="min-h-screen bg-hoary">
      <Header />
      <div className="container mx-auto px-4">
        {/* Filters */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 mt-7 w-full lg:w-[55%]"
        >
          <div className="w-[50%] rounded-xl bg-white">
            <SimpleSelect
              data={categories}
              defaultValue={catFromQuery}
              onChange={setCategory}
              mode="white"
            />
          </div>
          <div className=" relative w-[50%] lg:w-[40%] rounded-xl bg-white">
            <LocationIcon className="absolute left-4 top-4" />
            <input
              className="h-full w-full text-center rounded-xl  outline-none"
              type="number"
              onChange={handleChange}
              value={zipcode}
            />
            <button
              type="submit"
              className="h-[64px] w-[64px] absolute right-0 top-0 bg-blue  flex items-center justify-center rounded-lg cursor-pointer"
            >
              <SearchIcon />
            </button>
          </div>
        </form>
        {/* Members row */}
        <div className="flex flex-col mt-4 lg:mt-0 pb-[80px] lg:pb-[120px]">
          {members.map((item) =>
            item?.attributes?.status !== ROLES.unpaid ? (
              <MemberItem key={item?.id} data={item} />
            ) : (
              <UnpaidMemberItem key={item?.id} data={item} />
            )
          )}
          {/* <MemberItem data={{ status: ROLES.main }} />
          <MemberItem data={{ status: ROLES.secondary }} />
          <MemberItem data={{ status: ROLES.ternary }} />
          <UnpaidMemberItem /> */}
        </div>
      </div>
    </main>
  );
}

export default MembersPage;

export async function getServerSideProps(context) {
  const api = new ApiClient();
  console.log("render on server");
  let { category, zipcode } = context.query;
  zipcode = getCityFromZip(zipcode);

  let { data: members } = await api.get(
    `members?filters[zipcode][$startsWithi]=${zipcode}&populate=*`
  );
  members = members.sort((a, b) => {
    const indexA = STATUS_ORDER.indexOf(a.attributes.status);
    const indexB = STATUS_ORDER.indexOf(b.attributes.status);

    if (indexA < indexB) {
      return -1;
    }

    if (indexA > indexB) {
      return 1;
    }

    const categoryIdA =
      a?.attributes?.categories?.data.length > 0
        ? a?.attributes?.categories?.data.find((item) => item?.id == category)
        : null;
    const categoryIdB =
      b?.attributes?.categories?.data?.length > 0
        ? b?.attributes?.categories?.data?.find((item) => item?.id == category)
        : null;

    if (categoryIdA && !categoryIdB) {
      return -1;
    }

    if (!categoryIdA && categoryIdB) {
      return 1;
    }

    const nameA = a.attributes.name.toUpperCase();
    const nameB = b.attributes.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
  const { data: categories } = await api.get("categories?populate=*");
  return {
    props: { members, categories },
  };
}
