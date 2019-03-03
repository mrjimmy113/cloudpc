const { Storage } = require('@google-cloud/storage');

const projectId = 'sampleproject-230303';

const storage = new Storage({
  projectId: projectId,
  

});

const bucketName = 'mypcbucket';
const bucket = storage.bucket(bucketName);

var option = {
  public: true,
  contentType: 'auto',
}
let upload = (image) => {
  return new Promise((resolve, reject) => {
    let file = bucket.file(image.name)
    let imageURL = `https://storage.googleapis.com/${bucketName}/${image.name}`;
    file.save(image.data, option,(err) => {
      if(err) {
        reject(err);
      }
    })
    resolve(imageURL);
  })
}
exports.upload = upload;



