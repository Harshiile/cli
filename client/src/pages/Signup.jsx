export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <motion.div className="flex flex-col items-center justify-center py-20 px-6 bg-black"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl mb-6 font-semibold">Create Your Account</h2>
            <form className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-sm">
                <label className="block mb-4">
                    <span>Email</span>
                    <input type="email" className="mt-1 w-full p-2 bg-gray-700 rounded" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label className="block mb-6">
                    <span>Password</span>
                    <input type="password" className="mt-1 w-full p-2 bg-gray-700 rounded" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded transition-all">Signup</button>
            </form>
        </motion.div>
    );
}