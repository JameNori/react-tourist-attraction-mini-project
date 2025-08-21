import Header from "./components/Header/Header.jsx";
import TravelCard from "./components/TravelCard/TravelCard.jsx";
import DataProvider from "./components/DataProvider/DataProvider.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <DataProvider>
        {({ travelData, loading, error, refetch, searchTrips }) => {
          if (loading) {
            return <div className="loading-container">กำลังโหลดข้อมูล...</div>;
          }

          if (error) {
            return (
              <div className="error-container">
                <div className="error-message">{error}</div>
                <button className="retry-button" onClick={refetch}>
                  ลองใหม่
                </button>
              </div>
            );
          }

          return (
            <>
              <Header
                onSearch={(searchTerm) => {
                  // เรียกใช้ฟังก์ชันค้นหาจาก DataProvider
                  searchTrips(searchTerm);
                }}
              />
              <div className="container">
                {travelData.map((travel) => (
                  <TravelCard
                    key={travel.id || travel.title}
                    photos={travel.photos}
                    title={travel.title}
                    description={travel.description}
                    tags={travel.tags}
                    url={travel.url}
                    hasShareIcon={travel.hasShareIcon}
                  />
                ))}
              </div>
            </>
          );
        }}
      </DataProvider>
    </div>
  );
}

export default App;
