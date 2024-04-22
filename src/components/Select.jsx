import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";

const Select = ({
  data,
  mediaType,
  showSelectGenre,
  setShowSelectGenre,
  setdata,
}) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="bg-blackLighter relative cursor-pointer flex justify-between items-center rounded-3xl py-1 px-2 gap-1 min-w-[300px] max-sm:min-w-full max-w-[450px]">
      {data.length > 0 ? (
        <div className="flex gap-2 flex-wrap ">
          {data.map(({ name, id }) => (
            <button
              key={id}
              className="bg-black p-2 text-xs flex items-center gap-2 text-white rounded-3xl"
            >
              {name}
              <IoIosClose
                className="text-xl"
                onClick={() => setdata(data.filter((item) => item.id !== id))}
              />
            </button>
          ))}
        </div>
      ) : (
        <h3 className="text-white">Select Genre</h3>
      )}
      <div className="flex items-center gap-1">
        {data.length > 0 && (
          <button
            onClick={() => setdata([])}
            className="ps-1 text-2xl text-white"
          >
            <IoIosClose />
          </button>
        )}
        <div className="border-l-2 border-white flex items-center">
          <button
            onClick={() => setShowSelectGenre((prev) => !prev)}
            className="ps-1 text-lg text-white"
          >
            <IoIosArrowDown />
          </button>
        </div>
      </div>
      {showSelectGenre && (
        <div className="absolute top-[110%] left-0 w-full  z-30 bg-white rounded-lg">
          <ul className="p-2">
            {genres[mediaType].map(({ name, id }) => (
              <li
                key={id}
                className={`text-black p-1 hover:bg-black rounded hover:bg-opacity-[0.1]`}
                onClick={() => {
                  if (!data.find((item) => item.id === id)) {
                    setdata((prev) => [
                      ...prev,
                      {
                        name,
                        id,
                      },
                    ]);
                  }

                  setShowSelectGenre(false);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
