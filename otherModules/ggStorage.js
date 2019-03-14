const { Storage } = require('@google-cloud/storage');

const projectId = 'sampleproject-230303';

const storage = new Storage({
  projectId: projectId,
  credentials: {
    "type": "service_account",
    "project_id": "sampleproject-230303",
    "private_key_id": "9138cb50915561f986fe505a706661010572e298",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDZtIKaDUoS1X+L\nZEnCyX0UsOwVzk5ob8zkvQxzDhruxJ6YQBvY7+SGNpaIQiVwrCjY4UR2KksFo9Kx\nzLjCTeh7c/kpCrSiViCubJNf/0bJjZ3kWZaXEc/DgWyHpbRos4lWnRCMc8HBdotA\npqz2S57xizrP1/GAOY49RblEmFSWWxJoZOBPhDHwvTDNW39bi2zLhzfsVVagTgEF\nzZW4Up/Dmo70SjhQVEHNFInwgC3CerZCzqePsg8aj4lsu1ziU1ijyvXvUByIegmF\nbykm0vl3v8BSCikW/s25QChRhVtHax6emZHo4YQzQ4VWpJXpwNcBAFBFuTHJeypX\nZSr+/E89AgMBAAECggEAH7r/jhSBx1z2ygpD9fAIGwvuXP9EzlP9ORmUxvA3XLWr\np+UwKd5NIIK0TgfWDSYKjhHHOLHRXXETNHbyNt/EErpEhobY7RBAkyugD03Vs2rA\nqJemKz6dWZFzkBHGybvhOI6L6uy0QM5WXYXtj7hV4j64w7JlsJqy8JtI9YZ+TauT\nmPBOrkOVAXOvpQvJbIvfLFleTOqecgjV8+LWS8LMC8iza3hfIQfdsdmhZBUya12J\nLzlqm0pmsviT3gQemNHzajJJkIg8VvmMlS8Q0RkUiNbSzoABZNDw1HJC83RJl9uR\nOkNIUFOET8d1rYWus2lKy77rLHRcsdw3pKdAaycWwQKBgQDzxK61NiDsC3srr/U6\nf/QQQCr4yGVaXvx8dLghoRlUIb6uchxG7I0ESWPmxhkyuGKYB7REXRgzDIcOgRyx\nAM+gp/hCmvVjEk8Hvh0soqZBAv1I0NLw1YfAfrtiuS10mWjh7oltgKrFf8Wwiwof\n/ghuW8f/GV2o1RQeDwYdCqqN7wKBgQDkoQi5gKunh4tRNYkLLH6a7i/LMWubbwGL\ng/vheZtIqype5Vj3/62LufPfsHGG0RBHDgIcUVdXMaTQE7bGjJhnCq241Bd8Ka6O\ndmRDscrM/NEpv1FhStYYqX9tiSQYGKTxD5ElKwFytptF3iqkatzn3f3QOanDGy96\nCO/bSk8hkwKBgE96uVvsIh/UPnyoClTgkzsZMOmcrS8h+UC67a5JUHDV784A9qdJ\nSVE0fJYp0N1wsPTQzj3b/J/oXcCk6C3uDcRb/933mDqNJadonSqIfZyE1QCA1cYg\nWPqyV3aA2glCW6gOllBVu1hZqKM/MjXsJeOVmUfbhWYe00hZrayaZbGRAoGAQ+Bv\nV6uUytMaEI0lV7TpDZRDij7s5KOrQMF5iXJyILv4g13x8QbufjpB5hpbShxNidrl\n04RuustZVBFWRVI+ePEZrHMDWfCCC3eowtRJElzIuG09evYd5AqGc32wwpqmdY8a\nl39SGb2PEcoovNGhLhGhJi3Icc1jZga7N06zeZMCgYBOVjvRfh46FKo+zlNsvRXt\ncNo52FqHq4FjDabLk3lywNJoptcjI65bRpDx8YykBwjMywS1iV+9RKxZQyYohYMd\n1a2/Omw9J2z8QNKXEIucS8iNWtM8lUfMwafcEj8id5r0HFWvw4zXQhWX/ei9E18I\nZrq0ClUAcw6J0qmf86qWog==\n-----END PRIVATE KEY-----\n",
    "client_email": "sampleproject-230303@appspot.gserviceaccount.com",
    "client_id": "106358714968080064379",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/sampleproject-230303%40appspot.gserviceaccount.com"
  },

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

exports.deleteImage = (name) => {
  let file = bucket.file(name);
  file.delete(function(err, apiResponse) {});
}



