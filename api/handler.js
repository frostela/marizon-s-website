export const config = {
    runtime: 'edge', // Set this to `edge`
    regions: ['sin1', 'bom1'], // List of regions you want to deploy to
  };
  
  export default async function handler(req) {
    return new Response('Hello from Edge Function', {
      status: 200,
    });
  }
  