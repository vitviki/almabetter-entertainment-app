import { useSelector } from "react-redux";
import { Sidebar } from "../components";
import { ElementCard } from "../components";

const Bookmarks = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <div className="flex gap-3 lg:flex-row flex-col">
      <Sidebar />
      <div className="flex flex-col gap-8 py-3 px-3 h-[calc(100vh-70px)] lg:w-[calc(100vw-150px)] overflow-y-scroll no-scrollbar">
        {user ? (
          user.favoriteMovies.length > 0 || user.favortiteTVs.length > 0 ? (
            <section>
              <div className="">
                <h1 className="md:heading-l heading-m text-gray-300 mb-5">
                  Favorite movies
                </h1>
                <div className="flex gap-8 h-full flex-wrap">
                  {user.favoriteMovies.map((movie) => (
                    <ElementCard
                      key={movie.id}
                      type={movie.type}
                      element={movie}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <h1 className="md:heading-l heading-m text-gray-300 mb-5">
                  Favorite TV Shows
                </h1>
                <div className="flex gap-8 h-full flex-wrap">
                  {user.favortiteTVs.map((movie) => (
                    <ElementCard
                      key={movie.id}
                      type={movie.type}
                      element={movie}
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <div>
              <h1 className="md:heading-l heading-m text-white">
                Favorites is currently empty
              </h1>
            </div>
          )
        ) : (
          <div>
            <h1 className="md:heading-l heading-m text-white">
              Please login to view your favorites
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
