exports.index = function(req, res) {
  const records = [
    { title: 'async todo 1' },
    { title: 'async todo 2' }
  ]

  res.status(200).send(records)
}

exports.new = function(req, res) {
  const record = { title: 'new todo' }

  res.status(200).send(record)
}
