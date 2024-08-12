import { SignIn } from "@clerk/clerk-react"

const Signin = () => {
    return (
        <section className="flex items-center justify-center h-[98vh]">
            <SignIn />
        </section>
    )
}

export default Signin;