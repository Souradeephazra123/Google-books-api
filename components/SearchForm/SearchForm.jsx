"use client";
import React, { useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { useGlobalContext } from "../context";
import { useRouter } from "next/navigation";
const SearchForm = () => {
  const { setSearchTerm, setResultTitle } = useGlobalContext();
  const searchText = useRef("");

  const router = useRouter();

  useEffect(() => {
    searchText.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempSearchTerm = searchText.current.value.trim();
    if ((tempSearchTerm.replace(/[^\w\s]/gi,"")).length === 0){
      setSearchTerm("the lost world");
      setResultTitle("Please enter something ...");
    } else {
      setSearchTerm(searchText.current.value);
      router.push("/book");
    }
  };

  return (
    <div className="w-[300px] relative">
      <form className="search-form" onSubmit={handleSubmit}>
        {" "}
        <input
          type="text"
          className=" text-sm rounded-full block w-full px-4 py-4  bg-white  text-black"
          placeholder="Send a message"
          ref={searchText}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          onClick={handleSubmit}
        >
          <CiSearch size={30} color="pink" fontWeight={700} />
        </button>
      </form>
    </div>
    // <div className="search-form w-[300px] ">
    //   <div className="container">
    //     <div className="search-form-content">
    //       <form className="search-form">
    //         <div className="relative  search-form-elem py-1 px-6 rounded-full items-center bg-white flex justify-between">
    //           <input
    //             type="text"
    //             className="form-control text-xl p-3 rounded-full"
    //             placeholder="The Lost World ..."
    //           />
    //           <button
    //             type="submit"
    //             className="absolute inset-y-0 end-0 flex items-center pe-3
    //         "
    //           >
    //             <FaSearch
    //               className="text-purple text-black"
    //               color="purple"
    //               size={32}
    //             />
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SearchForm;
