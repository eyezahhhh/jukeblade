import { Link } from "react-router";
import DiscListEntry from "../../components/disc-list-entry";
import useDiscsStore from "../../state/discs.store";
import styles from "./discs.module.scss";
import { useEffect, useState } from "react";
import List from "../../components/list";
import Row from "../../components/row";
import { MusicbrainzModal } from "../../components/musicbrainz-modal/musicbrainz-modal.component";

export function DiscsPage() {
	const { insertedDiscs, insertedDiscsController, fetchInsertedDiscs } =
		useDiscsStore();
	const [musicbrainzOpen, setMusicbrainzOpen] = useState(false);

	useEffect(() => {
		if (!insertedDiscsController && !insertedDiscs.length) {
			fetchInsertedDiscs().catch(() => {});
		}
	}, [insertedDiscs, insertedDiscsController]);

	return (
		<div>
			<MusicbrainzModal
				open={musicbrainzOpen}
				onClose={() => setMusicbrainzOpen(false)}
			/>
			<Row>
				<Link to="/discs/create" className="button">
					Create
				</Link>
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
