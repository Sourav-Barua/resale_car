import { useEffect, useState } from "react"


const useAdminRoute = (email) => {
    const [isAdminLoader, setAdminLoader] = useState(true)
    const [isAdmin, setisAdmin] = useState(false)

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.isAdmin) {
                        setisAdmin(data.isAdmin)

                    }
                    setAdminLoader(false)

                })
                .catch(er => console.log(er))
        }
    }, [email, isAdminLoader])

    return [isAdmin, isAdminLoader];
}
export default useAdminRoute;