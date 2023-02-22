import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: 'dtufeddeg',
    api_key: '287739869587325',
    api_secret: 'C5WFKqWyA61MWA7IL9bRDy-xNxQ',

})
export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'post'
    })
}

export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)
}
