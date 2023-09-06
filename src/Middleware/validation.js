
const dataMethod = ['body', 'query', 'params'];

const validation = (schema) => {

    return (req, res, next) => {

        const validationArray = [];

        dataMethod.forEach(key=>{
            if(schema[key]){

                const validationResult = schema[key].validate(req[key], {aboartEarly:false});
              
                if(validationResult.error){
                    validationArray.push(validationResult.error.details);
                }
            }
                })

                if(validationArray.length>0){
                    return res.json({message:"validation error", error:validationArray});
                }else{
                    next();
                }
}

}

export default validation;