'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
	const [posts, setPosts] = useState([]);
	const searchParams = useSearchParams();

	const userId = searchParams.get('id');
	const userName = searchParams.get('name');

	useEffect(() => {
		const fetchPosts = async () => {
			console.log('This is the session id', userId, userName);
			const response = await fetch(`/api/users/${userId}/posts`);
			const data = await response.json();

			console.log('This is the data', data);
			setPosts(data);
		};

		if (userId) fetchPosts();
	}, []);

	return (
		<Profile
			name={`${userName}'s`}
			desc={`Welcome to ${userName}'s profile page`}
			data={posts}
		/>
	);
};

export default MyProfile;
