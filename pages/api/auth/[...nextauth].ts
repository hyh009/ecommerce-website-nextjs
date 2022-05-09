import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import db from "../../../utilsServer/dbConnect";
import User,{IUserDocument} from "../../../models/User";

export default NextAuth({
    session:{
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 3
    },
    secret:process.env.JWT_SECRET,
    providers:[
       CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { placeholder: "email" },
            password: { placeholder: "密碼" }
          },
        async authorize(credentials){
            await db.connect();
            if(credentials?.email){
                const userDocument:IUserDocument|null = await User.findOne({email:credentials.email});

            if(!userDocument){
                throw new Error("email未註冊或密碼不正確");
            }
            
            if(credentials?.password ){
                const isMatch = await userDocument.comparePassword(credentials.password);
                if(isMatch){
                    await db.disconnect();
                    // value to retrun 
                    const user = { image:userDocument.profilePicUrl, 
                                   email:userDocument.email, 
                                   name:userDocument.name,
                                   _id:userDocument._id }
                    return user;   
                }else{
                    await db.disconnect();
                    throw new Error("email未註冊或密碼不正確");
                }
            }
            }

            throw new Error("請完整輸入Email & 密碼")
        }
       })
    ],
    // to add _id in session 
    callbacks:{
        jwt:({token,user})=>{
            if(user){
                token._id = user._id;
            }
            return token;
        },
        session:({session,token})=>{
            if(token){
                session.user._id = token._id as string;
            }
            return session;
        }
    },
});