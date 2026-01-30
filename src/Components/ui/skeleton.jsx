import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-[#dcdcdc] animate-pulse rounded-md", className)}
      {...props} />
  );
}

export { Skeleton }
