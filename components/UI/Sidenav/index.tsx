import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggleShowSidenav } from "../../../store/app/app.store";

const Sidenav = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const linkChangeHandler = () => {
    dispatch(toggleShowSidenav());
  };
  return (
    <aside className="fixed justify-center items-center dark:bg-black bg-white dark:text-white text-black h-1/4 w-1/3 rounded-br-lg bg-opacity-80 dark:bg-opacity-80">
      <ul className="flex flex-col justify-center items-center gap-4 text-lg font-bold">
        <li className="mt-8">
          <Link href={"/wallet/create"}>
            <h1
              onClick={linkChangeHandler}
              className={`
              cursor-pointer
                ${
                  router.pathname == "/wallet/create"
                    ? "text-red-600"
                    : "dark:text-white text-black"
                }
              `}
            >
              Create
            </h1>
          </Link>
        </li>
        <li>
          <Link href={"/wallet/import"}>
            <h1
              onClick={linkChangeHandler}
              className={`
              cursor-pointer
                ${
                  router.pathname == "/wallet/import"
                    ? "text-red-600"
                    : "dark:text-white text-black"
                }
              `}
            >
              Import
            </h1>
          </Link>
        </li>
        <li>
          <Link href={"/wallet/import"}>
            <h1
              onClick={linkChangeHandler}
              className={`
              cursor-pointer
                ${
                  router.pathname == "/wallet/my"
                    ? "text-red-600"
                    : "dark:text-white text-black"
                }
              `}
            >
              My Wallets
            </h1>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidenav;
