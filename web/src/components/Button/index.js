import React from "react";
import clsx from "clsx";
import Link from "next/link";

function Button({ mode = "blue", href = "/", className, children }) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center justify-center",
        className,
        mode == "blue" &&
          " px-4 py-4 lg:py-6 w-full bg-blue rounded-lg text-white text-base lg:text-xl text-center",
        mode == "white" &&
          "px-4 py-4 lg:py-6 w-full bg-white rounded-lg border border-blue text-black text-base text-center lg:text-xl lg:whitespace-nowrap"
      )}
    >
      {children}
    </Link>
  );
}

export default Button;
