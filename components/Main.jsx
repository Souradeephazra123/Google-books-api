// import React from "react";
// import { CiSearch } from "react-icons/ci";
// const Main = () => {
//   return (
//     <div className="content h-[70vh] w-full flex flex-col gap-5 justify-center items-center">
//       <div className="content1">
//         <div className="row2 flex flex-col gap-5 justify-center items-center w-[40vw] z-20">
//           <div className="text-white text-3xl font-bold">Find your book</div>
//           <div className="text-white">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
//             dolore error rem totam commodi aliquam non modi facilis, excepturi,
//             dicta atque officia alias aspernatur id ad labore nemo eos corporis
//           </div>
//           <div className="w-[300px] relative">
//             <input
//               type="text"
//               className=" text-sm rounded-full block w-full px-4 py-4  bg-white  text-black"
//               placeholder="Send a message"
//             />
//             <button
//               type="submit"
//               className="absolute inset-y-0 end-0 flex items-center pe-3"
//             >
//               <CiSearch size={30} color="pink" fontWeight={700} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;

import React from "react";
import SearchForm from "./SearchForm/SearchForm";
const Main = () => {
  return (
    <div className="holder">
      <div className="header-content min-h-[75vh] flex flex-col items-center text-center text-white">
        <h2 className="header-title text-[4.2rem]  capitalize">
          find your book of choice.
        </h2>
        <br />
        <p className="header-text opacity-80 max-w-[770px] fs-18 fw-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam beatae
          sapiente quibusdam consequatur perspiciatis facere laboriosam non
          nesciunt at id repudiandae, modi iste? Eligendi, rerum!
        </p>
        <SearchForm />
      </div>
    </div>
  );
};

export default Main;
