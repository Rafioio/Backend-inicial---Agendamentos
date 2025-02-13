const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;


const ProfessorSchema = new Schema({
    email : {
        type: String,
        unique: true,
    },
    senha : String,
    nome : {
        type: String,
        select: false,
    },
    cargo : String,
    status : String
})

ProfessorSchema.pre("save", async function(next) {
    const user = this

    if(user.isModified("senha")) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.senha, salt);

        user.senha = hash;

        console.log({ salt, hash });

    }
    
    next()
})

const ProfessorModel = mongoose.model('professores', ProfessorSchema);

module.exports = ProfessorModel;