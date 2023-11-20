const RESOLUTIONS = [
    [1600, 900],
    [1200, 900],
    [1000, 1000],
    [900, 1600],
    [900, 1200],
];

export const getImages = (size: number) => {
    const images: string[] = [];
    for (let i = 0; i < size; i++) {
        const [width, height] = RESOLUTIONS[i % RESOLUTIONS.length];
        images.push(`https://picsum.photos/seed/picsum${i}/${width}/${height}`);
    }
    return images;
};
