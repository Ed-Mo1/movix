import { Link } from "react-router-dom";
import logo from "../assets/movix-logo.svg";
import { IoIosSearch } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showHeader, setShowHeader] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200 && !showMenu) {
        if (window.scrollY > lastScrollY) {
          setShowHeader("hide");
        } else {
          setShowHeader("show");
        }
        setLastScrollY(window.scrollY);
      } else {
        setShowHeader("top");
      }
    });
  }, [lastScrollY]);

  const handleSearch = (event) => {
    if (event.key === "Enter" && query.length) {
      navigate(`/movix/search/${query}`);
      setShowSearch(false);
    }
  };

  return (
    <div
      className={`fixed z-40 top-0 py-2 left-0 right-0 ${
        showMenu ? "bg-black" : "bg-[#00000040]"
      }  backdrop-blur-sm transition ${
        showHeader === "top"
          ? "translate-y-0"
          : showHeader === "show"
          ? "bg-black3 translate-y-0"
          : "translate-y-[-100%]"
      }`}
    >
      <div className="relative">
        <div className="container flex justify-between items-center">
          <img
            src={logo}
            alt="logo"
            className="h-[50px] cursor-pointer"
            onClick={() => navigate("/movix/")}
          />
          <div className="flex items-center gap-5">
            <Link
              to={`/movix/explore/movie`}
              className="hover:text-pink sm:block max-sm:hidden transition-colors"
            >
              Movies
            </Link>
            <Link
              to={`/movix/explore/tv`}
              className="hover:text-pink sm:block max-sm:hidden transition-colors"
            >
              TV shows
            </Link>
            <button
              onClick={() => {
                setShowSearch(!showSearch);
                setShowMenu(false);
              }}
              className="hover:text-pink transition-colors text-xl"
            >
              <IoIosSearch />
            </button>

            <button
              onClick={() => {
                setShowMenu(!showMenu);
                setShowSearch(false);
              }}
              className="hover:text-pink transition-colors text-xl sm:hidden"
            >
              {showMenu ? <MdClose /> : <FiMenu />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, top: "-100%" }}
              animate={{ opacity: 1, top: "110%" }}
              exit={{ opacity: 0, top: "-100%" }}
              className="absolute top-[110%] flex flex-col gap-4 left-0 py-5 px-4 bg-black w-full"
            >
              <Link
                to={`/movix/explore/movie`}
                onClick={() => setShowMenu(false)}
                className="hover:text-pink transition-colors"
              >
                Movies
              </Link>
              <Link
                to={`/movix/explore/tv`}
                onClick={() => setShowMenu(false)}
                className="hover:text-pink transition-colors"
              >
                TV shows
              </Link>
            </motion.div>
          )}
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, top: "-100%" }}
              animate={{ opacity: 1, top: "110%" }}
              exit={{ opacity: 0, top: "-100%" }}
              className="absolute text-black top-[110%] flex items-center max-sm:px-5 px-10 left-0 bg-white w-full"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={handleSearch}
                placeholder="Search for a movie or tv show...."
                className="bg-transparent py-5 text-black flex-grow"
              />
              <button
                onClick={() => setQuery('')}
                className="text-2xl "
              >
                <MdClose />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Header;
