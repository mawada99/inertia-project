/* eslint-disable strict */
// "use strict";

// Object.defineProperty(exports, "__esModule", {
//     value: true,
// });

// track, thumb and active are derieved from macOS 10.15.7
const scrollBar = {
    track: "#f1f1f1",
    thumb: "#cbcaca",
    active: "#919090",
};

function lightScrollbar(options = scrollBar) {
    return {
        scrollbarColor: `${options.thumb} ${options.track}`,
        "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: options.track,
        },
        "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: options.thumb,
            minHeight: 24,
            border: `3px solid ${options.track}`,
        },
        "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
                backgroundColor: options.active,
            },
        "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
                backgroundColor: options.active,
            },
        "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
                backgroundColor: options.active,
            },
        "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: options.track,
        },
    };
}
export default lightScrollbar;
