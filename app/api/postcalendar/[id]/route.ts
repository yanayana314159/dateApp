import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

async function main() {
    try {
      await prisma.$connect();
    } catch (err) {
      return "err";
    }
    
  }


  //スケジュールの確認
  export const PUT = async (req: Request, res: NextResponse) => {
    try {
      const user_id: string = req.url.split("/api/postcalendar/")[1]; //ID取得
      const request = await req.json();
      const schedule = request.schedule;//スケジュールを取得
      await main(); //DB接続
      if (!user_id) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      else{
          await prisma.profiles.update({
            data: {
                schedule:schedule ,
            },
            where: {
              id: user_id,
            },      
          })
          return NextResponse.json({ message: "Success:スケジュールの送信に成功しました" }, { status: 200 });
          }
            
          }
    catch (err) {
      return NextResponse.json({ message: "Error"+JSON.stringify(err) }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }

  };
  

//スケジュールの確認
  /*export const PUT = async (req: Request, res: NextResponse) => {
    try {
      const schedule=req.json();
      return NextResponse.json({ message: "Success", schedule }, { status: 200 });
        const user_id: string = req.url.split("/api/postcalendar/")[1]; //ID取得
      const request = await req.json();
      
      //const schedule = request.schedule;//スケジュールを取得
      await main(); //DB接続
      

            
          }
    catch (err) {
      return NextResponse.json({ message: "Error"+JSON.stringify(err) }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }

  };


//スケジュールの確認
  export const PUT = async (req: NextRequest, res: NextResponse) => {
    try {
      const request = await req.json();
      await main();
      return NextResponse.json({ message: "Success",request }, { status: 201 });

      const user_id: string = req.url.split("/api/postcalendar/")[1]; //ID取得
      //const request = await req.json();
      const schedule = request.schedule;//スケジュールを取得
      await main(); //DB接続
      if (!user_id) {
        return NextResponse.json({ message: "A" }, { status: 404 });
      }
      else{
          await prisma.profiles.update({
            data: {
                schedule:schedule ,
            },
            where: {
              id: user_id,
            },      
          })
          return NextResponse.json({ message: "B" }, { status: 200 });
          }
            
          }
    catch (err) {
      return NextResponse.json({ message: "E" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }

  };
*/
  