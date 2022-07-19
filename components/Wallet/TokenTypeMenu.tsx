import { useDispatch } from "react-redux";
import Button from "../UI/Button";
import { changeTokenType } from "../../state/store/app/app.store";

const TokenTypeOptions = [
  { name: "Ether" },
  { name: "ERC20" },
  { name: "ERC721" },
];

const TokenTypeMenu = () => {
  const dispatch = useDispatch();

  const menuButtonClickHandler = (optionName: string) => {
    dispatch(changeTokenType(optionName));
  };

  return (
    <>
      <div className="flex flex-col justify-start">
        <nav className="flex gap-4 justify-center">
          {TokenTypeOptions.map((option) => (
            <Button
              key={option.name}
              onClick={() => {
                menuButtonClickHandler(option.name);
              }}
            >
              {option.name}
            </Button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default TokenTypeMenu;
