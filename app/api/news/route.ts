import { NextResponse } from "next/server";
import { getRSSNews } from "@/app/actions/news";

export const revalidate = 1800; // Cache for 30 minutes (ISR)

export async function GET() {
  try {
    const news = await getRSSNews();
    const caCount = news.filter((n) => n.region === "ca").length;
    const worldCount = news.filter((n) => n.region === "world").length;

    return NextResponse.json({
      success: true,
      total: news.length,
      caCount,
      worldCount,
      news,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
