const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
  './user.proto',
  { keepCase: true }
);
const package = grpc.loadPackageDefinition(packageDefinition);

const service = new package.user.UserService(
  '0.0.0.0:50051',
  grpc.credentials.createInsecure()
);

service.GetUser(
  {
    username: 'User',
    password: 'Sample'
  },
  (error, response) => {
    console.log(error, response);
  }
);
