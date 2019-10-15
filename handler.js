const slsinfo = require('fs').readFileSync('./.slsinfo', 'utf8');

module.exports.hello = async (event) => {
  console.log(event);
  
  const responseHeaders = {
    'Access-Control-Allow-Origin': 'https://www.uship.com',
    'Access-Control-Allow-Credentials': true,
    'x-custom-header': 'My Header Value'
  };

  const output = 'functionPrefix';
  const prefix = slsinfo.match(new RegExp('('+output+': )((.?)+)(\\n)'))[2];
  console.log(`The prefix is ${prefix}`);

  return {
    statusCode: 201,
    headers: responseHeaders,
    body: JSON.stringify({ message: prefix }),
  };
};

module.exports.confirm = (event, context, callback) => {
    console.log("The event params are");
    console.log(event);
    // Set the user pool autoConfirmUser flag after validating the email domain
    event.response.autoConfirmUser = false;

    // Split the email address so we can compare domains
    var address = event.request.userAttributes.email.split("@")
    
    // This example uses a custom attribute "custom:domain"
    if (event.request.userAttributes.hasOwnProperty("custom:domain")) {
        if ( event.request.userAttributes['custom:domain'] === address[1]) {
            event.response.autoConfirmUser = true;
        }
    }

    // Return to Amazon Cognito
    callback(null, event);
};

module.exports.healthcheck = (event) => {
  // console.log(`The env is ${process.env.STAGE}`);

  const output = 'functionPrefix';
  const prefix = slsinfo.match(new RegExp('('+output+': )((.?)+)(\\n)'))[2];
  console.log(`The prefix is ${prefix}`);
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: prefix }),
  };
};