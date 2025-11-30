import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Productos',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: [
        './src/routes/appRoutes.ts'
    ]
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    body {
      background-color: #f3f6fb !important;
      font-family: "Segoe UI", sans-serif !important;
    }

    .topbar {
      background-color: #0078d4 !important;
      padding: 10px 20px !important;
    }

    .topbar-wrapper img {
      display: none !important;
    }

    .topbar-wrapper .link::after {
      content: "API Documentation" !important;
      font-size: 20px;
      font-weight: 600;
      color: white !important;
    }

    .swagger-ui .opblock {
      border-radius: 8px !important;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08) !important;
      background: white !important;
    }

    .swagger-ui .btn.execute {
      background-color: #0078d4 !important;
      color: white !important;
      border-radius: 6px !important;
      font-weight: 600 !important;
    }
  `,
  customSiteTitle: 'Documentación REST API Express / TypeScript'
};




export default swaggerSpec;
export {
    swaggerUiOptions
}