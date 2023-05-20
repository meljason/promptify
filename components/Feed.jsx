'use client';

import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';
import { AiFillCloseCircle } from 'react-icons/ai';

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
	const [tagClicked, setTagClicked] = useState('');

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

	const fetchPosts = async () => {
		const response = await fetch('/api/prompt');
		const data = await response.json();

		console.log('This is the data', data);
		setPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	useEffect(() => {
		if (tagClicked === '') {
			fetchPosts();
		}
	}, [tagClicked]);

	useEffect(() => {
		let filteredPosts;

		console.log('This is the searched text', searchText);
		filteredPosts = posts.filter((post) => {
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

		if (!searchText) {
			console.log('I am here', posts);

			fetchPosts();
			return;
		}

		setPosts(filteredPosts);
	}, [searchText]);

	const handleTagClicked = (tag) => {
		setTagClicked(tag);

		//filter for tags that match exactly
		const filteredPosts = posts.filter((post) => {
			const tags = post.tag.toLowerCase();

			return tags.includes(tag.toLowerCase());
		});

		setPosts(filteredPosts);
	};

	const clearTag = () => {
		setTagClicked('');
	};
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

			{tagClicked && (
				<div className='flex font-inter mt-4'>
					<span className='font-bold mr-1'>Tag Searched: </span>
					<span className='font-inter text-sm blue_gradient align-center'>
						#{tagClicked}
					</span>
					<div onClick={clearTag}>
						<AiFillCloseCircle
							style={{
								cursor: 'pointer',
								color: '#2563eb',
								marginLeft: '5px',
								verticalAlign: 'middle',
								marginTop: '4px',
							}}
						/>
					</div>
				</div>
			)}

			<PromptCardList data={posts} handleTagClick={handleTagClicked} />
		</section>
	);
};

export default Feed;
