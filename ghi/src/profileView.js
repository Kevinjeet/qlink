import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';

function ProfileView(props) {
  const [profile, setProfile] = useState();
  const { token } = useAuthContext();

  const getProfile = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${props.user.username}`,
      {
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}` },
        method: 'get',
      }
    );
    if (response.ok) {
      const data = await response.json();
      setProfile(data);
    }
  };

  useEffect(() => {
    if (props.user) {
      getProfile();
    }
  }, [token, props.user]);

  return (
    <div className='bg-orange-300'>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Your info:</h3>
      </div>
      <div className="mt-6 border-t border-purple-500">
        <dl className="divide-y divide-purple-500">
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">{profile ? `${profile.first_name} ${profile.last_name}` : '-'}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">{profile ? profile.gender : '-'}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Pronouns</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">{profile ? profile.pronouns : '-'}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Location</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">{profile ? profile.location : '-'}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">About Me</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">{profile ? profile.about_me : '-'}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Profile Picture</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">
              {profile && profile.profile_picture_url ? (
                <img
                  src={profile.profile_picture_url}
                  alt="Profile Picture"
                  style={{ width: '400px', height: '400px' }}
                  className="square-full"
                />
              ) : (
                '-'
              )}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Other Picture</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">
              {profile && profile.other_picture ? <img src={profile.other_picture} alt="Other Picture" style={{ width: '300px', height: '300px' }} className="square-full"/> : '-'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
export default ProfileView
