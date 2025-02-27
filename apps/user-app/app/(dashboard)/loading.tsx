
export default function Loading() {
  return <div>
    <Skeleton/>
    <br/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
  </div>
}

export function Skeleton() {
  return <div role="status" className="max-w-sm animate-pulse">
  <div className="h-2.5 bg-gray-300 rounded-full w-48 mb-4"></div>
  <div className="h-2 bg-gray-300 rounded-full min-w-[360px] mb-2.5"></div>
  <div className="h-2 bg-gray-300 rounded-full mb-2.5"></div>
  <div className="h-2 bg-gray-300 rounded-full min-w-[330px] mb-2.5"></div>
  <div className="h-2 bg-gray-300 rounded-full min-w-[300px] mb-2.5"></div>
  <div className="h-2 bg-gray-300 rounded-full min-w-[360px]"></div>
  <span className="sr-only">Loading...</span>
</div>
}