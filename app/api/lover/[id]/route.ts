import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";


async function main() {
    try {
      await prisma.$connect();
    } catch (err) {
      return "err";
    }
    
  }

  
//ユーザーの情報を取得する
export const GET = async (req: Request, res: NextResponse) => {
    try {
      const user_id: string = req.url.split("/api/lover/")[1]; //ID取得
      await main();
      if (!user_id) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      const profile = await prisma.profiles.findUnique({  where: { id:user_id  } });
      //ユーザーが存在するかどうかの判定

      if(profile){  //ユーザーのレスポンスがある場合
        const lover_id = profile.lover_id;
        if (lover_id==null) { //恋人がいない場合
          const lover_profile=null;
           return NextResponse.json({ message: "Success", profile,lover_profile }, { status: 200 });
        }
        else{ //恋人がいる場合
          const lover_profile = await prisma.profiles.findUnique({  where: { id:lover_id  } });
          return NextResponse.json({ message: "Success", profile,lover_profile }, { status: 200 });
        }
      }
      //ユーザーのレスポンスがない場合
      return NextResponse.json({ message: "Error"+"ユーザーが見つかりません。" }, { status: 404 });
    } catch (err) {
      return NextResponse.json({ message: "Error"+JSON.stringify(err) }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };
 
  //ユーザーの恋人のメールアドレスからユーザーIDを取得してPUTする
   
  export const PUT = async (req: Request, res: NextResponse) => {
    try {
      const user_id: string = req.url.split("/api/lover/")[1]; //ID取得
      const request = await req.json();
      const lover_email = request.lover_email;//恋人のメールアドレスを取得
      await main();
      if (!user_id) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      else{
        const lover_profile = await prisma.profiles.findFirst({  where: { email:{contains:lover_email } } });
        if(lover_profile){  //恋人のユーザーのレスポンスがある場合
          const lover_id =  lover_profile.id;
          await prisma.profiles.update({
            data: {
              lover_id:lover_id ,
            },
            where: {
              id: user_id,
            },
            
          })
          return NextResponse.json({ message: "Success", lover_id }, { status: 200 });
          }
          else{ //レスポンスがない場合
            return NextResponse.json({ message: "Error"+" ユーザーが見つかりません。" }, { status: 404 });
            
          }
      }
    }
    catch (err) {
      return NextResponse.json({ message: "Error"+JSON.stringify(err) }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }

  };

//恋人のユーザーIDを削除する
export const DELETE = async (req: Request, res: NextResponse) => {
  
  try {
    const user_id: string = req.url.split("/api/lover/")[1]; //ID取得
    const deleteProfile =await prisma.profiles.update({
      data: {
        lover_id:null ,
      },
      where: {
        id: user_id,
      },
      
    })
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
