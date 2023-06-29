import { SignIn } from "@clerk/nextjs";

export default function Sign_In() {
    return (
        <div className="flex justify-center content-center p-10">
            <SignIn />
        </div>
    )
}