import { useState, useEffect, Alert } from "react"

const useAppwrite = (fn) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await fn()
            setData(response)
            // console.log(response)
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setIsLoading(false)
        }
    }
    // Cannot use async directly in useEffect
    useEffect(() => {    
        fetchData()
    }, [])

    const refetch = () => fetchData()
    return { data, isLoading, refetch }
}

export default useAppwrite