// import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

// const getSecretKey = async () => {
//     const client = new SecretManagerServiceClient();
//     const projectId = 'todoapp-379720';
//     const secretName = 'my-token';
    
//     const [version] = await client.accessSecretVersion({
//             name: `projects/${projectId}/secrets/${secretName}/versions/latest`,
//     });

//     const secretValue = version.payload.data.toString();
//     console.log(`My secret value is: ${secretValue}`);

// }

// getSecretKey().catch(console.error);
     
// export default getSecretKey