import mongoose from "mongoose";

interface connection {
    isConnected:null|number
}
// to track connection
const connection:connection = {isConnected:null};

const connect = async ()=>{
    // check if DB connected
    // 0 => disconnected; 1 => connected; 2 => connecting; 3 => disconnecting 
    if(connection.isConnected){
        console.log("DB already connected");
        return;
    }
    if(mongoose.connections.length>0){
        connection.isConnected = mongoose.connections[0].readyState;
        if(connection.isConnected===1){
            console.log("use previous connection");
            return;
        }
        await mongoose.disconnect();
    }

    const db = await mongoose.connect(process.env.MONGODB_URI as string);
    connection.isConnected = db.connections[0].readyState;
    console.log("new connection");
}

const disconnect = async()=>{
    if(connection.isConnected){
        if(process.env.NODE_ENV === "production"){
            await mongoose.disconnect();
            connection.isConnected = null;
        }else{
            console.log("not connected")
        }
    }
}

const db = { connect, disconnect };
export default db;


