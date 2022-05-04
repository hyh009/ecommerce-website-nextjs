import { GetServerSidePropsContext } from "next";
import { getSession } from 'next-auth/react';


function withUserAuth(getServerSidePropsFunction:any) {
    return async (context:GetServerSidePropsContext) => {
        const session = await getSession({req:context.req});
        if(!session){
            return {
                redirect:{
                    destination:"/login",
                    permanent:false,
                }
            }
        }
        return {
            props:{session}
        }
    };
  }

export default withUserAuth;
  