import { GetServerSidePropsContext } from "next";
import { getSession } from 'next-auth/react';
import User from "../../models/User";
import db from "../../utilsServer/dbConnect";


function withUserAuth(getServerSidePropsFunction:any) {
    return async (context:GetServerSidePropsContext) => {
        try{
            const session = await getSession({req:context.req});
        if(!session){
            return {
                redirect:{
                    destination:"/login",
                    permanent:false,
                }
            }
        }
        await db.connect();
        const {password, __v, ...user} = await User.findById(session.user._id).lean();
        await db.disconnect();
        return await getServerSidePropsFunction(context, user, null);
        }catch(error){
            const errorCode = 500;
            return await getServerSidePropsFunction(context, null, errorCode);
        }
        
    };
  }

export default withUserAuth;
