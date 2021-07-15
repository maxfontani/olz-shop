import { useSelector } from "react-redux";
import { selectCartTotalPrice } from "../store/cart/selectors";
import { Header, Menu, Content, Footer } from "../components/index";

import styles from "./Layout.module.css";

export default function Layout({ children, location }) {
  const totalPrice = useSelector(selectCartTotalPrice);
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Header />
        <Menu totalPrice={totalPrice} location={location} />
        <Content>{children}</Content>
        <Footer />
      </div>
    </div>
  );
}
