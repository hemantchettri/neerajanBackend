const express = require("express");
const memories = require("../models/memoriesmodel");

const router = new express.Router();

const upload = require("../middleware/fileUpload");

const verifyAdmin = require("../middleware/auth");

// const memories = require("../models/memoriesmodel");
// const { modelName } = require('../models/memoriesmodel');
//
router.post(
  "/memories/insert",
  upload.single("memoriesimage"),
  function (req, res) {
    const memoriesTitle = req.body.title;
    const memoriesDescription = req.body.postdescription;
    const memoriesImage = req.file.filename;

    const data = new memories({
      title: memoriesTitle,
      postimage: memoriesImage,
      postdescription: memoriesDescription,
    });
    console.log(data);

    data
      .save()
      .then(function (result) {
        res.status(201).json({ message: "Post inserted" });
      })

      .catch(function (err) {
        res.status(500).json({ message: "error" });
      });
  }
);

router.delete("/memories/remove/:id", function (req, res) {
  const id = req.params.id;
  memories
    .deleteOne({ _id: id })
    .then(function (result) {
      res.status(201).json({ message: "Post deleted" });
    })
    .catch(function (err) {
      res.status(500).json({ message: err });
    });
});

router.get("/memories/showall", function (req, res) {
  memories
    .find()
    .then(function (data) {
      res.status(201).json({ success: true, data: data });
    })
    .catch(function (err) {
      res.status(500).json({ message: err });
    });
});

router.put("/memories/update", function (req, res) {
  const id = req.body.id;
  const mtitle = req.body.title;
  const mdescription = req.body.postdescription;
  console.log(req.body);

  memories
    .updateOne({ _id: id }, { title: mtitle, postdescription: mdescription })
    .then(function (result) {
      res.status(201).json({ message: "Post id updated" });
    })
    .catch(function (err) {
      res.status(500).json({ message: err });
    });
});

router.get("/memories/single/:id", function (req, res) {
  const id = req.params.id;
  memories
    .findById(id)
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json({});
    });
});

module.exports = router;
