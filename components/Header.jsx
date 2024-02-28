"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleNavbar = () => setToggleMenu(!toggleMenu);
  return (
    <div className="nav py-[1.8rem] w-[100%]">
      <div className="container navbar-content flex w-[100%]">
        <div className="brand-and-toggler w-[100%] flex justify-between lg:pl-[100px] md:pl-[40px] sm:pl-[20px] ">
          <Link href="/" className="navbar-brand   flex items-center">
            <Image src="/book.png" width={60} alt="book" height={60} />
            <span className=" ml-[2rem] uppercase font-semibold lg:text-3xl md:text-2xl sm:text-xl tracking-wider">
              bookhub
            </span>
          </Link>
          <button
            type="button"
            className="navbar-toggler-btn z-[11] transition ease-in-out delay-150"
            onClick={handleNavbar}
          >
            <HiOutlineMenuAlt3
              size={35}
              style={{
                color: `${toggleMenu ? "#fff" : "#010101"}`,
              }}
            />
          </button>
        </div>

        <div
          className={
            toggleMenu
              ? "navbar-collapse fixed  right-0 top-0  z-[10] bg-gray-800 h-[100%] w-[280px] flex py-10 px-3 transition ease-in-out delay-150 show-navbar-collapse translate-x-0"
              : "navbar-collapse fixed right-0 top-0  z-[10] bg-gray-800 h-[100%] w-[280px] flex py-10 px-3 translate-x-full transition ease-in-out delay-150 "
          }
        >
          <ul className="navbar-nav lg:pr-10 sm:pr-5 md:pr-5">
            <li className="nav-item mb-[1.4rem">
              <Link
                href="/book"
                className="transition ease-in-out delay-150 nav-link hover:text-pink-700 text-uppercase text-white fs-22 fw-6 ls-1"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/about"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                about
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/favourite"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                Favourite
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
