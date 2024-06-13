import { Link } from "react-router-dom";

export default function UnAuthorized() {
    return (
        <>
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                        401
                    </p>
                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        UnAuthorized Access
                    </h1>
                    <p className="mt-6 text-base leading-7 text-secondary-foreground">
                        Sorry, we couldn’t let you to access which aren's yours.
                    </p>
                    
                </div>
            </main>
        </>
    );
}
