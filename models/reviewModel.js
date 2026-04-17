const mongoose = require('mongoose');
const Product = require('./productModel');

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    ratings: {
      type: Number,
      min: [1, 'Min ratings value is 1.0'],
      max: [5, 'Max ratings value is 5.0'],
      required: [true, 'review ratings required'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to user'],
    },
    // parent reference (one to many)
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to product'],
    },
  },
  { timestamps: true }
);


reviewSchema.statics.calcAvgRatingAndQuantity = async function(productId)  {
    const result = await this.aggregate([
        {
            $match: { product: productId }
        },
        {
            $group : {
                _id : "$product",
                avgRating : {$avg : "$ratings"},
                quantityRating : {$sum : 1}    
            }
        }
    ])

    if(result.length > 0){
         await Product.findByIdAndUpdate(productId , {
            ratingAvrage : result[0].avgRating,
            ratingQuantity : result[0].quantityRating
        })
    }
}

reviewSchema.post("save" , function(){
    this.constructor.calcAvgRatingAndQuantity(this.product)
})
reviewSchema.post("init" , function(){
    this.constructor.calcAvgRatingAndQuantity(this.product)
})

reviewSchema.pre(/^find/, function () {
  this.populate({ path: 'user', select: 'name' });
});




module.exports = mongoose.model('Review', reviewSchema);