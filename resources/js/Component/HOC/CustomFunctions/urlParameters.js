import { isBoolean } from "lodash";

export const parseBool = (bool) => {
    if (bool === "true") {
        return true
    } else if (bool === "false") {
        return false
    } else {
        return bool
    }
}


export function urlParameters(props) {
    const urlQuery = new URLSearchParams(props);
    const params = {};
    for (const param of urlQuery.entries()) {
        params[param[0]] = isBoolean(parseBool(param[1])) ? parseBool(param[1]) : (isNaN(param[1]) || (param[1].startsWith('0') && param[0] !== 'page') || param[0] === 'search') ? param[1] : Number(param[1]);
    }
    return params;
}
