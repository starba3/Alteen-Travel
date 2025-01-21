import { Users, BookOpen, Earth, Map, FileText } from "lucide-react";
import Link from "next/link";
export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome to Alteen Admin</h1>
        <p className="text-muted-foreground">Manage your travel business from one place</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className=" mb-4">
            <Link className="flex items-center gap-2" href="/admin/destinations">
              <Earth className="h-6 w-6 text-gray-600" />
              <h2 className="text-lg font-semibold items-center">Destinations</h2>
            </Link>
          </div>
          <p className="text-muted-foreground">Manage Countries and Destinations</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="mb-4">
            <Link className="flex items-center gap-2" href="/admin/visa-countries">
              <FileText className="h-6 w-6 text-gray-600" />
              <h2 className="text-lg font-semibold items-center">Visa Countries</h2>
            </Link>
          </div>
          <p className="text-muted-foreground">Manage Visa-Enabled Countries</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="mb-4">
            <Link className="flex items-center gap-2" href="/admin/trips">
              <BookOpen className="h-6 w-6 text-gray-600" />
              <h2 className="text-lg font-semibold items-center">Trips</h2>
            </Link>
          </div>
          <p className="text-muted-foreground">Manage Trips and Packages</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="mb-4">
            <Link className="flex items-center gap-2" href="/admin/visa-orders">
              <FileText className="h-6 w-6 text-gray-600" />
              <h2 className="text-lg font-semibold items-center">Visa Orders</h2>
            </Link>
          </div>
          <p className="text-muted-foreground">Manage Visa Applications</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="mb-4">
            <Link className="flex items-center gap-2" href="/admin/sales-representatives">
              <Users className="h-6 w-6 text-gray-600" />
              <h2 className="text-lg font-semibold items-center">Sales Representatives</h2>
            </Link>
          </div>
          <p className="text-muted-foreground">Manage Sales Team Accounts</p>
        </div>
      </div>
    </div>
  );
}