import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import checkSession from "../../../components/checkSession";
import { string } from "yargs";

const prisma = new PrismaClient();

async function main() {
    try {
      await prisma.$connect();
    } catch (err) {
      return "err";
    }
    
  }

  
//ブログの全記事取得用API
export const GET = async (req: Request, res: NextResponse) => {
    try {
      const user_id: string = req.url.split("/api/lover/")[1]; //ID取得
      await main();
      if (!user_id) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      const profile = await prisma.profiles.findUnique({  where: { id:user_id  } });
      
      if(profile){
        const lover_id = profile.lover_id;
        if (!lover_id) {
          const lover=null;
           return NextResponse.json({ message: "Success", profile,lover }, { status: 200 });
        }
        const lover_profile = await prisma.profiles.findUnique({  where: { id:lover_id  } });

      }
      return NextResponse.json({ message: "Success", profile }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: "Error"+JSON.stringify(err) }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };
 
  