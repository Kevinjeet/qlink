import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useParams } from 'react-router-dom';

function OtherProfile() {
  const [profile, setProfile] = useState(null);
  const { username } = useParams();
  const { token } = useAuthContext();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${username}`,
          {
            credentials: 'include',
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          // Handle error response
          console.error('Failed to fetch profile:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getProfile();
  }, [token, username]);

  return (
    <div className="card flex justify-center items-center h-screen bg-orange-300">
      <div className="card-body">
        <h1 className="card-title">View Profile</h1>
        {profile ? (
          <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex flex-col justify-between p-4 leading-normal">
                <div className="data-box">
                  <dt className="text-lg font-medium">Profile Picture:</dt>
                  <dd className="mt-1">
                    <img src={profile.profile_picture_url} alt="Profile" />
                  </dd>
                </div>
                <div className="data-box">
                  <dt className="text-lg font-medium">Other pictures:</dt>
                  <dd className="mt-1">
                    <img src={profile.other_picture} alt="Other" />
                  </dd>
                </div>
              <dl className="divide-y divide-gray-400">
                <div className="data-box">
                  <dt className="text-lg font-medium">Name:</dt>
                  <dd className="mt-1 text-gray-900 dark:text-white">
                    {profile.first_name} {profile.last_name}
                  </dd>
                </div>
                <div className="data-box">
                  <dt className="text-lg font-medium">Gender:</dt>
                  <dd className="mt-1 text-gray-700 dark:text-gray-400">
                    {profile.gender}
                  </dd>
                </div>
                <div className="data-box">
                  <dt className="text-lg font-medium">Pronouns:</dt>
                  <dd className="mt-1 text-gray-700 dark:text-gray-400">
                    {profile.pronouns}
                  </dd>
                </div>
                <div className="data-box">
                  <dt className="text-lg font-medium">Location:</dt>
                  <dd className="mt-1 text-gray-700 dark:text-gray-400">
                    {profile.location}
                  </dd>
                </div>
                <div className="data-box">
                  <dt className="text-lg font-medium">About Me:</dt>
                  <dd className="mt-1 text-gray-700 dark:text-gray-400">
                    {profile.about_me}
                  </dd>
                </div>
                <div className="data-box">
                  <dt className="text-lg font-medium">Looking for:</dt>
                  <dd className="mt-1 text-gray-700 dark:text-gray-400">
                    {profile.looking_for}
                  </dd>
                </div>
                <div className="data-box">
                  <dt className="text-lg font-medium">Interests:</dt>
                  <dd className="mt-1 text-gray-700 dark:text-gray-400">
                    {profile.interests}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
}

export default OtherProfile;
