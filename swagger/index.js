
const init_swagger = (app) => {
    const expressSwagger = require('express-swagger-generator')(app);

    let options = {
        explorer: true,
        swaggerDefinition: {
            info: {
                description: 'RESFULL API',
                title: 'RESFULL API',
                version: '1.0',
            },
            host: "localhost:5000",
            basePath: '/api',
            produces: [
                "application/json",
                "application/xml"
            ],
            schemes: ['http', 'https'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'headers',
                    name: 'authorization',
                    description: ""
                }
            }
        },
        basedir: __dirname,
        files: [
            '../routes/executiveBoard.js',
            '../routes/factory.js',
            '../routes/stock.js',
            '../routes/product.js',
            '../routes/agency.js',
            '../routes/insurance.js',
            '../routes/customer.js'
        ]
    };
    expressSwagger(options);
};

module.exports = init_swagger;