import "./input.css";
import React, { useEffect, useState } from 'react';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";

function ProfileCard(props) {
    const [users, setUsers] = useState([]);
    const { token } = useAuthContext();
    const [search, setSearch] = useState('');

    const { user } = useUser(token)
    console.log("user:", user)



    const fetchData = async() => {
        const response = await fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users`, {
            headers: { Authorization: `Bearer ${token}` },
            method: "get",
        });
        if (response.ok) {

            console.log("response:", response)

            const data = await response.json()
            console.log("data:", data)

            setUsers(data)
        } else {
            console.error(response);
            const errorData = await response.json();
            console.error(errorData);
        }
        };

    useEffect(() => {

        fetchData();
    }, [token])



    const matchButton = async (username) => {
        const response =
        await fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/{user.username}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                matches: [...user.matches, username],
            }),
        })
        if (response.ok) {
            console.log("success match")
        } else {
            console.error("error response:", response)
            const errorData = await response.json();
            console.error("errorData:", errorData)
        }
    }
    const handleSearch = event => {
        setSearch(event.target.value.toLowerCase())
    }
    const filterBio = users.filter(user => {
        const aboutMe = user.about_me || "";
        const lookingFor = user.looking_for || "";
        const interests = user.interes || "";
        return (
        aboutMe.toLowerCase().includes(search)
        || lookingFor.toLowerCase().includes(search)
        || interests.toLowerCase().includes(search)); });
    return (
        <>
            <h2><form className="searchBar">
            <input type="text"
            className="searchBarinput"
            placeholder="search preferences"
            value={search}
            onChange={handleSearch} />
        </form></h2>

        <section className="big-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">List of Potential Matches</h1>
                <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
        {filterBio.map((user) => {
            return (
        <div className="bg-gray-100" key={user.username} value={user.username}>
            <div className="max-w-sm mx-auto my-10 bg white rounded-sm shadow-md p-5">
                {user.profile_picture_url !== "string" ? (
                <img className="w-32 h-32 h-32 rounded-full mx-auto" src={user.profile_picture_url} alt="" />
        ) : (
            <img className="w-36 h-36 h-36 rounded-full mx-auto" src="/default_profile.png" alt="" />
        )}
                <h1 className="text-center text-2xl font-bold mt-3">{user.username}</h1>
                <h2 className="text-center text-2xl font-semibold mt-3">{user.first_name} {user.last_name}</h2>
                <p className="text-center text-gray-600 mt-1">{user.location}</p>
                <div className="flex justify-center mt-5">
                    <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">Decline</a>
                    <button className="text-blue-500 hover:text-blue-700 mx-3"
                    onClick={() => matchButton(user.username)}>Match</button>
                </div>
                <div className="mt-5">
                    <h3 className="text-xl font-semibold">Bio</h3>
                    <p className="text-gray-600 mt-2">{user.about_me}</p>
                </div>
            </div>
            </div>

            )
        })}
                </div>
            </div>
        </section>
        </>
    )
}
export default ProfileCard;
