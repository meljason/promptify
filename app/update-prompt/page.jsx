'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const searchParams = useSearchParams();
	const promptId = searchParams.get('id');

	const [post, setPost] = useState({
		prompt: '',
		tag: '',
	});

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`/api/prompt/${promptId}`);

			const data = await response.json();

			console.log('This is the edit data', data);

			setPost({
				prompt: data.prompt,
				tag: data.tag,
			});
		};

		if (promptId) getPromptDetails();
	}, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();

		setSubmitting(true);

		if (!promptId) return alert('Prompt ID not found');

		try {
			const res = await fetch(`/api/prompt/${promptId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			});

			console.log('This is the response', res);
			if (res.ok) {
				router.push('/');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type='Edit'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={(e) => {
				updatePrompt(e);
			}}
		></Form>
	);
};

export default EditPrompt;
