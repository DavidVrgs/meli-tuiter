import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { LOCALE } from "./shared/contexts/i18n/i18n";
import LoginPage from "./features/login/LoginPage";
import SignUpPage from "./features/signUp/SignUpPage";
import { ErrorBoundary } from "react-error-boundary";
import { AppLoading, Navbar, NotFound } from "./shared/components";
import FeedPage from "./features/post/pages/FeedPage";
import CreatePostPage from "./features/post/pages/CreatePostPage";
import PostReplies from "./features/post/pages/PostReplies";
import { ProfilePage } from "./features/profile/ProfilePage";
import { FavoriteUserPage } from "./features/favoriteUsers/FavoriteUsersPage";
import AppProvider from "./shared/providers/AppProvider";
import { useAuth } from "./shared";

export type AppProps = {
  lang: LOCALE;
};

const queryClient = new QueryClient();
function ErrorFallback({ error }: Readonly<{ error: Error }>) {
  return <div>Something went wrong: {error.message}</div>;
}

export const AppContainer = () => {
  const { isAuthenticated, loading } = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          {isAuthenticated && <Navbar />}
          {loading && <AppLoading />}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/post/create" element={<CreatePostPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favorite_users" element={<FavoriteUserPage />} />
            <Route path="/post/:id/replies" element={<PostReplies />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

const App = ({ lang }: AppProps) => {
  return (
    <AppProvider lang={lang}>
      <AppContainer />
    </AppProvider>
  );
};

export default App;
