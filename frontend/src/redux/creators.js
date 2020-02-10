import {PHOTOGRAPHERS, ALBUMS, PHOTO} from "./actions";

export const LoadingPhotographers = (data) => {
    return {
        type: PHOTOGRAPHERS,
        data: data,
    }
};

export const LoadingAlbums = (data) => {
    return {
        type: ALBUMS,
        data: data,
    }
};

export const LoadingPhoto = (data) => {
    return {
        type: PHOTO,
        data: data,
    }
};
