export const slugify = (text?: string) => {
    if (!text) return "";
    return text
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w\s-]/g, "");
};
