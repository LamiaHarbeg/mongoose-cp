const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

//Create and Save a Record of a Model
//@Api http:localhost:8000/persons/addPerson
//@desc Add new Person
//@access public

router.post("/addPerson", (req, res) => {
  const { name, age, favoriteFoods } = req.body;
  const newPerson = new Person({
    name,
    age,
    favoriteFoods,
  });
  newPerson
    .save()
    .then((Persons) => res.send(Persons))
    .catch((err) => console.log(err));
});
//@Api 
//@desc 
//@access public

//Create Many Records with model.create()
//@Api localhost:8000/persons/addManyPersons
//@desc add manyPersons
//@access public
router.post("/addManyPersons", (req, res) => {
  const { arrayOfPeople } = req.body;
  Person.create(arrayOfPeople)
    .then((Persons) => res.send(Persons))
    .catch((err) => console.log(err));
});

//Use model.find() to Search Your Database
//@Api localhost:8000/persons/all
//@desc get all Persons
//@access public
router.get("/all", (req, res) => {
  Person.find()
    .then((Persons) => res.send(Persons))
    .catch((err) => console.log(err));
});

//Use model.findOne() to Return a Single Matching Document from Your Database
//@Api localhost:8000/persons/food
//@desc get one person using food as params
//@access public
router.get("/:food", (req, res) => {
  const { food } = req.params;
  Person.findOne({ favoriteFoods: food })
    .then((Persons) => res.send(Persons))
    .catch((err) => console.log(err));
});

//@desc Use model.findById() to Search Your Database By _id
// @ Api : localhost:8000/persons/personId/id
router.get("/personId/:_id", (req, res) => {
  const {_id} = req.params;
  Person.findById({ _id })
    .then((Persons) => res.send(Persons))
    .catch((err) => console.log(err));
});

//@desc Perform Classic Updates by Running Find, Edit, then Save
// @ Api : localhost:8000/persons/addHamburger/id
router.put("/addHamburger/:_id", (req, res) => {
  const { _id } = req.params;

  Person.findById({ _id }, (err, person) => {
    if (err) console.log(err);
    person.favoriteFoods.push("hamburger");
    console.log(person);
    const updatedPerson = new Person(person);
    updatedPerson
      .save()
      .then((Persons) => res.send(Persons))
      .catch((err) => console.log(err));
  });
});

//@desc Perform New Updates on a Document Using model.findOneAndUpdate()
// get person by name and edit his age to 20
// @ Api : localhost:8000/persons//editPerson/name
router.put("/editPerson/:name", (req, res) => {
  const { name } = req.params;
  Person.findOneAndUpdate({ name }, { $set: { age: 20 } }, { new: true })
    .then((Persons) => res.send(Persons))
    .catch((err) => console.log(err));
});

//@desc Delete One Document Using model.findByIdAndRemove
// @ Api : localhost:8000/persons/delete/id
router.delete("/delete/:_id", (req, res) => {
  const { _id } = req.params;
  Person.findByIdAndRemove({ _id })
    .then((Person) => res.send(Person))
    .catch((err) => console.log(err));
});

//MongoDB and Mongoose - Delete Many Documents with model.remove()
// @ Api : localhost:8000/persons/deleteAll
router.delete("/deleteAll", (req, res) => {
  Person.remove({ name: "Mary" })
    .then((Person) => res.send(Person))
    .catch((err) => console.log(err));
});

//Chain Search Query Helpers to Narrow Search Results
// @ Api : localhost:8000/persons/search/favouriteFood
router.get("/search/:favouriteFood", (req, res) => {
  Person.find({ favoriteFoods: req.params.favouriteFood })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: false })
    .exec()
    .then((Persons) => res.send(Persons))
    .catch((err) => console.log(err));
});

module.exports = router;