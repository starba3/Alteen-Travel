export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome to TravelPro Admin</h1>
        <p className="text-muted-foreground">Manage your travel business from one place</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Destinations</h2>
          <p className="text-muted-foreground">Manage Countries and Destinations</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Visa Countries</h2>
          <p className="text-muted-foreground">Manage Visa-Enabled Countries</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Trips</h2>
          <p className="text-muted-foreground">Manage Trips and Packages</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Visa Orders</h2>
          <p className="text-muted-foreground">Manage Visa Applications</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sales Representatives</h2>
          <p className="text-muted-foreground">Manage Sales Team Accounts</p>
        </div>
      </div>
    </div>
  );
}