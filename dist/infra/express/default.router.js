export async function healthCheck(req, res) {
    res.status(200).json({ message: "ok" });
}
