class APIFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        let keyword = this.queryStr.keyword ?{
            name:{
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        }: {};

        this.query.find({...keyword})
        return this;
    }

    filter(){
        const queryStrCopy = { ...this.queryStr };
       

        //removing fields from query
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach( field => delete queryStrCopy[field]);

        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        

       let queryObj = JSON.parse(queryStr);
        
        // Transform price[$gt] format to MongoDB nested format
        const transformedQuery = {};
        
        Object.keys(queryObj).forEach(key => {
            if (key.includes('[$')) {
                // Extract field name and operator (e.g., "price[$gt]" -> field: "price", operator: "$gt")
                const match = key.match(/^(\w+)\[\$(\w+)\]$/);
                if (match) {
                    const field = match[1];
                    const operator = `$${match[2]}`;
                    
                    if (!transformedQuery[field]) {
                        transformedQuery[field] = {};
                    }
                    
                    // Convert string values to numbers for numeric fields
                    const value = isNaN(queryObj[key]) ? queryObj[key] : Number(queryObj[key]);
                    transformedQuery[field][operator] = value;
                }
            } else {
                transformedQuery[key] = queryObj[key];
            }
        });
        
        console.log('Transformed query object:', transformedQuery);
        
        this.query = this.query.find(transformedQuery);
        

        return this;
    }

    paginate(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query.limit(resPerPage).skip(skip);
        return this;

    }
}

module.exports = APIFeatures;