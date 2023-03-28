import { useEffect, useState } from "react"
import toast from "react-hot-toast"


const useToken = (email, role, name) => {
    const [token, setToken] = useState(null)

    useEffect(() => {
        console.log(token)
        if (email) {
            const user = {
                email,
                role,
                name
            }
            fetch(`http://localhost:5000/users/${email}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem("AccessToken", data.token)
                    setToken(data.token)
                    if (data?.result?.acknowledged) {
                        toast.success(`mr ${email} succesfully added`)
                    }
                })
        }
    }, [email, role, name, token])
    return token;
}
export default useToken;