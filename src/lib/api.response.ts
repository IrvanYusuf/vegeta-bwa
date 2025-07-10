import { NextResponse } from "next/server";

interface IResponse {
  isSuccess?: boolean;
  message?: string;
  data?: any;
  status?: ResponseInit["status"];
  meta?: object;
}

const Response = ({
  isSuccess = true,
  message = "success",
  data = [],
  status = 200,
  meta,
}: IResponse) => {
  return NextResponse.json(
    {
      success: isSuccess,
      message: message,
      data: data,
      meta,
    },
    {
      status: status,
    }
  );
};

export default Response;
