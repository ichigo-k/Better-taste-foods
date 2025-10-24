'use client'
import ProtectedRoute from "@/components/ProtectedRoute";
import {useAuthStore} from "@/context/AuthContext";

export default function Home(){
    const {user } = useAuthStore()
    return(
        <ProtectedRoute>
            <p>Hello {user?.name}</p>
        </ProtectedRoute>

    )
}