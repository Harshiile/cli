export const Dashboard = () => {
    const workspaces = ["blog-api", "portfolio-cli", "auth-module"];
    return (
        <motion.div className="px-6 py-10"
            initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-4">Your Workspaces</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspaces.map((name, i) => (
                    <div key={i} className="bg-gray-800 p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold mb-2">{name}</h3>
                        <p className="text-gray-400">Visibility: Public</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}