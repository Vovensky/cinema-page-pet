const fs = require('fs');
const path = require('path')

module.exports =
{

    writeFileAsync: async(path, data) => {
    return new Promise((resolve, reject) => 
        fs.writeFile(path, data, (err) => {
            if(err) {
                return reject(err.message)
            }
                resolve()
        }))
    },

    readFileAsync: async(path) => {
    return new Promise((resolve, reject) => 
        fs.readFile(path, {endcoding: 'UTF-8'}, (err, data) => {
            if(err) {
                return reject(err.message)
            }
                resolve(data)
        }))
    },

    appendFileAsync: async(path,data) => {
    return new Promise((resolve, reject) => 
        fs.appendFile(path, data, (err) => {
            if(err) {
                return reject(err.message)
            }
                resolve(data)
        }))
    },

    readDataAsync: async(path) => {
        return new Promise((resolve, reject) => 
            fs.readFile(path, {endcoding: 'UTF-8'}, (err, data) => {
                if(err) {
                    fs.writeFile(path, "", (error) => {
                        if(error) {
                        console.log(`ошибка ${error}`)
                        return reject(error)
                        }
                        resolve()
                    })
                }
                resolve(data)
            }))
    },

    // writeCommentsAsync: async(path) => {
    //     return new Promise( (resolve, reject) => {

    //     })
    // },
}