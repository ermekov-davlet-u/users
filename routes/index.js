import express from 'express';


var router = express.Router();


/* GET home page. */
router.get("/", (req, res) => {
  res.send("seccess")
})



export default router;
