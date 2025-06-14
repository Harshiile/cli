import { Header } from "./components/layout/header"
import { Footer } from "./components/layout/footer"

export default function Layout({
    children,
}) {
    return (
        <html lang="en">
            <body className='bg-black text-white min-h-screen'>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    )
}
