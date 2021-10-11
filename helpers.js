module.exports = {
    paginate: (array, first, rows) => {
        return array.slice(parseInt(first), parseInt(first) + parseInt(rows));
    },

    sanitizeData: (array, usedKeys) => {
        return array.map((item) => {
            const newObj = usedKeys
                .reduce((acum, key) => ({ ...acum, [key]: item[key] }), {})
            return newObj;
        })
    }
}

