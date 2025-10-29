import React from "react"
import { Link, Routes, Route } from "react-router-dom"
import { SkinsPanel } from "./admin/SkinsPanel"
import { CasesPanel } from "./admin/CasesPanel"

export const AdminPanel: React.FC = () => {
    return (
        <div className="p-4">
            <div className="flex gap-4 mb-4">
                <Link to="skinspanel">Skins</Link>
                <Link to="casespanel">Cases</Link>
            </div>
            <Routes>
                <Route path="skins" element={<SkinsPanel />} />
                <Route path="cases" element={<CasesPanel />} />
            </Routes>
        </div>
    )
}
