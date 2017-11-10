module.exports = {

addUser: (req, res, next) => {
  const dbInstance = req.app.get('db');


  dbInstance.addUser(req.body)
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err))

  }


}
