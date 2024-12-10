export const MenuDataHandler = (item) => {
    return item?.map((i) => {
        const objKey = Object.keys(i);
        return {
            key: i[objKey[1]],
            value: isNaN(i[objKey[0]]) ? i[objKey[0]] : parseInt(i[objKey[0]]),
        };
    });
};
