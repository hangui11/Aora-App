import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoints: 'https://cloud.appwrite.io/v1',
    plataform: 'com.jsm.aora',
    projectId: '668ba624000d941cf784',
    databaseId: '668bb2f9001b129eba2b',
    userCollectionId: '668bb323002ddd508618',
    videoCollectionId: '668bb33c00205527c0a0',
    storageId: '668bb9ed0033e29728e2'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoints) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.plataform) // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (! newAccount) throw Error
        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId, 
            appwriteConfig.userCollectionId, 
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser

    } catch(error) {
        console.log(error)
        throw new Error(error)
    } 
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(error)
    } 
}
