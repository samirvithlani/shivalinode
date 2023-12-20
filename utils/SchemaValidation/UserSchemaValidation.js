const zod = require('zod');

const userSchemaValidation = zod.object({

    body: zod.object({
        name: zod.string().min(3).max(50),
        email: zod.string().email(),
        password: zod.string().min(6).max(50),
        role: zod.string().min(3).max(50),
        permissions: zod.array(zod.string()).min(1).max(50)
    })
})
module.exports = userSchemaValidation;