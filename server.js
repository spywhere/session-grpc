const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
  './user.proto',
  { keepCase: true }
);
const package = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

function GetUser(call, callback) {
  const {
    username: first_name,
    password: last_name
  } = call.request;

  callback(null, {
    first_name,
    last_name
  });
}

server.addService(
  package.user.UserService.service,
  {
    GetUser
  }
);

server.bindAsync(
  '0.0.0.0:50051',
  grpc.credentials.createInsecure(),
  (error, port) => {
    console.log(`listen on port ${port}`);

    server.start();
  }
)
