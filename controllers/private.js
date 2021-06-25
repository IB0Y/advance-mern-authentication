exports.getPrivateData = (req, res, next ) => {
  res.status(200).json({
    success: true,
    data: "You got access to private data"
  })
}


// if (!localStorage.getItem("authToken")) {
//   history.push("/login");
// }
