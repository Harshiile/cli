import { Header } from "./components/layout/header"
import { Footer } from "./components/layout/footer"
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <html lang="en">
            <body className='bg-black text-white min-h-screen'>
                <Header />
                <Outlet />
                <Footer />
            </body>
        </html>
    )
}
