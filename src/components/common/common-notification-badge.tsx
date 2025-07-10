"use client";

// utils
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface NotificationDetails {
  count?: number;
  color: string;
}

interface NotificationIconProps {
  children: React.ReactNode;
  notificationDetail: NotificationDetails;
  onClick?: () => void;
}

const CommonNotificationBadge: React.FC<NotificationIconProps> = ({
  children,
  notificationDetail,
  onClick,
}: NotificationIconProps) => {
  const isNumberedNotification = notificationDetail.count != null;
  const pillsDimension = cn({
    "w-[16px] h-[16px]": isNumberedNotification,
    "w-[12px] h-[12px]": !isNumberedNotification,
  });

  const [localCount, setLocalCount] = useState(notificationDetail.count);

  useEffect(() => {
    if (notificationDetail.count !== localCount) {
      setLocalCount(notificationDetail.count);
    }
  }, [notificationDetail.count, localCount]);

  return (
    <div className="relative cursor-pointer" onClick={() => onClick?.()}>
      <AnimatePresence mode="wait">
        {typeof notificationDetail.count === "number" && (
          <motion.div
            key={notificationDetail.count}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              pillsDimension,
              "right-[-6px] top-[-6px] absolute rounded-full text-xs text-white text-center flex items-center justify-center z-20",
              notificationDetail.color
            )}
          >
            {notificationDetail.count}
          </motion.div>
        )}
      </AnimatePresence>
      <div>{children}</div>
    </div>
  );
};

export default CommonNotificationBadge;
