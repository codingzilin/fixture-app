import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";
import dbConnect from "@/lib/mongodb";
import { Fixture } from "@/models/Fixture";

interface FixtureRow {
  fixture_datetime: string | Date;
  [key: string]: string | number | Date | null | undefined;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileContent = await file.text();
    const parseResult = Papa.parse<FixtureRow>(fileContent, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    // Clear existing fixtures
    await Fixture.deleteMany({});

    // Insert fixtures with date conversion
    const fixtures = parseResult.data.map((row) => ({
      ...row,
      fixture_datetime:
        typeof row.fixture_datetime === "string"
          ? new Date(row.fixture_datetime)
          : row.fixture_datetime,
    }));

    const result = await Fixture.insertMany(fixtures);

    return NextResponse.json({
      message: "File uploaded successfully",
      count: result.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
