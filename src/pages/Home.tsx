const Home = (): JSX.Element => {
  return (
    <div className="flex-1 p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-2">Inicio</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card text-card-foreground shadow-sm border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Orders</h2>
          <p className="text-gray-500">You have 10 new orders.</p>
        </div>
        <div className="bg-card text-card-foreground shadow-sm border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Customers</h2>
          <p className="text-gray-500">You have 5 new customers.</p>
        </div>
        <div className="bg-card text-card-foreground shadow-sm border rounded-lg p-4">
          <h2 className="text-secondary-foreground text-lg font-semibold mb-2">
            Revenue
          </h2>
          <p className="text-gray-500">Your revenue is up 25% this month.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
