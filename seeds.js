var mongoose = require("mongoose");
var Vacationhome = require("./models/vacationhome");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah"
    },
    {
        name: "Granite Hill", 
        image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    }
]

async function seedDBasync() {
    try { await Vacationhome.deleteMany({}) } catch (e) { console.log(e); };
    data.forEach(async function (seed) {
        try {
            const vacationhome = await Vacationhome.create(seed);
            const comment = await Comment.create({ text: 'This place is great but i wish there was wifi', author: 'Homer' });
            vacationhome.comments.push(comment);
            await vacationhome.save();
        } catch (e) { console.log(e); }
    });
};
 
module.exports = seedDBasync;