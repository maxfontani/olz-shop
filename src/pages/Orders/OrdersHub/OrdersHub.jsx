import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";
import { ProductViewCard } from "../../../components/index";
import { calcTotalPrice, copyToClipboard } from "../../../utils/helpers";
import clipboardImg from "../../../images/clipboard.png";

import "@reach/accordion/styles.css";
import styles from "./OrdersHub.module.css";

function OrdersHub({ ordersArr }) {
  return (
    <div className={styles.ordersHub}>
      <Accordion collapsible>
        {ordersArr.map((order) => {
          const { id, pieces } = order;
          const totalPrice = calcTotalPrice(pieces);
          return (
            <AccordionItem key={id}>
              <AccordionButton key={`${id} button`}>
                {id}
                <img
                  alt="copy"
                  src={clipboardImg}
                  width="32"
                  height="32"
                  onClick={(e) => {
                    e.preventDefault();
                    copyToClipboard(id);
                  }}
                />
              </AccordionButton>
              <AccordionPanel key={`${id} panel`}>
                {pieces.map((productObj) => (
                  <div
                    className={styles.orderCardOuter}
                    key={`${id} ${productObj.product.id} div`}
                  >
                    <ProductViewCard
                      key={`${id} ${productObj.product.id}`}
                      product={productObj.product}
                      count={productObj.count}
                    />
                    <hr />
                  </div>
                ))}
                <p>
                  <b>Всего: {totalPrice}</b>
                </p>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default OrdersHub;
