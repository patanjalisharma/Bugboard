import { SignIn } from "@clerk/nextjs"
const page = () => {
  return (
    <div className="max-w-5xl flex justify-center mx-auto  py-10">
  <SignIn/>
  </div>
  )
}

export default page