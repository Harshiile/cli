export const Docs = () => {
    const commands = [
        { cmd: "cli push <folder>", desc: "Push local code to cloud" },
        { cmd: "cli get <workspace>", desc: "Retrieve your code" },
        { cmd: "cli vis-change <workspace>", desc: "Toggle visibility" },
        { cmd: "cli delete <workspace>", desc: "Delete a workspace" },
    ];
    return (
        <motion.div className="px-6 py-10"
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-6">CLI Command Reference</h2>
            <div className="space-y-4">
                {commands.map((c, i) => (
                    <div key={i} className="bg-gray-800 p-4 rounded-xl shadow">
                        <code className="block text-purple-400 font-mono text-lg">{c.cmd}</code>
                        <p className="text-gray-300 mt-1">{c.desc}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
