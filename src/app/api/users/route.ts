import Response from "@/lib/api.response";

export async function GET() {
  return Response({
    data: [
      {
        id: 1,
        name: "Taufan",
      },
    ],
    message: "success get data",
    status: 200,
  });
}

export async function POST() {
  return Response({
    message: "success create new user",
    data: {
      id: 1,
      name: "Taufan",
    },
    status: 201,
  });
}
