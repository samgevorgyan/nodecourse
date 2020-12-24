import * as mongodb from 'mongodb';
const { MongoClient, ObjectId } = mongodb;

export const maked = () => {
  const dbName = 'test1';
  // const uri = `mongodb+srv://myfirstcluster:myfirstcluster@cluster0.bp49u.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  const uri = `mongodb://localhost:27017`;
  MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      console.log('error from db', error);
    } else {
      console.log('success from db aper');
    }

    const db = client.db(dbName);

    client.close();
  });
};
