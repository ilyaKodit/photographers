import {PHOTOGRAPHERS, ALBUMS, PHOTO} from "./actions";

const initialState = {
    photographers: [],
    albums: null,
    photo: null
};

export default function (oldState = initialState, action) {
    switch (action.type) {
        case PHOTOGRAPHERS:
            return {
                photographers: action.data,
                albums: oldState.albums,
                photo: oldState.photo
            };

        case ALBUMS:
            return {
                photographers: oldState.photographers,
                albums: action.data,
                photo: oldState.photo
            };

        case PHOTO:
            return {
                photographers: oldState.photographers,
                albums: oldState.albums,
                photo: action.data
            };

        default:
            return oldState;
    }
};
