import { trpc } from "../utils/trpc"

export default function Home() {
  const {data} = trpc.hello.useQuery({text: "Oskar"})
  return (
    <div className='h-screen bg-slate-500'>
      Hello ${JSON.stringify(data)}
    </div>
  )
}
