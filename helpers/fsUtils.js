const fs = require('fs');
const util = require('util');

//promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// const readFile = (file) => {
//     fs.readFile(file,'utf8'), (err,data) =>{
//         if (err){
//             console.error(err);
//         }
//         else {
//             return data;
//         }
//     }
// };

const readAndAppend = (content,file)=> {
    fs.readFile(file,'utf8',(err,data)=> {
        if (err){
            console.err(err);
        }
        else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content)=>
    fs.writeFile(destination, JSON.stringify(content,null,4),(err)=>
        err? console.log(err): console.info(`\n Data written to ${destination}`)
    );

module.exports = {readFromFile,writeToFile, readAndAppend};