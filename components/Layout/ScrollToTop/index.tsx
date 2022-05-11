import { useState, useCallback } from "react";
import { useEventListener } from "../../../utils/hooks/useEventListener";
import { Container, Arrow } from "./styles";

const ScrollToTopBtn = () => {
  const [isVisable, setIsVisable] = useState(false);

  const changeVisability = useCallback(() => {
    if (window.pageYOffset > 500) {
      setIsVisable(true);
    } else {
      setIsVisable(false);
    }
  },[]);



  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEventListener("scroll", changeVisability)

  return (
    <Container
      style={{ display: isVisable ? "flex" : "none" }}
      onClick={scrollToTop}
    >
      <Arrow />
    </Container>
  );
};
export default ScrollToTopBtn;