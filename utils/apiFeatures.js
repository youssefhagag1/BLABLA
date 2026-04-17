class ApiFeatures{
    constructor(mongooseQuery , queryString){
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }
    filter(){
        const queryObj = { ...this.queryString };

        const excludeFields = ["page", "limit", "skip", "sort", "fields" , "keyword"];
        excludeFields.forEach(field => delete queryObj[field]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        const parsedQuery = JSON.parse(queryStr);

        this.mongooseQuery = this.mongooseQuery.find(parsedQuery);
        return this;
    }

    sort(){
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort("-createdAt"); 
        }
        return this;
    }

    limitFields(){
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.select(fields);
        }else {
            this.mongooseQuery = this.mongooseQuery.select("-__v"); 
        }
        return this;
    }

    search(model){
        if(this.queryString.keyword){
            const query = {};
            if(model === "products"){
                query.$or = [
                    {title : {$regex : this.queryString.keyword , $options : "i"}},
                    {description : {$regex : this.queryString.keyword , $options : "i"}},
                ]
            }else{
                query.$or = [
                {name : {$regex : this.queryString.keyword , $options : "i"}},
            ]
            }
            this.mongooseQuery = this.mongooseQuery.find(query)
        }
        return this;
    }
    paginate(documentsCount){
        const page = +this.queryString.page || 1;
        const limit = +this.queryString.limit || 5;
        const skip = (page - 1) * limit;
        const pagination = {};
        const numberOfPages = Math.ceil(documentsCount / limit);
        pagination.numberOfPages = numberOfPages;
        if(skip > 0){
            const prev = page - 1;
            pagination.prev = prev;
        }
        if(page * limit < documentsCount){
            const next = page + 1;
            pagination.next = next;
        }
        pagination.current = page;
        pagination.limit = limit;
        this.pagination = pagination;
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        return this;
    }
}

module.exports = ApiFeatures