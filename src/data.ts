export const API_KEY = "AIzaSyA70hnEJ2-JFkfrOJ8Bl9LwcPutmoXjRc4";

export const valueConverter = (value: number) => {
    if (value >= 1000000000) {
        return Math.floor(value / 1000000000) + "B";
    }
    else if (value >= 1000000) {
        return Math.floor(value / 1000000) + "M";
    }
    else if (value >= 1000) {
        return Math.floor(value / 1000) + "K";
    }
    else {
        return value;
    }
}