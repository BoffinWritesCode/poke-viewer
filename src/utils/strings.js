export function capitaliseWord(word) {
    return word[0].toUpperCase() + word.substr(1);
}
export function capitaliseAllWords(string) {
    return string.split(" ").map((word) => capitaliseWord(word)).join(" ");
}