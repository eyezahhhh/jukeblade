import { create } from "zustand";
import type { Disc } from "../api-schema";
import Api from "../api";

interface DiscsState {
	insertedDiscs: Disc[];
	insertedDiscsController: AbortController | null;
	fetchInsertedDiscs(): Promise<Disc[]>;
}

const useDiscsStore = create<DiscsState>((set, get) => ({
	insertedDiscs: [],
	insertedDiscsController: null,
	fetchInsertedDiscs: async () => {
		get().insertedDiscsController?.abort();

		const controller = new AbortController();
		set({
			insertedDiscsController: controller,
		});
		try {
			const { data } = await Api.GET("/discs/inserted", {
				signal: controller.signal,
			});
			if (!data) {
				throw new Error("No discs");
			}
			set((old) => {
				if (!old.insertedDiscs.length && !data.length) {
					return {};
				}
				return {
					insertedDiscs: data,
				};
			});
			return data;
		} catch (e) {
			throw e;
		} finally {
			set((old) => {
				if (old.insertedDiscsController == controller) {
					return {
						insertedDiscsController: null,
					};
				}
				return {};
			});
		}
	},
}));
export default useDiscsStore;
