import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error404, ProductViewCard } from "../../components/index";
import { fetchProduct } from "../../store/products/thunks";
import { clearProduct } from "../../store/products/productsSlice";
import { selectProductState } from "../../store/products/selectors";

function ProductPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, error } = useSelector(selectProductState);

  useEffect(() => {
    dispatch(fetchProduct(productId));
    return () => {
      dispatch(clearProduct());
    };
  }, []);

  return (
    <>
      {error && <Error404 />}
      {!!product.id && <ProductViewCard product={product} />}
    </>
  );
}

export default ProductPage;
