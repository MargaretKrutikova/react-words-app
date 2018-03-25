import { createApolloFetch } from 'apollo-fetch';

const uri = 'http://localhost:4000/graphql';
const apolloFetch = createApolloFetch({ uri });

apolloFetch.useAfter(({ response }, next) => {
  if (!response.ok) {
    const { status, statusText, parsed } = response;
    
    const { errors = [] } = parsed;
    const errorMessage = errors.map((e) => e.message).join(', ');

    console.error(`Request failed for ${response.url}, status: ${status} - ${statusText}, errors: ${errorMessage}`);

    const error = new Error(statusText);
    error.detailedErrors = errors;
    
    response.parsed = { error };
  }

  next();
});

const apolloFetchWrapper = (args) => {
  return apolloFetch(args)
    .then(
      ({ data, error }) => (error ? Promise.reject(error) : data), 
      (error) => Promise.reject(error)
    );
};

export default apolloFetchWrapper;