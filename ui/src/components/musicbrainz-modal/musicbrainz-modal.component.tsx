import Modal from "../modal";

interface Props {
	open: boolean;
	onClose?: () => void;
}

export function MusicbrainzModal({ open, onClose }: Props) {
	return (
		<Modal open={open} onClose={onClose}>
			<h1>Musicbrainz</h1>
		</Modal>
	);
}
