import React, { useState, useEffect } from 'react';
// import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import useToken from '@galvanize-inc/jwtdown-for-react';


function ProfileForm(props) {
    const [password, setPassword] = useState('')
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [date_of_birth, setDOB] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [profile_picture_url, setProfilePictureUrl] = useState('');
    const [other_picture, setOtherPictureUrl] = useState('')
    const [pronouns, setPronouns] = useState('');
    const [location, setLocation] = useState('');
    const [looking_for, setLookingFor] = useState('');
    const [about_me, setAboutMe] = useState('');
    const { token } = useToken();


    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleDOBChange = (event) => setDOB(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
    const handleGenderChange = (event) => setGender(event.target.value);
    const handleProfilePictureUrlChange = (event) => setProfilePictureUrl(event.target.value);
    const handleOtherPictureUrlChange = (event) => setOtherPictureUrl(event.target.value);
    const handlePronounChange = (event) => setPronouns(event.target.value);
    const handleLocationChange = (event) => setLocation(event.target.value);
    const handleLookingForChange = (event) => setLookingFor(event.target.value);
    const handleAboutMeChange = (event) => setAboutMe(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const profile = {};
        profile.password = password;
        profile.first_name = first_name;
        profile.last_name = last_name;
        profile.date_of_birth = date_of_birth;
        profile.email = email;
        profile.phone_number = phone_number;
        profile.gender = gender;
        profile.profile_picture_url = profile_picture_url;
        profile.other_picture = other_picture;
        profile.pronouns = pronouns;
        profile.location = location;
        profile.looking_for = looking_for;
        profile.about_me = about_me;


        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${props.user.username}`;
        console.log(url)
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(profile),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setPassword(profile.password);
            setFirstName(profile.first_name);
            setLastName(profile.last_name);
            setDOB(profile.date_of_birth);
            setEmail(profile.email);
            setPhoneNumber(profile.phone_number);
            setGender(profile.gender)
            setProfilePictureUrl(profile.profile_picture_url);
            setOtherPictureUrl(profile.other_picture)
            setPronouns(profile.pronouns);
            setLocation(profile.location);
            setLookingFor(profile.looking_for);
            setAboutMe(profile.about_me);
        };
    }
    useEffect(() => {
        if (props.user.username){
            const fetchData = async () => {
                console.log(props.user.username)
                const response = await fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${props.user.username}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    method: "get",
                });

                if (response.ok) {
                    const data = await response.json();
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setDOB(data.date_of_birth);
                    setEmail(data.email);
                    setPhoneNumber(data.phone_number);
                    setGender(data.gender)
                    setProfilePictureUrl(data.profile_picture_url);
                    setOtherPictureUrl(data.other_picture);
                    setPronouns(data.pronouns);
                    setLocation(data.location);
                    setLookingFor(data.looking_for);
                    setAboutMe(data.about_me);
                }
            }
            fetchData();
        }
    },[token, props.user]);


    // const fetchData = async () => {
    //     console.log("test")
    //     const response = await fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${props.user.username}`, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         },
    //         method: "get",
    //     });

    //     if (response.ok) {
    //         const data = await response.json();
    //         setFirstName(data.first_name);
    //         setLastName(data.last_name);
    //         setEmail(data.email);
    //         setPhoneNumber(data.phone_number);
    //         setGender(data.gender)
    //         setProfilePictureUrl(data.profile_picture_url);
    //         setOtherPictureUrl(data.other_picture);
    //         setPronouns(data.pronouns);
    //         setLocation(data.location);
    //         setLookingFor(data.looking_for);
    //         setAboutMe(data.about_me);
    //     }

    // }

    // useEffect(() => {
    //     if (props.user.username){
    //         fetchData()};
    // },[token, props.user], fetchData);

    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Profile</h1>
                    <form onSubmit={handleSubmit} id="create-profile-form">
                        <div className="form-floating mb-3">
                            <input onChange={handlePasswordChange} placeholder="Password" required type="text" name="password" id="password" className="form-control" value={password} />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFirstNameChange} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" value={first_name} />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleLastNameChange} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" value={last_name} />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleDOBChange} placeholder="date_of_birth" required type="text" name="date_of_birth" id="date_of_birth" className="form-control" value={date_of_birth} />
                            <label htmlFor="last_name">date_of_birth</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEmailChange} placeholder="Email" required type="text" name="email" id="email" className="form-control" value={email} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePhoneNumberChange} placeholder="Phone Number" required type="number" name="phone_number" id="phone_number" className="form-control" value={phone_number} />
                            <label htmlFor="phone_number">Phone Number</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleGenderChange} placeholder="Gender" required type="text" name="gender" id="gender" className="form-control" value={gender} />
                            <label htmlFor="gender">Gender</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleProfilePictureUrlChange} placeholder="Profile Pic Url" required type="text" name="profile_picture_url" id="profile_picture_url" className="form-control" value={profile_picture_url} />
                            <label htmlFor="profile_picture_url">Profile Picture URL</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleOtherPictureUrlChange} placeholder="Other Pic" required type="text" name="other_picture" id="other_picture" className="form-control" value={other_picture} />
                            <label htmlFor="other_picture">Other Picture</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePronounChange} placeholder="Pronouns" required type="text" name="pronouns" id="pronouns" className="form-control" value={pronouns} />
                            <label htmlFor="email">Pronouns</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleLocationChange} placeholder="Location" required type="text" name="location" id="location" className="form-control" value={location} />
                            <label htmlFor="email">Location</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleLookingForChange} placeholder="Looking For" required type="text" name="looking_for" id="looking_for" className="form-control" value={looking_for} />
                            <label htmlFor="email">Looking For</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleAboutMeChange} placeholder="About" required type="text" name="about_me" id="about_me" className="form-control" value={about_me} />
                            <label htmlFor="email">About Me</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );

}

export default ProfileForm;
