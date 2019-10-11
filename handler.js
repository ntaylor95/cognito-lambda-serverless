module.exports.hello = async (event) => {
  console.log(event);
  
  const responseHeaders = {
    'Access-Control-Allow-Origin': 'https://www.uship.com',
    'Access-Control-Allow-Credentials': true,
    'x-custom-header': 'My Header Value'
  };

  return {
    statusCode: 201,
    headers: responseHeaders,
    body: JSON.stringify({ message: 'Hello World!' }),
  };
};

module.exports.confirm = (event, context, callback) => {
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