const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const slugify = require("slugify");
const ApiFeatures = require("../utils/apiFeatures");

const getAll = (Model , key) => asyncHandler(async (req, res) => {
    const filter = req.filterObj || {};
    const documentsCount = await Model.countDocuments(filter);
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
        .paginate(documentsCount)
        .filter()
        .search(key)
        .limitFields()
        .sort();
    let {mongooseQuery , pagination} = apiFeatures;
    const documents = await mongooseQuery;
    res.status(200).json({
        pagination,
        results: documents.length,
        data: documents,
    });
});

const getOne = (Model , populateOption) => asyncHandler(async(req , res , next) => {
    const {id} = req.params;
    let query = Model.findById(id);
    if(populateOption){
      query =  query.populate("reviews")
    }
    const document = await query;
    if(!document){
        return next(new ApiError(`No document for this id ${id}` , 404))
    }
    res.status(200).json({data : document})
})

const createOne = Model => asyncHandler(async (req , res) => {
    req.body.slug = slugify(req.body.title || req.body.name)
    const document = await Model.create(req.body)
    res.status(201).json({data : document});
})

const deleteOne = Model => asyncHandler(async (req , res , next) => {
    const {id} = req.params;
    const document = await Model.findByIdAndDelete(id);
    if(!document){
       return next(new ApiError(`No document for this id ${id}` , 404))
    }
    res.status(200).json({data : null})
})


const updateOne = Model => asyncHandler(async (req , res , next) => {
    const {id} = req.params;
    if(req.body.title || req.body.name){
        req.body.slug = slugify(req.body.title || req.body.name)
    }
    const document = await Model.findByIdAndUpdate(id , req.body , {new : true});
    if(!document){
      return  next(new ApiError(`No document for this id ${id}` , 404))
    }
    res.status(200).json({data : document})
})
module.exports = {getAll , getOne , createOne , deleteOne , updateOne};