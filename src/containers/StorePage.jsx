import {
  ProductHub,
  Header,
  Menu,
  Content,
  Sidebar,
  Footer,
} from "../components/exports";
import { useStoreState } from "../store/context.js";

import styles from "../styles/Home.module.css";

function StorePage() {
  const store = useStoreState();
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Header />
        <Menu />
        <Content>
          <div className={styles.split}>
            <Sidebar />
            <ProductHub products={store.data.products ?? []} />
          </div>
        </Content>
        <Footer />
      </div>
    </div>
  );
}

export default StorePage;
