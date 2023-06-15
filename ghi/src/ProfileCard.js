import "./input.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function ProfileCard({ user, refreshUserInfo }) {
  const [users, setUsers] = useState([]);
  const { token } = useAuthContext();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [checkedbox, setCheckedbox] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
          method: "get",
        }
      );
      console.log("response", response);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error(response);
        const errorData = await response.json();
        console.error(errorData);
      }
    };

    const timer = setTimeout(() => {
      if (token) {
        fetchData();
        console.log("card timer");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [token, user]);

  const matchButton = async (username) => {
    const response = await fetch(
      `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${user?.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          matches: `${user.matches}, ${username}`,
        }),
      }
    );
    if (response.ok) {
      refreshUserInfo();
      console.log("success match");
      navigate("/users/matches"); // add this line to navigate to the matches page
    } else {
      console.error("error response:", response);
      const errorData = await response.json();
      console.error("errorData:", errorData);
    }
  };

  const blockButton = async (username) => {
    const response = await fetch(
      `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${user?.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          blocked: `${user.blocked}, ${username}`,
        }),
      }
    );
    if (response.ok) {
      refreshUserInfo();
      console.log("success block");
    } else {
      console.error("error response:", response);
      const errorData = await response.json();
      console.error("errorData:", errorData);
    }
  };
  const handleCheckbox = (event) => {
    const checkValue = event.target.value;
    if (event.target.checked) {
      setCheckedbox((prevTags) => [...prevTags, checkValue]);
    } else {
      setCheckedbox((prevTags) =>
      prevTags.filter((tag) => tag !== checkValue))
    }
  }
  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };
  const filterBio = users.filter((u) => {
    const gender = u.gender || "";
    const aboutMe = u.about_me || "";
    const lookingFor = u.looking_for || "";
    const interests = u.interests || "";
    if (
      user?.matches.includes(u.username) ||
      user?.blocked.includes(u.username)
    ) {
      return false;
    }
    const tagMatch = checkedbox.length=== 0 ||
    checkedbox.every((tag) =>
    [gender, aboutMe, lookingFor, interests].some((text) =>
    text.toLowerCase().includes(tag)))
    return (
      (gender.toLowerCase().includes(search) ||
      aboutMe.toLowerCase().includes(search) ||
        lookingFor.toLowerCase().includes(search) ||
        interests.toLowerCase().includes(search)) &&
      user?.username !== u.username &&
      tagMatch
    );
  });

  return (
    <>
          <h1 className="text-center text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
            List of Potential Matches
          </h1>
          <div className="container px-10 py-5 mx-auto">
          <h2>
            <form className="searchBar">
              <input
                type="text"
                className="searchBarinput bg-orange-200 border border-gray-500"
                placeholder="search preferences here"
                value={search}
                onChange={handleSearch}
              />
            </form>
          </h2></div>
          <div className="flex">
            <div className="w-1/4 px-4">
          <div className="container py-5 mx-auto bg-blue-200 border border-gray-500 overflow-hidden">
          <h1 className=" text-center mb-4 font-bold text-gray-900 dark:text-white">Check tags</h1>
          <h2 className="text-center mb-2 bg-purple-100 text-gray-900 dark:text-white">Gender</h2>
<ul className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white inline-flex flex-wrap">
    <li className="rounded-t-sm dark:border-gray-600 inline-flex flex-wrap sm:block">
        <div className="flex items-center pl-3">
            <input id="male"
            type="checkbox"
            value="male"
            className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600
            dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            onChange={handleCheckbox}/>
            <label
            htmlFor="male"
            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              <div className="bg-orange-200 px-2 py-1 rounded-lg">male</div></label>
        </div>
    </li>
    <li className="rounded-t-sm dark:border-gray-600 inline-flex flex-wrap sm:block">
        <div className="flex items-center pl-3">
            <input id="female"
            type="checkbox"
            value="female"
            className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600
            dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            onChange={handleCheckbox}/>
            <label htmlFor="female"
            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              <div className="bg-orange-200 px-2 py-1 rounded-lg">female</div></label>
        </div>
    </li>
    <li className="rounded-t-sm dark:border-gray-600 inline-flex flex-wrap sm:block">
        <div className="flex items-center pl-3">
            <input id="Non-binary"
            type="checkbox"
            value="non-binary"
            className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600
            dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            onChange={handleCheckbox}/>
            <label htmlFor="Non-binary"
            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              <div className="bg-orange-200 px-2 py-1 rounded-lg">Non-binary</div></label>
        </div>
    </li>
    <li className="rounded-t-sm dark:border-gray-600 inline-flex flex-wrap sm:block">
        <div className="flex items-center pl-3">
            <input id="vue-checkbox-Gender-nonconforming"
            type="checkbox"
            value="gender nonconforming"
            className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600
            dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            onChange={handleCheckbox}/>
            <label htmlFor="vue-checkbox-Gender-nonconforming"
            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              <div className="bg-orange-200 px-2 py-1 rounded-lg">Gender nonconforming</div></label>
        </div>
    </li>
</ul>
<h2 className="text-center mb-2 bg-purple-100 text-gray-900 dark:text-white">Interests</h2>
<ul className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white inline-flex flex-wrap">
    <li className="rounded-t-sm dark:border-gray-600 inline-flex flex-wrap sm:block">
        <div className="flex items-center pl-3">
            <input id="vue-checkbox-sports"
            type="checkbox"
            value="sports"
            className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600
            dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            onChange={handleCheckbox}/>
            <label htmlFor="vue-checkbox-sports"
            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              <div className="bg-orange-200 px-2 py-1 rounded-lg">sports</div></label>
        </div>
    </li>
    <li className="rounded-t-sm dark:border-gray-600 inline-flex flex-wrap sm:block">
        <div className="flex items-center pl-3">
            <input id="vue-checkbox-gaming"
            type="checkbox"
            value="gaming"
            className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600
            dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            onChange={handleCheckbox}/>
            <label htmlFor="vue-checkbox-gaming"
            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              <div className="bg-orange-200 px-2 py-1 rounded-lg">gaming</div></label>
        </div>
    </li>
    <li className="rounded-t-sm dark:border-gray-600 inline-flex flex-wrap sm:block">
        <div className="flex items-center pl-3">
            <input id="vue-checkbox-traveling"
            type="checkbox"
            value="traveling"
            className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600
            dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            onChange={handleCheckbox}/>
            <label htmlFor="vue-checkbox-traveling"
            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              <div className="bg-orange-200 px-2 py-1 rounded-lg">traveling</div></label>
        </div>
    </li>
    <li className="rounded-t-sm dark:border-gray-600 inline-flex flex-wrap sm:block">
        <div className="flex items-center pl-3">
            <input id="vue-checkbox-art"
            type="checkbox"
            value="art"
            className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600
            dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            onChange={handleCheckbox}/>
            <label htmlFor="vue-checkbox-art"
            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              <div className="bg-orange-200 px-2 py-1 rounded-lg">art</div></label>
        </div>
    </li>
</ul></div></div><div className="w-3/4">
<div className="container px-2 py-1 mx-auto">
          <div className="grid grid-cols-2 gap-1 mt-1 md:mt-1 md:grid-cols-3">
            {filterBio?.map((u) => {
              return (
                <div
                  className="lg-gray-500"
                  key={u?.username}
                  value={u?.username}
                >
                  <div className="w-full max-w-xs mx-auto my-10 bg-orange-200 rounded-sm shadow-md p-5">
                    {u.profile_picture_url !== "" &&
                    u.profile_picture_url !== "string" ? (
                      <img
                        className="w-32 h-32 h-32 rounded-full mx-auto"
                        src={u.profile_picture_url}
                        alt=""
                      />
                    ) : (
                      <img
                        className="w-36 h-36 h-36 rounded-full mx-auto"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO6WTRclumNWfdBvP2VabpY9vACdKKpBoapA&usqp=CAU"
                        alt=""
                      />
                    )}
                    <h1 className="text-center text-2xl font-bold mt-3">
                      {u?.username}
                    </h1>
                    <h2 className="text-center text-2xl font-semibold mt-3">
                      {u.first_name} {u.last_name}
                    </h2>
                    <p className="text-center text-gray-600 mt-1">
                      {u.location}
                    </p>
                    <div className="flex justify-center mt-5">
                      <button
                        className="text-blue-500 hover:text-blue-700 mx-3"
                        onClick={() => blockButton(u?.username)}
                      >
                        <span className="bg-purple-100 rounded-sm shadow-md inline-block">Decline</span>
                      </button>
                      <button
                        className="text-blue-500 hover:text-blue-700 mx-3"
                        onClick={() => matchButton(u?.username)}
                      >
                        <span className="bg-purple-100 rounded-sm shadow-md inline-block">Match</span>
                      </button>
                    </div>
                    <div className="mt-5">
                      <h3 className="text-xl font-semibold">Bio</h3>
                      <p className="text-gray-600 mt-2">
                        <span className="bg-white rounded-sm shadow-md inline-block">{u.about_me}</span></p>
                    </div>
                    <div className="flex items-right">
                      <button
                        className="ml-auto text-base font-medium text-blue-500 hover:text-blue-700 mx-3"
                        onClick={() =>
                          navigate(`/users/${u?.username}/view_profile`)
                        }
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div></div>
    </>
  );
}
export default ProfileCard;
