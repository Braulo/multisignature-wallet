import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggleShowSidenav } from "../../state/store/app/app.store";

const links = [
  {
    route: "/wallet",
    name: "My Wallets",
  },
  {
    route: "/wallet/create",
    name: "Create",
  },
  {
    route: "/wallet/import",
    name: "Import",
  },
];
const Sidenav = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const linkChangeHandler = () => {
    dispatch(toggleShowSidenav());
  };

  return (
    <aside className="m-8 dark:bg-dark-secondary bg-light-secondary rounded-lg bg-opacity-80 dark:bg-opacity-80">
      <ul className="flex justify-center items-center flex-col text-lg font-bold">
        {links.map((link) => (
          <li className="p-4" key={link.route}>
            <Link href={link.route}>
              <h1
                onClick={linkChangeHandler}
                className={`
              cursor-pointer 
                ${router.pathname == `${link.route}` && "text-primary"}
              `}
              >
                {link.name}
              </h1>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidenav;
