'use client'
import ProtectedRoute from "@/components/ProtectedRoute";
import {useAuthStore} from "@/context/AuthContext";
import SideBar from "@/app/dashboard/sideBar";

export default function Home(){
    const {user } = useAuthStore()
    return(
        <ProtectedRoute>
            <main className={""}>
                <p>Hello {user?.name}</p>
            </main>

        </ProtectedRoute>

    )
}