import { useEffect, useState } from "react"


const useBuyerRoute = (email) => {
    const [isBuyerLoader, setBuyerLoader] = useState(true)
    const [isBuyer, setIsBuyer] = useState(false)
    

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/buyer/${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.isBuyer) {
                        setIsBuyer(data.isBuyer)

                    }
                    setBuyerLoader(false)

                })
                .catch(er => console.log(er))
        }
    }, [email, isBuyerLoader])

    return [isBuyer, isBuyerLoader];
}
export default useBuyerRoute;