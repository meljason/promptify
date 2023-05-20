'use client';

import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className='mt-16 prompt_layout'>
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState('');
	const [posts, setPosts] = useState([]);

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('/api/prompt');
			const data = await response.json();

			console.log('This is the data', data);
			setPosts(data);
		};

		fetchPosts();
	}, []);

	useEffect(() => {
		//filter through searchText and return posts that match
		const filteredPosts = posts.filter((post) => {
			console.log('This is the post 666', post);
			const posts = post.prompt.toLowerCase();
			const tags = post.tag.toLowerCase();
			const username = post.creator.username.toLowerCase();
			const email = post.creator.email.toLowerCase();

			return (
				posts.includes(searchText.toLowerCase()) ||
				tags.includes(searchText.toLowerCase()) ||
				username.includes(searchText.toLowerCase()) ||
				email.includes(searchText.toLowerCase())
			);
		});

		setPosts(filteredPosts);
	}, [searchText]);
	return (
		<section className='feed'>
			<form className='relative w-full flex-container'>
				<input
					type='text'
					placeholder='Search for a tag or a username'
					value={searchText}
					onChange={handleSearchChange}
					required
					className='search_input peer'
				/>
			</form>

			<PromptCardList data={posts} handleTagClick={() => {}} />
		</section>
	);
};

export default Feed;
