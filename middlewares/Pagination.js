const paginate = (req, res, next) => {
    const { pageNumber, pageSize } = req.query
    if (pageNumber && pageSize) {
        const offset = pageSize * (pageNumber - 1)
        const limit = pageSize
        req.offset = offset
        req.limit = Number(limit)
        next()
    }
    else {
        req.offset = 0
        req.limit = 200
        next()
    }
}