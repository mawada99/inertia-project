export function formHookRegister(message) {
    return (type, values) => {
        if (type === "requireFalse") {
            return { required: false }
        }
        else if (type || values !== undefined) {
            return {
                validate: {
                    empty: value => !!value?.trim() || message,
                    custom: values.value === undefined ? values : () => { }
                },

                [type]: { value: values.value, message: values.message },
                // ...(()=>{Object.keys(type) : Object.values })

            };
        } else if (values === undefined) {
            // return { validate: (value) => { return (Boolean(value === undefined) && !!value?.trim()) || message; } }
            return {
                required: message,
                pattern: {
                    value: /^\s*\S.*$/,
                    message
                }
            };


        }
    };
}
