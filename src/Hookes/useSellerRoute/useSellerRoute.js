import { useEffect, useState } from "react"


const useSellerRoute = (email) => {
    const [isSellerLoader, setsellerLoader] = useState(true)
    const [isSeller, setIsSeller] = useState(false)

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.isSeller) {
                        setIsSeller(data.isSeller)

                    }
                    setsellerLoader(false)

                })
                .catch(er => console.log(er))
        }
    }, [email, isSellerLoader])

    return [isSeller, isSellerLoader];
}
export default useSellerRoute;