import { useNavigate, useParams } from "react-router";
import useDisc from "../../../hooks/disc.hook";
import { useState } from "react";
import Api from "../../../api";
import useDiscsStore from "../../../state/discs.store";

export function AddTrackPage() {
	const { uuid } = useParams();
	const disc = useDisc(uuid);
	const [title, setTitle] = useState("");
	const [index, setIndex] = useState("");
	const [isCreating, setIsCreating] = useState(false);
	const { fetchInsertedDiscs } = useDiscsStore();
	const navigate = useNavigate();

	if (!disc) {
		return <h1>Loading Disc</h1>;
	}

	const submit = () => {
		if (!title || !index || isCreating) {
			return;
		}

		const number = Number(index);
		if (isNaN(number) || !!(number % 1)) {
			return;
		}
		if (number < 1 || number > 99) {
			return;
		}
		const finalIndex = number;

		setIsCreating(true);
		Api.PUT("/discs/{uuid}/track", {
			params: {
				path: {
					uuid: disc.uuid,
				},
			},
			body: {
				title,
				index: finalIndex,
			},
		})
			.then(() => {
				fetchInsertedDiscs().catch(console.error);
				navigate(`/disc/${disc.uuid}`);
			})
			.finally(() => {
				setIsCreating(false);
			});
	};

	return (
		<div>
			<h1>Add Track</h1>
			<input
				value={title}
				onChange={(e) => setTitle(e.currentTarget.value.substring(0, 500))}
				placeholder="Title"
			/>
			<input
				value={index}
				onChange={(e) => setIndex(e.currentTarget.value)}
				placeholder="Index"
			/>
			<button onClick={submit}>Create</button>
		</div>
	);
}
