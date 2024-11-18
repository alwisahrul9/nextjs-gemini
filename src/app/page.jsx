import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import ChatContaiener from "./components/ChatContainer";
import Error from "./error";

export default async function Home() {
    return (
        <main className="pt-16 h-screen overflow-y-hidden">
            <ErrorBoundary fallback={<Error />}>
                <ChatContaiener />
            </ErrorBoundary>
        </main>
    )
}
