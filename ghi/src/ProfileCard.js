import "./input.css";
import React, { useEffect, useState } from 'react';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function ProfileCard() {
    const [users, setUsers] = useState([]);
    const { token } = useAuthContext();


    const fetchData = async() => {
        // const storeToken = localStorage.getItem("token")
        // const authToken = storeToken || token;
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
            console.error(errorData); // Log the error response for debugging
        }
        };
    useEffect(() => {
        // if (token)  {
        //     localStorage.setItem("token", token);
        // }
        fetchData();
    }, [token])
    return (
        <>
        {users?.map((user) => {
            return (
                <h1 key={user.username}>{user.username}</h1>
            )
        })}
        </>
    )
}
export default ProfileCard;
