const { express } = require("express");

class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr; 
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                //regex->regular expression
                $regex:this.queryStr.keyword,

                //options :"i"->case insensitive
                $options:"i",

            },
        }:{};

        console.log("api featrue ke keyword",keyword);

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){


        //isme category ke basis pr hm filter krte hai products ko 

        // or ye case sensitve hai

        //queryStr ek object hai

        //javascript me jitne bhi object h wo through refrence pass hote hai aise krenge to refrence mil jayega or jo change hm queryCopy me krenge wo qurystr me bhi ho jayega to iss se bachne ke liye hm spred operator ka use krenge
        // const queryCopy = this.queryStr;-?ise use nahi krenge

        //now iski copy ban chuki hai
        const queryCopy = {...this.queryStr}

        // console.log("this is queryStr before removing fields",queryCopy)

        //Removing some fields for category
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCopy[key]);


        //Filter For Price and raitng
        // queryCopy(object)->queryCopy(string)
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key) =>`$${key}`);

        // this.query  -> means product.find() method hai ye

        //queryCopy khud hi ek object h to isse object ke andr likhne ki jrurt nahi hai
        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        //
        const skip = resultPerPage * (currentPage-1)
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;