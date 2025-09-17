import { useEffect, useRef, useState } from "react";
import Modal from "../modal";
import Api from "../../api";
import type { SearchRelease, SearchReleaseMedia } from "../../api-schema";
import List from "../list";
import styles from "./musicbrainz-modal.module.scss";
import { cc, duration } from "../../utils/string.util";
import { useNavigate } from "react-router";

interface Props {
	open: boolean;
	onClose?: () => void;
}

export function MusicbrainzModal({ open, onClose }: Props) {
	const [query, setQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [releases, setReleases] = useState<SearchRelease[]>([]);
	const ref = useRef<HTMLInputElement>(null);
	const [isAddingRelease, setIsAddingRelease] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (open) {
			ref.current?.focus();
		}
	}, [open]);

	useEffect(() => {
		setReleases([]);
		if (!query) {
			return;
		}

		const controller = new AbortController();
		setIsSearching(true);
		Api.GET("/search/{query}", {
			params: {
				path: {
					query: searchQuery,
				},
			},
			signal: controller.signal,
		})
			.then(({ data }) => {
				if (data) {
					setReleases(data);
				}
			})
			.finally(() => {
				setIsSearching(false);
			});

		return () => {
			controller.abort();
		};
	}, [searchQuery, open]);

	const addRelease = (release: SearchRelease, media: SearchReleaseMedia) => {
		if (isAddingRelease) {
			return;
		}
		setIsAddingRelease(true);
		Api.PUT("/discs", {
			body: {
				artist: release.artist,
				album: release.title,
				tracks: media.tracks
					.sort((a, b) => a.position - b.position)
					.map((track) => track.title),
			},
		})
			.then(({ data }) => {
				if (data) {
					navigate(`/disc/${data.uuid}`);
				}
			})
			.finally(() => {
				setIsAddingRelease(false);
			});
	};

	return (
		<Modal open={open} onClose={onClose}>
			<div className={styles.container}>
				{isAddingRelease ? (
					<div className={styles.status}>
						<span>Adding Release...</span>
					</div>
				) : (
					<>
						<h1 className={styles.heading}>Search for CD</h1>
						<div className={styles.search}>
							<input
								value={query}
								onChange={(e) => setQuery(e.currentTarget.value)}
								placeholder="Search query"
								className={cc("textInput", styles.searchbox)}
								onKeyDown={(e) => {
									if (e.key == "Enter") {
										setSearchQuery(query);
									}
								}}
								ref={ref}
							/>
							<button className="button" onClick={() => setSearchQuery(query)}>
								Search
							</button>
						</div>
					</>
				)}

				{isSearching && !isAddingRelease && (
					<div className={styles.status}>
						<span>Searching...</span>
					</div>
				)}

				{!isAddingRelease && (
					<div className={styles.releases}>
						{releases.map((release) => (
							<div key={release.id} className={styles.release}>
								<div className={styles.releaseTop}>
									<img
										className={styles.albumCover}
										src={release.albumCover || "/no-album-cover.png"}
									/>
									<div className={styles.info}>
										<span className={styles.title}>{release.title}</span>
										<span className={styles.artist}>{release.artist}</span>
									</div>
								</div>

								<div className={styles.medias}>
									{release.media.map((media, index) => (
										<div className={styles.media} key={index}>
											<input
												type="checkbox"
												id={`musicbrainz_${release.id}_${index}`}
												className={styles.checkbox}
											/>
											<label
												htmlFor={`musicbrainz_${release.id}_${index}`}
												className={styles.label}
											>
												{media.format || "Unknown format"} -{" "}
												{media.tracks.length} tracks
											</label>
											<div className={styles.expand}>
												<div className={styles.tracklist}>
													{media.tracks.map((track) => (
														<div key={track.position} className={styles.track}>
															<span className={styles.position}>
																{track.position}
															</span>
															<span className={styles.title}>
																{track.title}
															</span>
															<span className={styles.duration}>
																{duration(track.duration)}
															</span>
														</div>
													))}
													<button
														className={cc("button", styles.addButton)}
														onClick={() => addRelease(release, media)}
													>
														Add
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</Modal>
	);
}
