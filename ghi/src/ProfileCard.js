import useToken from "@galvanize-inc/jwtdown-for-react";
import "./input.css";
import React, { useEffect, useState } from 'react';
// import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
// import useUser from "./useUser";
import { useNavigate } from "react-router-dom"

function ProfileCard(props) {
    const [users, setUsers] = useState([]);
    const { token } = useToken();
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    // const { user } = useUser(token)
    console.log("user: ", props.user)



    const fetchData = async() => {
        const response =
        await fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users`, {
            headers: { Authorization: `Bearer ${token}` },
            method: "get",
        });
        if (response.ok) {
            // console.log("response:", response)
            const data = await response.json()
            // console.log("data:", data)
            setUsers(data)
        } else {
            console.error(response);
            const errorData = await response.json();
            console.error(errorData);
        }
        };

    useEffect(() => {
        if (props.user.username){
            fetchData()};
    }, [token, props.user.username])



    const matchButton = async (username) => {
        const response =
        await fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${props.user.username}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                matches: [...props.user.matches, username],
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



    const blockButton = async (username) => {
        const response =
        await fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${props.user.username}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                blocks: [...props.user.blocks, username],
            }),
        })
        if (response.ok) {
            console.log("success block")
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
        const interests = user.interests || "";
        if (props.user.matches.includes(user.username)
        // || props.user.block.includes(user.username)
        ) {
            return false
        }
        return (
        aboutMe.toLowerCase().includes(search)
        || lookingFor.toLowerCase().includes(search)
        || interests.toLowerCase().includes(search))
        && user.username !== props.user.username; });

    return (
        <>
        <section className="small-white dark:bg-gray-900">
            <div className="container px-3 py-5 mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">List of Potential Matches</h1>
            <h2><form className="searchBar">
            <input type="text"
            className="searchBarinput"
            placeholder="search preferences"
            value={search}
            onChange={handleSearch} />
        </form></h2>
                <div className="grid grid-cols-2 gap-1 mt-1 md:mt-1 md:grid-cols-3">
        {filterBio?.map((u) => {
            return (
        <div className="lg-gray-500" key={u.username} value={u.username}>
            <div className="max-w-sm mx-auto my-10 bg white rounded-sm shadow-md p-5">
                {u.profile_picture_url !== "string" ? (
                <img className="w-32 h-32 h-32 rounded-full mx-auto" src={u.profile_picture_url} alt="" />
        ) : (
            <img className="w-36 h-36 h-36 rounded-full mx-auto" src="/default_profile.png" alt="" />
        )}
                <h1 className="text-center text-2xl font-bold mt-3">{u.username}</h1>
                <h2 className="text-center text-2xl font-semibold mt-3">{u.first_name} {u.last_name}</h2>
                <p className="text-center text-gray-600 mt-1">{u.location}</p>
                <div className="flex justify-center mt-5">
                    <button className="text-blue-500 hover:text-blue-700 mx-3"
                    onClick={() => blockButton(u.username)}>Decline</button>
                    <button className="text-blue-500 hover:text-blue-700 mx-3"
                    onClick={() => matchButton(u.username)}>Match</button>
                </div>
                <div className="mt-5">
                    <h3 className="text-xl font-semibold">Bio</h3>
                    <p className="text-gray-600 mt-2">{u.about_me}</p>
                </div>
                <div className="flex items-right">
                    <button className="ml-auto text-base font-medium text-blue-500 hover:text-blue-700 mx-3"
                    onClick={() => navigate(`/users/${u.username}`)}>View Profile</button>
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
