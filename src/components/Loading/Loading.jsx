import { memo } from "react"

function Loading() {
    return(
        <>
        <div className="flex justify-center items-center h-40 ">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-[#0e3d66] rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-[#0e3d66] rounded-full animate-bounce [animation-delay:-0.2s]"></div>
            <div className="w-4 h-4 bg-[#0e3d66] rounded-full animate-bounce [animation-delay:-0.4s]"></div>
          </div>
        </div></>
    )
}
export default memo(Loading)
