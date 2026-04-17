const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true , "product title is required"],
        trim : true,
        minLength : [3 , 'Too short product title'],
        maxLength : [100 , 'Too long product title'],
    },
    slug : {
        type : String,
        required : true,
        lowercase : true
    },
    description : {
        type : String,
        required : [true , "product description is required"],
        minLength : [20 , 'Too short product description'],
    },
    quantity : {
        type : Number,
        required : [true , "product quantity is required"]
    },
    sold : {
        type : Number,
        default : 0,
    },
    price : {
        type : Number,
        required : [true , "product price is required"],
        max: [100000, "Price too high"]
    },
    priceAfterDiscount : {
        type : Number
    },
    colors : [String],
    imageCover : {
        type : String,
        required : [true , "product image cover is required"],
    },
    images : [String],
    category : {
        type : mongoose.Schema.ObjectId,
        ref : "Category",
        required : true
    },
    subCategories : [
        {
        type : mongoose.Schema.ObjectId,
        ref : "SubCategory",
        }
    ],
    brand : {
        type : mongoose.Schema.ObjectId,
        ref : "Brand",
    },
    ratingAvrage : {
        type : Number,
        min : [1 , "Rating must be above or equal 1.0"],
        max : [5 , "Rating must be below or equal 5.0"]
    },
    ratingQuantity : {
        type : Number,
        default : 0
    }
},  {
    timestamps : true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

productSchema.virtual("reviews" , {
    ref : "Review",
    localField : "_id" ,
    foreignField : "product"
})

const setImage = doc => {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageUrl;
}

const setImages = doc => {
    const images = doc.images.map(image => `${process.env.BASE_URL}/products/${image}`);
    doc.images = images;
}

productSchema.post("init" , doc => {
    if(doc.imageCover){
        setImage(doc)
    }
})
productSchema.post("save" , doc => {
    if(doc.imageCover){
        setImage(doc)
    }
})

productSchema.post("init" , doc => {
    if(doc.images){
        setImages(doc)
    }
})
productSchema.post("save" , doc => {
    if(doc.images){
        setImages(doc)
    }
})

productSchema.pre(/^find/, function () {
    this.populate({
        path: "category",
        select: "name"
    });
});

module.exports = mongoose.model("Product" , productSchema); 