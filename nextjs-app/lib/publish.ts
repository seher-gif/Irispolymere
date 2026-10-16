import { revalidatePath } from "next/cache";

// Call after any admin write that affects the public site: drops the cached pages so the
// next visit renders fresh content (public pages are otherwise regenerated every few minutes).
export function publishContent() {
  revalidatePath("/", "layout");
}
