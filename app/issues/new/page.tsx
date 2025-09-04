import IssueForm from "@/components/IssueForm"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


const NewIssuePage = async () => {

  

  const { userId } = await auth()
  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div>
        <IssueForm/>
    </div>
  )
}

export default NewIssuePage