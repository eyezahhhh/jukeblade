import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Api from "../../api";
import styles from "./disc.module.scss";
import useDisc from "../../hooks/disc.hook";
import TrackListEntry from "../../components/track-list-entry";
import List from "../../components/list";
import Row from "../../components/row";
import Modal from "../../components/modal";
import useDiscsStore from "../../state/discs.store";

export function DiscPage() {
	const { uuid } = useParams();
	const [isPlaying, setIsPlaying] = useState(false);
	const [disc, updateDisc] = useDisc(uuid);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [editAlbum, setEditAlbum] = useState("");
	const [editArtist, setEditArtist] = useState("");
	const [editPosition, setEditPosition] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const { fetchInsertedDiscs } = useDiscsStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (disc) {
			setEditAlbum(disc.album);
			setEditArtist(disc.artist);
			setEditPosition(disc.position?.toString() || "");
		}
	}, [editModalOpen, disc]);

	if (!disc) {
		return <h1>Loading</h1>;
	}

	const play = () => {
		if (isPlaying) {
			return;
		}
		setIsPlaying(true);
		Api.POST("/discs/{uuid}/play", {
			params: {
				path: {
					uuid: disc.uuid,
				},
			},
			body: {},
		}).finally(() => setIsPlaying(false));
	};

	const editDisc = () => {
		if (!editArtist || !editAlbum || isEditing) {
			return;
		}

		let finalPosition: number | null = null;
		if (editPosition.length) {
			const number = Number(editPosition);
			if (isNaN(number) || !!(number % 1)) {
				return;
			}
			if (number < 1 || number > 200) {
				return;
			}
			finalPosition = number;
		}

		setIsEditing(true);
		Api.PATCH("/discs/{uuid}", {
			params: {
				path: {
					uuid: disc.uuid,
				},
			},
			body: {
				artist: editArtist,
				album: editAlbum,
				position: finalPosition || undefined,
			},
		})
			.then(({ data }) => {
				if (data) {
					updateDisc(data);
					fetchInsertedDiscs().catch(console.error);
					setEditModalOpen(false);
				}
			})
			.finally(() => {
				setIsEditing(false);
			});
	};

	const deleteDisc = () => {
		if (isDeleting) {
			return;
		}
		setIsDeleting(true);
		Api.DELETE("/discs/{uuid}", {
			params: {
				path: {
					uuid: disc.uuid,
				},
			},
		})
			.then(() => {
				fetchInsertedDiscs().catch(console.error);
				navigate("/discs");
			})
			.finally(() => {
				setIsDeleting(false);
			});
	};

	return (
		<div className={styles.container}>
			<Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
				<div className={styles.editModal}>
					<h1>Edit CD</h1>
					<input
						value={editArtist}
						onChange={(e) =>
							setEditArtist(e.currentTarget.value.substring(0, 300))
						}
						placeholder="Artist"
						className="textInput"
					/>
					<input
						value={editAlbum}
						onChange={(e) =>
							setEditAlbum(e.currentTarget.value.substring(0, 500))
						}
						placeholder="Album"
						className="textInput"
					/>
					<input
						value={editPosition}
						onChange={(e) => setEditPosition(e.currentTarget.value)}
						placeholder="Position"
						className="textInput"
					/>
					<button className="button" onClick={editDisc}>
						Save
					</button>
				</div>
			</Modal>
			<Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
				<div className={styles.deleteModal}>
					<h1>Delete CD</h1>
					<button className="button" onClick={deleteDisc}>
						Delete
					</button>
				</div>
			</Modal>
			<h1 className={styles.album}>{disc.album}</h1>
			<h2 className={styles.artist}>{disc.artist}</h2>
			<h3 className={styles.position}>
				{disc.position
					? `Inserted at position ${disc.position}`
					: "Not inserted"}
			</h3>
			<Row>
				<button onClick={play} className="button">
					Play
				</button>
				<button onClick={() => setEditModalOpen(true)} className="button">
					Edit
				</button>
				<Link to={`/disc/${disc.uuid}/add`} className="button">
					Add track
				</Link>
				<button className="button" onClick={() => setDeleteModalOpen(true)}>
					Delete
				</button>
			</Row>

			<List className={styles.tracks}>
				{disc.tracks.map((track) => (
					<TrackListEntry
						track={track}
						key={track.uuid}
						disc={disc}
						onDelete={updateDisc}
					/>
				))}
			</List>
		</div>
	);
}
