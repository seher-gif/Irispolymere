// Uploaded images carry their real pixel size (read at export time) so pages
// can render them at their natural aspect ratio — no cropping, any size.
export type ImageRef = { src: string; width: number; height: number };
export type LocalizedImage = { en: ImageRef; fr: ImageRef; ar: ImageRef };
