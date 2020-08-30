const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateToken = () => {
    let build = '';
    for (let i = 0; i < 50; i++)
        build += chars[getRandomInt(0, chars.length - 1)];
    return build;
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function clamp(v, min, max) {
    if (v > max) return max;
    if (v < min) return min;
    return v;
}