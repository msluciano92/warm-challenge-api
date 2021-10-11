module.exports = {
    paginate:  (array, first, rows) => {
        return array.slice(parseInt(first), parseInt(first) + parseInt(rows));
    },
}

