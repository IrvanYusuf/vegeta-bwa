import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TransactionStatus } from "@prisma/client";
import React, { FC } from "react";

interface ICommonStatusProps {
  status: TransactionStatus;
  className?: string;
}

const CommonStatus: FC<ICommonStatusProps> = ({ status, className }) => {
  let bgColor: "success" | "destructive" | "default" | "pending" = "default";
  if (status === "COMPLETED" || status === "PAID") {
    bgColor = "success";
  } else if (status === "PENDING") {
    bgColor = "pending";
  }
  return <Badge variant={bgColor}>{status}</Badge>;
};

export default CommonStatus;
