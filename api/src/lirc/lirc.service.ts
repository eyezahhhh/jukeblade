import { Injectable } from "@nestjs/common";
import IrCode from "./enum/ir-code.enum";
import { promisify } from "util";
import { exec } from "child_process";

@Injectable()
export class LircService {
	private readonly device = "/dev/lirc0";
	private readonly queue: IrCode[] = [];
	private activeCode: IrCode | null = null;

	async send(codes: IrCode[]) {
		this.queue.push(...codes);

		if (this.activeCode) {
			return;
		}

		const run = async () => {
			const code = this.queue.shift();
			if (!code) {
				return;
			}
			this.activeCode = code;

			try {
				const command = `ir-ctl -S sony12:${code} -d ${this.device}`;
				console.log(command);
				await promisify(exec)(command);
				await new Promise<void>((r) => setTimeout(r, 50));
				await promisify(exec)(command);
			} catch (e) {
				console.error(e);
			} finally {
				setTimeout(() => {
					this.activeCode = null;
					run();
				}, 100);
			}
		};
		run();
	}
}
