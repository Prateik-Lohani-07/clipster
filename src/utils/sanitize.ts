export function sanitizeText(input: string): string {
	if (typeof input !== "string") return "";
	return input.replace(/<\/?[^>]+(>|$)/g, "");
}
