import { useState } from "react";
import Api from "../../../api";
import { useNavigate } from "react-router";
import useDiscsStore from "../../../state/discs.store";

export function CreateDiscPage() {
	const [artist, setArtist] = useState("");
	const [album, setAlbum] = useState("");
	const [position, setPosition] = useState("");
	const [isCreating, setIsCreating] = useState(false);
	const navigate = useNavigate();
	const { fetchInsertedDiscs } = useDiscsStore();

	const submit = () => {
		if (!artist || !album || isCreating) {
			return;
		}

		let finalPosition: number | null = null;
		if (position.length) {
			const number = Number(position);
			if (isNaN(number) || !!(number % 1)) {
				return;
			}
			if (number < 1 || number > 200) {
				return;
			}
			finalPosition = number;
		}

		setIsCreating(true);
		Api.PUT("/discs", {
			body: {
				artist,
				album,
				position: finalPosition || undefined,
			},
		})
			.then(() => {
				fetchInsertedDiscs().catch(console.error);
				navigate("/discs");
			})
			.finally(() => {
				setIsCreating(false);
			});
	};

	return (
		<div>
			<h1>Create Disc</h1>
			<input
				value={artist}
				onChange={(e) => setArtist(e.currentTarget.value.substring(0, 300))}
				placeholder="Artist"
			/>
			<input
				value={album}
				onChange={(e) => setAlbum(e.currentTarget.value.substring(0, 500))}
				placeholder="Album"
			/>
			<input
				value={position}
				onChange={(e) => setPosition(e.currentTarget.value)}
				placeholder="Position"
			/>
			<button onClick={submit}>Create</button>
		</div>
	);
}
