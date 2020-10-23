export function getFilterFromParams(params) {
    const filter = {};
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const element = params[key];
            if (
                element === undefined ||
                element === null ||
                element === "" ||
                (Array.isArray(element) && element.length === 0)
            ) {
                //do not use it
            } else {
                filter[key] = element;
            }
        }
    }

    return JSON.stringify(filter);
}
