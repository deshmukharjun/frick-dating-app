import TopBar from "../matches/components/TopBar";
import BottomNav from "../matches/components/BottomNav";
import SettingsPageContent from "./components/SettingsPageContent";

export default function SettingsPage() {
    return (
        <div className="bg-[#111111] text-white h-screen flex flex-col overflow-hidden">
            <TopBar title="Calls" showBackArrow={false} />
            <SettingsPageContent />
            <BottomNav />
        </div>
    );
}
