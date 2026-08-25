"use server";

import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export type ExportState = { success?: boolean; error?: string; output?: string };

export async function exportContentAction(): Promise<ExportState> {
  try {
    const { stdout } = await execFileAsync("npm", ["run", "export-content"], {
      cwd: process.cwd(),
      timeout: 30_000,
    });
    return { success: true, output: stdout.trim() };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Export failed.";
    return { error: message };
  }
}
