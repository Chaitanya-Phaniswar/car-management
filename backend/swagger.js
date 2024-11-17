const swaggerAutogen = require("swagger-autogen")();
const doc = {
  info: {
    title: "Car Management API",
    description: "API documentation for Car Management Application",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json"; // Output file for Swagger documentation
const endpointsFiles = ["./index.js"]; // File where your routes are defined

swaggerAutogen(outputFile, endpointsFiles, doc);
