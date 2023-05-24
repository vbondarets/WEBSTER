const { unlink } = require('fs/promises')

const removeFile = async (path) => {
    try {
        await unlink(path);
    } catch (error) {
        console.log('Error: ', error.message)
    }
}
module.exports = removeFile