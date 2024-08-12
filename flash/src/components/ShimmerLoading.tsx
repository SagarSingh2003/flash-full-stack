
import {Skeleton} from "./ui/skeleton.tsx";
export function ShimmerLoading() {
  return (
    <div className="flex flex-col space-y-3 w-[100%] items-center justify-center h-[100vh]">
      <Skeleton className="h-[425px] w-[714px] rounded-lg" /> 
      <div className=" flex items-center justify-between gap-3 ">
        <Skeleton className="h-[50px] w-[300px] rounded-lg" />
        <Skeleton className="h-[50px] w-[300px] rounded-lg" />
      </div>
    </div>
  )
}

export default ShimmerLoading;