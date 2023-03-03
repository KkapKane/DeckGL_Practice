import "../Style.scss";
import { GoArrowSmallDown } from "react-icons/go";

interface Props {
  Styles: any;
  setCurrentStyle: React.Dispatch<React.SetStateAction<string>>;
}

export default function DropDown({ Styles, setCurrentStyle }: Props) {
  const setStyle = (stylePicked: any) => {
    switch (stylePicked) {
      case "Street":
        setCurrentStyle(Styles.Street);
      case "OutDoor":
        setCurrentStyle(Styles.OutDoor);
      case "Light":
        setCurrentStyle(Styles.Light);
      case "Dark":
        setCurrentStyle(Styles.Dark);
    }
    setCurrentStyle(Styles);
  };
  return (
    <div id='drop-down'>
      <ul className='menu'>
        {Object.keys(Styles).map((style) => {
          return <li onClick={() => setStyle(style)}>{style}</li>;
        })}
      </ul>
    </div>
  );
}
