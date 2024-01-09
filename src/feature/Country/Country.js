import React, { useEffect, useState } from "react";
import "./Country.css";
import { FiPlusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../state/reducers/country/countrySlice";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
const Country = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);
  const { isLoading, countries } = useSelector((state) => state.countries);
  const [visible, setVisible] = useState(4);
  const loadMore = () => {
    setVisible(visible + 4);
  };

  return (
    <div className="country-section">
      <div className="lg:flex  gap-20 w-3/4 mx-auto  pt-12 md:pt-20">
        <div className="w-full">
          <h1 className="text-xl lg:text-1xl xl:text-3xl text-start m-0 mt-0">
          Ready to explore new languages?
          Pick your choice! 
          </h1>

          {isLoading ? (
            <div className="w-1/4 mx-auto  mt-6">
              <Loader></Loader>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-4 md:w-3/4 ">
              {countries.slice(0, visible).map((country) => (
                <Link
                  to={`/country/${country.countryId}`}
                  key={country.countryId}
                  className="country-card mt-4 w-full  "
                >
                  <img
                    src={country.flag}
                    alt={country.language}
                    className="h-6 w-6 rounded-full "
                  />
                  <h3 className="font-bold">{country.language}</h3>
                </Link>
              ))}
              <button
                onClick={loadMore}
                className={
                  countries?.length > visible
                    ? "bg-white h-12 w-full mt-4 border-gray-300 rounded font-bold flex justify-center items-center gap-2 "
                    : "hidden "
                }
              >
                {" "}
                <FiPlusCircle className="text-xl font-bold" /> MORE
              </button>
            </div>
          )}
        </div>
        <div className="w-full mt-16 mb-44 ml-10 ">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/girl-attending-online-language-class-6432463-5319566.png"
            alt=""
            className="max-h-svh w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Country;
