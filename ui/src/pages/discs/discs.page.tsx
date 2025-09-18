import DiscListEntry from "../../components/disc-list-entry";
import useDiscsStore from "../../state/discs.store";
import styles from "./discs.module.scss";
import { useEffect, useState } from "react";
import List from "../../components/list";
import Row from "../../components/row";
import { MusicbrainzModal } from "../../components/musicbrainz-modal/musicbrainz-modal.component";
import Modal from "../../components/modal";
import Api from "../../api";

export function DiscsPage() {
	const { insertedDiscs, insertedDiscsController, fetchInsertedDiscs } =
		useDiscsStore();
	const [musicbrainzOpen, setMusicbrainzOpen] = useState(false);
	const [addOpen, setAddOpen] = useState(false);
	const [addArtist, setAddArtist] = useState("");
	const [addAlbum, setAddAlbum] = useState("");
	const [addPosition, setAddPosition] = useState("");
	const [isAdding, setIsAdding] = useState(false);

	useEffect(() => {
		if (!insertedDiscsController && !insertedDiscs.length) {
			fetchInsertedDiscs().catch(() => {});
		}
	}, [insertedDiscs, insertedDiscsController]);

	const addDisc = () => {
		if (!addArtist || !addAlbum || isAdding) {
			return;
		}

		let finalPosition: number | null = null;
		if (addPosition.length) {
			const number = Number(addPosition);
			if (isNaN(number) || !!(number % 1)) {
				return;
			}
			if (number < 1 || number > 200) {
				return;
			}
			finalPosition = number;
		}

		setIsAdding(true);
		Api.PUT("/discs", {
			body: {
				artist: addArtist,
				album: addAlbum,
				position: finalPosition || undefined,
			},
		})
			.then(() => {
				fetchInsertedDiscs().catch(console.error);
				setAddOpen(false);
			})
			.finally(() => {
				setIsAdding(false);
			});
	};

	return (
		<div>
			<MusicbrainzModal
				open={musicbrainzOpen}
				onClose={() => setMusicbrainzOpen(false)}
			/>
			<Modal open={addOpen} onClose={() => setAddOpen(false)}>
				<div className={styles.addModal}>
					<h1>Add CD</h1>
					<input
						value={addArtist}
						onChange={(e) =>
							setAddArtist(e.currentTarget.value.substring(0, 300))
						}
						placeholder="Artist"
						className="textInput"
					/>
					<input
						value={addAlbum}
						onChange={(e) =>
							setAddAlbum(e.currentTarget.value.substring(0, 500))
						}
						placeholder="Album"
						className="textInput"
					/>
					<input
						value={addPosition}
						onChange={(e) => setAddPosition(e.currentTarget.value)}
						placeholder="Position"
						className="textInput"
					/>
					<button onClick={addDisc} className="button">
						Add
					</button>
				</div>
			</Modal>
			<Row className={styles.buttons}>
				<button className="button" onClick={() => setAddOpen(true)}>
					Create
				</button>
				<button className="button" onClick={() => setMusicbrainzOpen(true)}>
					Search MusicBrainz
				</button>
			</Row>

			<List>
				{insertedDiscs.map((disc) => (
					<DiscListEntry key={disc.uuid} disc={disc} />
				))}
			</List>
		</div>
	);
}
