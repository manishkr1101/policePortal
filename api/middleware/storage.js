const googleStorage = require('@google-cloud/storage');

const storage = new googleStorage.Storage({
    projectId: "hackathon-2a76f",
    keyFilename: './api-key-file.json'
})

const bucket = storage.bucket('gs://hackathon-2a76f.appspot.com')


module.exports = {
    uploadFile: async function(srcFilePath, destFilePath, mime){
        const response = await bucket.upload(srcFilePath,{
            destination: destFilePath,
            metadata: {
                'contentType': mime,
                name: destFilePath
            }
        })

        const metadata = response[0].metadata;
        return {
            url: metadata.name,
            type: metadata.contentType,
            timeCreated: metadata.timeCreated
        };

        // {
        //     "kind": "storage#object",
        //     "id": "hackathon-2a76f.appspot.com/criminal/WhatsApp Image 2020-01-07 at 11.34.41 PM.jpeg/1578515022303526",
        //     "selfLink": "https://www.googleapis.com/storage/v1/b/hackathon-2a76f.appspot.com/o/criminal%2FWhatsApp%20Image%202020-01-07%20at%2011.34.41%20PM.jpeg",
        //     "name": "criminal/WhatsApp Image 2020-01-07 at 11.34.41 PM.jpeg",
        //     "bucket": "hackathon-2a76f.appspot.com",
        //     "generation": "1578515022303526",
        //     "metageneration": "1",
        //     "contentType": "image/jpeg",
        //     "timeCreated": "2020-01-08T20:23:42.303Z",
        //     "updated": "2020-01-08T20:23:42.303Z",
        //     "storageClass": "STANDARD",
        //     "timeStorageClassUpdated": "2020-01-08T20:23:42.303Z",
        //     "size": "148212",
        //     "md5Hash": "R0DPmstRbir75+2qnd6rSQ==",
        //     "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/hackathon-2a76f.appspot.com/o/criminal%2FWhatsApp%20Image%202020-01-07%20at%2011.34.41%20PM.jpeg?generation=1578515022303526&alt=media",
        //     "crc32c": "x4x80w==",
        //     "etag": "CKaitdnq9OYCEAE="
        //     }
        
    },
    getSignedUrl: async function(file, min=60){
        const signedUrl = await bucket.file(file).getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + min*60*1000
        });
        return signedUrl[0];
    },
    downloadFile: async function(srcFilePath, destFilePath){
        await bucket.file(srcFilePath).download({
            destination: destFilePath
        })
        return {
            message: 'Download Successful',
            destFilePath: destFilePath
        }
    }
}