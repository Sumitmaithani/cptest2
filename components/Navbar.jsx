"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-black px-8 py-5">
      <Link className="text-white font-bold" href={"/"}>
        Competency Passbook
      </Link>
      <div>
        <Link className="bg-white p-2 mr-2" href={"/courses"}>
          Courses
        </Link>
        <Link className="bg-white p-2 ml-2" href={"/addTopic"}>
          Add Education
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
