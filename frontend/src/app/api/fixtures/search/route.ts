import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Fixture } from "@/models/Fixture";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ fixtures: [] });
  }

  try {
    await dbConnect();
    const fixtures = await Fixture.find({
      $or: [
        { home_team: { $regex: query, $options: "i" } },
        { away_team: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ fixture_datetime: 1 })
      .limit(50);
    return NextResponse.json({
      fixtures,
      message: "MongoDB connected successfully",
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }
}
