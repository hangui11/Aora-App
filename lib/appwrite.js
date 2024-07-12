import { Alert } from 'react-native';
import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

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
const storage = new Storage(client)

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

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(error)
    } 
}

export const logOut = async() => {
    try {
        const session = await account.deleteSession('current')
        return session
    } catch (error) {
        Alert.alert('Log Out', error.message)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (! currentAccount) throw Error

        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal('accountId', currentAccount.$id)])
        if (! currentUser) throw Error
        return currentUser.documents[0] 
    } catch (error) {
        console.log(error)
    }

}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return posts.documents
    } catch (error) {
        Alert.alert('Error', error.message)
        throw new Error(error)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            // This orders the documents by their creation timestamp in descending order
            // This means the most recently created documents will come first
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return posts.documents
    } catch (error) {
        Alert.alert('Error', error.message)
        throw new Error(error)
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            // Search the title that contain query value
            [Query.search('title', query)]
        )
        
        return posts.documents
    } catch (error) {
        Alert.alert('Error', error.message)
        throw new Error(error)
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            // Search the title that contain query value
            [Query.equal('creator', userId)]
        )
        // console.log(userId)
        return posts.documents
    } catch (error) {
        Alert.alert('Error', error.message)
        throw new Error(error)
    }
}

const getFilePreview = async(fileId, type) => {
    let fileUrl
    try {
        if( type === 'video') {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId)
        }
        else if (type === 'image') {
            fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100)
        }
        else {
            throw new Error('Invalid file type')
        }
        if (!fileUrl) throw Error
        console.log(fileUrl)
        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}

export const uploadFile = async(file, type) => {
    if (!file) return

    const {mimeType, ...rest} = file
    const asset = {type: mimeType, ...rest}

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        );
        const fileUrl = await getFilePreview(uploadedFile.$id, type)
        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}

export const createVideo = async (form) => {

    try {
        // Doing at the same time, do not have dependency
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId, 
            appwriteConfig.videoCollectionId, 
            ID.unique(),
            {
                
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )

        return newPost

    } catch(error) {
        console.log(error)
        throw new Error(error)
    } 

}