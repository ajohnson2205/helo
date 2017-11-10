module.exports = {
  sayHello: (req, res) => {
    req.session.user = "alex";
    console.log(req.session)
    // console.log(req);
    res.status(200).send("Hello!")
  },

  home: (req, res) => {
    res.status(200).send("Home is where this code is.")
  }

}
