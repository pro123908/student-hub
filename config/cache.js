const mongoose = require('mongoose');
const redis = require('redis'); 

const redisURL = "redis://127.0.0.1:6379";
const client = redis.createClient(redisURL);

const util = require('util');
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(){
    this.useCache = true;
    return this;
}


mongoose.Query.prototype.exec = async function(){

    if(!this.useCache){
        console.log('SERVING FROM MONGODB'); 
        console.log(this.mongooseCollection.name);
        return exec.apply(this,arguments);
    }
    console.log('Query is about to run');
    // console.log(this.getQuery());
    // console.log(this.mongooseCollection.name);

   const key =  JSON.stringify(Object.assign({},this.getQuery(),{
        collection : this.mongooseCollection.name
    }))

    const cachedValue = await client.get(key);

    if(cachedValue){
        const doc = JSON.parse(cachedValue);
        console.log('SERVING FROM CACHE');
        console.log(doc);  
        // console.log(typeof doc);
      return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc)
    } 

    // console.log('key : ',key);
      

    const result = await exec.apply(this,arguments);

    client.set(key,JSON.stringify(result));
    console.log('SERVING FROM MONGODB');
    // console.log(JSON.stringify(result));
    return result;
}