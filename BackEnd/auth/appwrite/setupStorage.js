
require("dotenv").config();

const sdk = require("node-appwrite");

const { Permission, Role } = sdk;

const client = new sdk.Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const storage = new sdk.Storage(client);

const BUCKET_ID = "listing-images";

// check if bucket exists
async function bucketExists() {
    try {
        await storage.getBucket({
            bucketId: BUCKET_ID
        });

        return true;
    } catch (error) {
        if (error.code === 404) {
            return false;
        }

        throw error;
    }
}

async function setupBucket() {
    const exists = await bucketExists();

    if (exists) {
        console.log("Bucket already exists");
        return;
    }

    await storage.createBucket({
        bucketId: BUCKET_ID,
        name: "Listing Images",
        permissions: [
            Permission.read(Role.users()),
            Permission.create(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users())
        ],
        fileSecurity: false,
        enabled: true,
        maximumFileSize: 5000000,
        allowedFileExtensions: ["jpg", "jpeg", "png", "webp"],
        compression: "gzip",
        encryption: true,
        antivirus: true,
        transformations: true
    });

    console.log("Created listing-images bucket");
}

setupBucket().catch((error) => {
    console.error(error);
    process.exit(1);
});

