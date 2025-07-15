import useApiCaller from "../hooks/useApiCaller";

interface LeaderboardType {
  userId: string;
  username: string;
  totalXp: number;
  lvl: number;
  wp: number;
  hp: number;
  kp: number;
  score: number;
  ranked: string;
}

type LeaderboardApiResponse = {
  scores: LeaderboardType[];
};

const Leaderboard = () => {
  const url =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_DEV_BE_URL
      : import.meta.env.VITE_PROD_BE_URL;

  const apiResult = useApiCaller(url + "/users/leaderboards", "GET", {});
  const leaderboardData = (apiResult.data as LeaderboardApiResponse | null) ?? {
    scores: [],
  };
  const leaderboardError = apiResult.isError;
  const leaderboardLoading = apiResult.isLoading;
  console.log("leaderboardData", leaderboardData);

  if (leaderboardLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (leaderboardError) {
    return (
      <div className="text-center text-red-500 font-semibold mt-20">
        Something went wrong fetching the leaderboard. Please try again.
      </div>
    );
  }

  return (
    <div className="p-4 max-w-5xl mx-auto mt-5">
      <h1 className="text-3xl font-bold mb-6 text-center">🏆 Leaderboard</h1>
      <div className="overflow-x-auto shadow-xl rounded-xl">
        <table className="table table-zebra w-full text-base">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Lvl</th>
              <th>XP</th>
              <th>Rank</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.scores.map(
              (user: LeaderboardType, index: number) => (
                <tr key={user.userId}>
                  <td className="font-semibold">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : index + 1}
                  </td>
                  <td className="font-medium">{user.username}</td>
                  <td>{user.lvl}</td>
                  <td>{user.totalXp}</td>
                  <td>{user.ranked || "Recruit"}</td>
                  <td className="font-bold text-accent">
                    {Math.round(user.score)}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
