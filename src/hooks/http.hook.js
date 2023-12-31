import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, metod = 'GET', body = null, headers = {'Content-Type': 'aplication/json'}) => {
       
        setLoading(true)

        try {
            const response = await fetch(url, { metod, body, headers })

            if (!response.ok) {
                throw new Error(`Couldn't fetch ${url}, status: ${response.status}`)
            }

            const data = await response.json()

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw(e)
        }
    }, [])
    
    const clearError = useCallback(() => setError(null), [])
    
    return {request, error, clearError, loading}
}
