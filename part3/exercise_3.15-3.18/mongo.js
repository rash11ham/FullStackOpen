const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@cluster0.ouhzd.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person(
  {
    name: process.argv[3],
    phone: process.argv[4]
  }
);




if (process.argv.length == 3) {
    Person.find({}).then((persons) => {
        console.log("phonebook:");
        persons.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
} else {
    person.save().then((result) => {
        console.log(`added ${person.name} ${person.number} to phonebook`);
        mongoose.connection.close();
    });
}
