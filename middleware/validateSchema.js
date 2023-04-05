const validateSchema = (schema) => {

    return (req, res, next) => {

        let { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

        if (error) {
            /* 
                errors = [ 
                    {
                        name : "required"
                    },
                    {
                        email :"invalid email"
                    }
                 ]
                 
                errors = [ 
                    {
                        params: "name",
                        "message" :required"
                    },
                 ]
            
            */

            let errors = error.details.map(validation_error => {
                return {
                    params: validation_error.context.key,
                    message: validation_error.message
                }
            })

            return res.status(400).send({
                msg: "Bad requrest",
                errors
            })
        } else {
            next()
        }

    }

}

module.exports = validateSchema