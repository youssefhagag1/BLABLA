const mongoose = require("mongoose")
const brandSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "brand is required"],
        unique : [true , "brand must be unique"],
        minLength : [3 , "Too short brand name"],
        maxLength : [32 , "Too Long brand name"]
    },
    slug : {
        type : String,
        lowercase : true
    },
    image : String
} , {timestamps : true});


const setImageUrl = (doc) => {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
}


brandSchema.post("init" , (doc) => {
    if(doc.image){
        setImageUrl(doc);
    }
})
brandSchema.post("save" , (doc) => {
    if(doc.image){
        setImageUrl(doc);
    }
})


module.exports =  mongoose.model("Brand" , brandSchema)