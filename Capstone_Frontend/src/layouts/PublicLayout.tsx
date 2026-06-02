import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <nav>
        <h2>Public Navigation</h2>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer>
        Footer
      </footer>
    </>
  );
};

export default PublicLayout;