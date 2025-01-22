import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { date } from "zod";

export async function uploadImage(file: File | null | undefined, path: string): Promise<string> {
    if (!file) return '';

    // Get the file's MIME type
    const fileExtension = file.name?.split('.').pop()?.toLowerCase();
    const mimeType = getMimeType(fileExtension);
    
    try {
        const storage = getStorage();
        const storageRef = ref(storage, `${path}-${new Date().getTime()}`);

        // console.log('Uploading file:', file);
        // console.log('mime type:', mimeType);
        // console.log('file type:', file.type);

    
        // Upload the file to Firebase Storage
        await uploadBytes(storageRef, file, {
            contentType: mimeType,
        });
    
        // Retrieve and return the download URL
        return await getDownloadURL(storageRef);
    }
    catch (error) {
        console.error('Image upload failed:', error);
        throw new Error('Failed to upload image');
    }
}

export async function uploadImages(files: (File | null | undefined)[], basePath: string): Promise<string[]> {
    return Promise.all(
        files.map((file, index) => {
            const extractedFile = file instanceof FileList ? file[0] : file;
            // console.log('extractedFile:', extractedFile);
            return uploadImage(extractedFile, `${basePath}/${index}`);
        })
    );
}

export async function uploadTravelerImages(travelers: any[], basePath: string) {
    return Promise.all(
        travelers.map(async (traveler) => {
            // Handle arrays of images for both personal and passport photos
            const personalPhotoUrls = await uploadImages(
                Array.isArray(traveler.personalPhoto) ? traveler.personalPhoto : [traveler.personalPhoto],
                `${basePath}/${traveler.passportNumber}/personalPhotos`
            );

            const passportPhotoUrls = await uploadImages(
                Array.isArray(traveler.passportPhoto) ? traveler.passportPhoto : [traveler.passportPhoto],
                `${basePath}/${traveler.passportNumber}/passportPhotos`
            );
            
            return {
                ...traveler,
                personalPhoto: personalPhotoUrls[0],
                passportPhoto: passportPhotoUrls[0],
            };
        })
    );
}

// Helper function to map file extensions to MIME types
function getMimeType(extension: string | undefined): string {
    switch (extension) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'gif':
            return 'image/gif';
        case 'bmp':
            return 'image/bmp';
        case 'webp':
            return 'image/webp';
        default:
            return 'application/octet-stream'; // Fallback to generic binary data
    }
}
