import React, {useEffect, useState} from 'react'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';




function ProfileView(props){
    const [profile, setProfile]= useState()

    const { token } = useAuthContext()
    console.log(props.user)


    const getProfile= async()=>{
        const response = await fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${props.user.username}`, {
            credentials:"include",
            headers: {Authorization: `Bearer ${token}` },
            method: "get",
        })
        if (response.ok){
            const data= await response.json();
            setProfile(data);
        }
    }

    useEffect(()=>{
        if (props.user){
            getProfile();
        }
    }, [token, props.user])

  return (
      <>
        <h1>Your Profile</h1>
        {/* add the navlink to update a profile? */}
        {/* <div className="d-flex justify-content-end">
            <NavLink className="nav-link" to="/technicians/create">
                <button type="button" className="btn btn-success">Edit profile</button>
            </NavLink>
        </div> */}
        <table className="table table-striped">
        <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Profile Picture</th>
            <th>Other pictures</th>
            <th>Pronouns</th>
            <th>Location</th>
            <th>Looking for</th>
            <th>About Me</th>
            </tr>
        </thead>
        <tbody>
            {profile ? (
                <tr>
                <td>{ profile.first_name }</td>
                <td>{ profile.last_name }</td>
                <td>{ profile.gender }</td>
                <img src={ profile.profile_picture_url }/>
                <td>{profile.other_picture}</td>
                <td>{profile.location}</td>
                <td>{profile.looking_for}</td>
                <td>{profile.about_me}</td>
                </tr>
            ):null}
        </tbody>
        </table>
      </>
  );
}

export default ProfileView
