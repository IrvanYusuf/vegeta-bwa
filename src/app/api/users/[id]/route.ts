import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: Params) {
  const id = params.params.id;
  return NextResponse.json(
    {
      success: true,
      message: "success get detail user",
      data: {
        id: 1,
        name: `Taufan with id ${id}`,
      },
    },
    {
      status: 200,
    }
  );
}
