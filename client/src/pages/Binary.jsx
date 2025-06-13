export const Binary = () => {
    const binaries = [
        { os: "Linux", url: "/binaries/linux.zip" },
        { os: "macOS", url: "/binaries/macos.zip" },
        { os: "Windows", url: "/binaries/windows.zip" }
    ];
    return (
        <motion.div className="px-6 py-10"
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-6">Download CLI for your OS</h2>
            <ul className="space-y-4">
                {binaries.map((bin, i) => (
                    <li key={i} className="bg-gray-800 p-4 rounded-xl flex justify-between items-center">
                        <span>{bin.os}</span>
                        <a href={bin.url} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-all">Download</a>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}