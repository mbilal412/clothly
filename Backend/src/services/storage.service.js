import ImageKit from '@imagekit/nodejs';
import { config } from "dotenv";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY, 
});

export const uploadImage = async ({buffer, fileName, folder = 'clothly'}) => {
    const result = await client.files.upload({
        file: await ImageKit.toFile(buffer), // Buffer of the file
        fileName: fileName, // Original name of the file
        folder // Folder where the file will be uploaded
    });
    return result;
};
